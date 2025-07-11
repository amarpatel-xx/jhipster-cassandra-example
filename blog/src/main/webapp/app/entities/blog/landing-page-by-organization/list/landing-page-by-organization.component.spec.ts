import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { sampleWithRequiredData } from '../landing-page-by-organization.test-samples';
import { LandingPageByOrganizationService } from '../service/landing-page-by-organization.service';

import { LandingPageByOrganizationComponent } from './landing-page-by-organization.component';
import SpyInstance = jest.SpyInstance;

describe('LandingPageByOrganization Management Component', () => {
  let comp: LandingPageByOrganizationComponent;
  let fixture: ComponentFixture<LandingPageByOrganizationComponent>;
  let service: LandingPageByOrganizationService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingPageByOrganizationComponent],
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
      .overrideTemplate(LandingPageByOrganizationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageByOrganizationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LandingPageByOrganizationService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    jest
      .spyOn(service, 'query')
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ organizationId: '4a853e3a-594b-457b-8718-d64275e96ad2' }],
            headers: new HttpHeaders({
              link: '<http://localhost/api/foo?page=1&size=20>; rel="next"',
            }),
          }),
        ),
      )
      .mockReturnValueOnce(
        of(
          new HttpResponse({
            body: [{ organizationId: 'f319edc2-1bbe-4417-b29a-f3f11f94b1a7' }],
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
    expect(comp.landingPageByOrganizations()[0]).toEqual(
      expect.objectContaining({ organizationId: '4a853e3a-594b-457b-8718-d64275e96ad2' }),
    );
  });

  describe('trackOrganizationId', () => {
    it('should forward to landingPageByOrganizationService', () => {
      const entity = { organizationId: '4a853e3a-594b-457b-8718-d64275e96ad2' };
      jest.spyOn(service, 'getLandingPageByOrganizationIdentifier');
      const organizationId = comp.trackOrganizationId(entity);
      expect(service.getLandingPageByOrganizationIdentifier).toHaveBeenCalledWith(entity);
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
