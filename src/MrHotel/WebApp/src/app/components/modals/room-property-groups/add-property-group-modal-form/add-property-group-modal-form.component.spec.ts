import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPropertyGroupModalFormComponent } from './add-property-group-modal-form.component';

describe('AddPropertyGroupModalFormComponent', () => {
  let component: AddPropertyGroupModalFormComponent;
  let fixture: ComponentFixture<AddPropertyGroupModalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyGroupModalFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPropertyGroupModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
