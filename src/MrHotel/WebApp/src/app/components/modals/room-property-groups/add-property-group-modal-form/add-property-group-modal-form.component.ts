import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";
import { RoomPropertyGroupCreationData } from "@services/room-property-group-manager/data";

@Component({
  selector: "app-add-property-group-modal-form",
  templateUrl: "./add-property-group-modal-form.component.html",
  styleUrls: ["./add-property-group-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddPropertyGroupModalFormComponent extends BaseModalFormComponent<
  void,
  RoomPropertyGroupCreationData
> {
  private _name: string = "";

  onSubmit(): void {
    if (this._name.trim().length !== 0) {
      const roomPropertyGroupCreationData = new RoomPropertyGroupCreationData(
        this._name,
      );
      this.submitModal(roomPropertyGroupCreationData);
    } else {
      this.dismissModal();
    }
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }
}

export const AddPropertyGroupModal: ModalInfo<
  void,
  RoomPropertyGroupCreationData,
  AddPropertyGroupModalFormComponent
> = {
  component: AddPropertyGroupModalFormComponent,
};
