import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPurchaseReportModalFormComponent } from './add-purchase-report-modal-form.component';

describe('AddPurchaseReportModalFormComponent', () => {
  let component: AddPurchaseReportModalFormComponent;
  let fixture: ComponentFixture<AddPurchaseReportModalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseReportModalFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPurchaseReportModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
