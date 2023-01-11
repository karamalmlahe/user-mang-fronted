/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HaederComponent } from './haeder.component';

describe('HaederComponent', () => {
  let component: HaederComponent;
  let fixture: ComponentFixture<HaederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
