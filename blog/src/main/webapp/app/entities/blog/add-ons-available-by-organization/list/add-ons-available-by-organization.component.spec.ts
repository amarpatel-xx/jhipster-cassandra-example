import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { sampleWithRequiredData } from '../add-ons-available-by-organization.test-samples';
import { AddOnsAvailableByOrganizationService } from '../service/add-ons-available-by-organization.service';

import { AddOnsAvailableByOrganizationComponent } from './add-ons-available-by-organization.component';
import SpyInstance = jest.SpyInstance;

describe('AddOnsAvailableByOrganization Management Component', () => {
  let comp: AddOnsAvailableByOrganizationComponent;
  let fixture: ComponentFixture<AddOnsAvailableByOrganizationComponent>;
  let service: AddOnsAvailableByOrganizationService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddOnsAvailableByOrganizationComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'organizationId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'organizationId,desc',
              }),
            ),
            snapshot: {
              queryParams: {},
              queryParamMap: jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'organizationId,desc',
              }),
            },
          },
        },
      ],
    })
      .overrideTemplate(AddOnsAvailableByOrganizationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AddOnsAvailableByOrganizationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AddOnsAvailableByOrganizationService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    jest
      .spyOn(service, 'query')
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ organizationId: 'fe29463b-6ce7-4f08-add6-0cd21f742c31' }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=1&size=20>; rel="next"',
            }),
          }),
        ),
      )
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ organizationId: 'beb4d295-4283-4d1d-80f4-d176429ef0de' }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=0&size=20>; rel="prev",<http://localhost/api/foo?page=2&size=20>; rel="next"',
            }),
          }),
        ),
      );
  });

  it('should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.addOnsAvailableByOrganizations()[0]).toEqual(
      expect.objectContaining({ organizationId: 'fe29463b-6ce7-4f08-add6-0cd21f742c31' }),
    );
  });

  describe('trackOrganizationId', () => {
    it('should forward to addOnsAvailableByOrganizationService', () => {
      const entity = { organizationId: 'fe29463b-6ce7-4f08-add6-0cd21f742c31' };
      jest.spyOn(service, 'getAddOnsAvailableByOrganizationIdentifier');
      const organizationId = comp.trackOrganizationId(entity);
      expect(service.getAddOnsAvailableByOrganizationIdentifier).toHaveBeenCalledWith(entity);
      expect(organizationId).toBe(entity.organizationId);
    });
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // WHEN
    comp.navigateToWithComponentValues({ predicate: 'non-existing-column', order: 'asc' });

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['non-existing-column,asc'],
        }),
      }),
    );
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['organizationId,desc'] }));
  });

  describe('delete', () => {
    let ngbModal: NgbModal;
    let deleteModalMock: any;

    beforeEach(() => {
      deleteModalMock = { componentInstance: {}, closed: new Subject() };
      // NgbModal is not a singleton using TestBed.inject.
      // ngbModal = TestBed.inject(NgbModal);
      ngbModal = (comp as any).modalService;
      jest.spyOn(ngbModal, 'open').mockReturnValue(deleteModalMock);
    });

    it('on confirm should call load', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(comp, 'load');

        // WHEN
        comp.delete(sampleWithRequiredData);
        deleteModalMock.closed.next('deleted');
        tick();

        // THEN
        expect(ngbModal.open).toHaveBeenCalled();
        expect(comp.load).toHaveBeenCalled();
      }),
    ));

    it('on dismiss should call load', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(comp, 'load');

        // WHEN
        comp.delete(sampleWithRequiredData);
        deleteModalMock.closed.next();
        tick();

        // THEN
        expect(ngbModal.open).toHaveBeenCalled();
        expect(comp.load).not.toHaveBeenCalled();
      }),
    ));
  });
});
