/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BehavioursubjectService } from './behavioursubject.service';

describe('Service: Behavioursubject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BehavioursubjectService]
    });
  });

  it('should ...', inject([BehavioursubjectService], (service: BehavioursubjectService) => {
    expect(service).toBeTruthy();
  }));
});
