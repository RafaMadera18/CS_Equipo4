import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { EditPropertyGroupModalFormComponent } from "./edit-property-group-modal-form.component";

describe("EditPopertyGroupModalFormComponent", () => {
  let component: EditPropertyGroupModalFormComponent;
  let fixture: ComponentFixture<EditPropertyGroupModalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditPropertyGroupModalFormComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPropertyGroupModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
