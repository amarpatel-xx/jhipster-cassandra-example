import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SaathratriEntity4Service } from '../service/saathratri-entity-4.service';
import { ISaathratriEntity4 } from '../saathratri-entity-4.model';
import { SaathratriEntity4FormService } from './saathratri-entity-4-form.service';

import { SaathratriEntity4UpdateComponent } from './saathratri-entity-4-update.component';

describe('SaathratriEntity4 Management Update Component', () => {
  let comp: SaathratriEntity4UpdateComponent;
  let fixture: ComponentFixture<SaathratriEntity4UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let saathratriEntity4FormService: SaathratriEntity4FormService;
  let saathratriEntity4Service: SaathratriEntity4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SaathratriEntity4UpdateComponent],
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
      .overrideTemplate(SaathratriEntity4UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SaathratriEntity4UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    saathratriEntity4FormService = TestBed.inject(SaathratriEntity4FormService);
    saathratriEntity4Service = TestBed.inject(SaathratriEntity4Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const saathratriEntity4: ISaathratriEntity4 = { organizationId: '357e948f-aeca-48ab-a317-e25ea2b3dcb1' };

      activatedRoute.data = of({ saathratriEntity4 });
      comp.ngOnInit();

      expect(comp.saathratriEntity4).toEqual(saathratriEntity4);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity4>>();
      const saathratriEntity4 = { organizationId: 'f84082d7-31a6-42c6-a2c0-915e5221b32b' };
      jest.spyOn(saathratriEntity4FormService, 'getSaathratriEntity4').mockReturnValue(saathratriEntity4);
      jest.spyOn(saathratriEntity4Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity4 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: saathratriEntity4 }));
      saveSubject.complete();

      // THEN
      expect(saathratriEntity4FormService.getSaathratriEntity4).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(saathratriEntity4Service.update).toHaveBeenCalledWith(expect.objectContaining(saathratriEntity4));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity4>>();
      const saathratriEntity4 = { organizationId: 'f84082d7-31a6-42c6-a2c0-915e5221b32b' };
      jest.spyOn(saathratriEntity4FormService, 'getSaathratriEntity4').mockReturnValue({ organizationId: null });
      jest.spyOn(saathratriEntity4Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity4: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: saathratriEntity4 }));
      saveSubject.complete();

      // THEN
      expect(saathratriEntity4FormService.getSaathratriEntity4).toHaveBeenCalled();
      expect(saathratriEntity4Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity4>>();
      const saathratriEntity4 = { organizationId: 'f84082d7-31a6-42c6-a2c0-915e5221b32b' };
      jest.spyOn(saathratriEntity4Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity4 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(saathratriEntity4Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
