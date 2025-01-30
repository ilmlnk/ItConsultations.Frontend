import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPeopleComponent } from './recent-people.component';

describe('RecentPeopleComponent', () => {
  let component: RecentPeopleComponent;
  let fixture: ComponentFixture<RecentPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentPeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
