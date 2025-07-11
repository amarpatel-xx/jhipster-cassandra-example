import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SaathratriEntityService } from '../service/saathratri-entity.service';
import { ISaathratriEntity } from '../saathratri-entity.model';
import { SaathratriEntityFormService } from './saathratri-entity-form.service';

import { SaathratriEntityUpdateComponent } from './saathratri-entity-update.component';

describe('SaathratriEntity Management Update Component', () => {
  let comp: SaathratriEntityUpdateComponent;
  let fixture: ComponentFixture<SaathratriEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let saathratriEntityFormService: SaathratriEntityFormService;
  let saathratriEntityService: SaathratriEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SaathratriEntityUpdateComponent],
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
      .overrideTemplate(SaathratriEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SaathratriEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    saathratriEntityFormService = TestBed.inject(SaathratriEntityFormService);
    saathratriEntityService = TestBed.inject(SaathratriEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const saathratriEntity: ISaathratriEntity = { entityId: '2589838d-5669-48e1-9d61-31ea9ddc57c7' };

      activatedRoute.data = of({ saathratriEntity });
      comp.ngOnInit();

      expect(comp.saathratriEntity).toEqual(saathratriEntity);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity>>();
      const saathratriEntity = { entityId: '9a32a2a5-a4ff-46ed-920e-fb61b74090d3' };
      jest.spyOn(saathratriEntityFormService, 'getSaathratriEntity').mockReturnValue(saathratriEntity);
      jest.spyOn(saathratriEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: saathratriEntity }));
      saveSubject.complete();

      // THEN
      expect(saathratriEntityFormService.getSaathratriEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(saathratriEntityService.update).toHaveBeenCalledWith(expect.objectContaining(saathratriEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity>>();
      const saathratriEntity = { entityId: '9a32a2a5-a4ff-46ed-920e-fb61b74090d3' };
      jest.spyOn(saathratriEntityFormService, 'getSaathratriEntity').mockReturnValue({ entityId: null });
      jest.spyOn(saathratriEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: saathratriEntity }));
      saveSubject.complete();

      // THEN
      expect(saathratriEntityFormService.getSaathratriEntity).toHaveBeenCalled();
      expect(saathratriEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISaathratriEntity>>();
      const saathratriEntity = { entityId: '9a32a2a5-a4ff-46ed-920e-fb61b74090d3' };
      jest.spyOn(saathratriEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ saathratriEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(saathratriEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
