import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomPropertyGroupsSettingsComponent } from './room-property-groups-settings.component';

describe('RoomTagsSettingsComponent', () => {
  let component: RoomPropertyGroupsSettingsComponent;
  let fixture: ComponentFixture<RoomPropertyGroupsSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPropertyGroupsSettingsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomPropertyGroupsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
