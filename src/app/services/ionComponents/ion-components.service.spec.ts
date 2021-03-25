import { TestBed } from '@angular/core/testing';

import { IonComponentsService } from './ion-components.service';

describe('IonComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonComponentsService = TestBed.get(IonComponentsService);
    expect(service).toBeTruthy();
  });
});
