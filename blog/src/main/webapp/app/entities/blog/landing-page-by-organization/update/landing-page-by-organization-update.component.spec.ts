import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { LandingPageByOrganizationService } from '../service/landing-page-by-organization.service';
import { ILandingPageByOrganization } from '../landing-page-by-organization.model';
import { LandingPageByOrganizationFormService } from './landing-page-by-organization-form.service';

import { LandingPageByOrganizationUpdateComponent } from './landing-page-by-organization-update.component';

describe('LandingPageByOrganization Management Update Component', () => {
  let comp: LandingPageByOrganizationUpdateComponent;
  let fixture: ComponentFixture<LandingPageByOrganizationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let landingPageByOrganizationFormService: LandingPageByOrganizationFormService;
  let landingPageByOrganizationService: LandingPageByOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingPageByOrganizationUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(LandingPageByOrganizationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageByOrganizationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    landingPageByOrganizationFormService = TestBed.inject(LandingPageByOrganizationFormService);
    landingPageByOrganizationService = TestBed.inject(LandingPageByOrganizationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const landingPageByOrganization: ILandingPageByOrganization = { organizationId: '1361f429-3817-4123-8ee3-fdf8943310b2' };

      activatedRoute.data = of({ landingPageByOrganization });
      comp.ngOnInit();

      expect(comp.landingPageByOrganization).toEqual(landingPageByOrganization);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILandingPageByOrganization>>();
      const landingPageByOrganization = { organizationId: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(landingPageByOrganizationFormService, 'getLandingPageByOrganization').mockReturnValue(landingPageByOrganization);
      jest.spyOn(landingPageByOrganizationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ landingPageByOrganization });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: landingPageByOrganization }));
      saveSubject.complete();

      // THEN
      expect(landingPageByOrganizationFormService.getLandingPageByOrganization).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(landingPageByOrganizationService.update).toHaveBeenCalledWith(expect.objectContaining(landingPageByOrganization));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILandingPageByOrganization>>();
      const landingPageByOrganization = { organizationId: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(landingPageByOrganizationFormService, 'getLandingPageByOrganization').mockReturnValue({ organizationId: null });
      jest.spyOn(landingPageByOrganizationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ landingPageByOrganization: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: landingPageByOrganization }));
      saveSubject.complete();

      // THEN
      expect(landingPageByOrganizationFormService.getLandingPageByOrganization).toHaveBeenCalled();
      expect(landingPageByOrganizationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILandingPageByOrganization>>();
      const landingPageByOrganization = { organizationId: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(landingPageByOrganizationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ landingPageByOrganization });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(landingPageByOrganizationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
