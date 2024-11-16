import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";

export type AddPropertyGroupModalOutput = {
  name: string;
};

@Component({
  selector: "app-add-property-group-modal-form",
  templateUrl: "./add-property-group-modal-form.component.html",
  styleUrls: ["./add-property-group-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddPropertyGroupModalFormComponent extends BaseModalFormComponent<
  void,
  AddPropertyGroupModalOutput
> {
  private _name: string = "";

  onSubmit(): void {
    this.submitModal({ name: this._name });
  }

  public set name(name: string) {
    this._name = name;
  }
}

export const AddPropertyGroupModal: ModalInfo<
  void,
  AddPropertyGroupModalOutput,
  AddPropertyGroupModalFormComponent
> = {
  component: AddPropertyGroupModalFormComponent,
};
