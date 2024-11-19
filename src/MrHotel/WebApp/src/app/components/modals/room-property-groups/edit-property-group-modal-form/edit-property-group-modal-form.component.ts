import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { Guid } from "@customTypes/guid";
import { IonicModule } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";
import {
  RoomProperty,
  RoomPropertyGroup,
} from "@services/room-property-group-manager/data";

@Component({
  selector: "app-edit-property-group-modal-form",
  templateUrl: "./edit-property-group-modal-form.component.html",
  styleUrls: ["./edit-property-group-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class EditPropertyGroupModalFormComponent
  extends BaseModalFormComponent<RoomPropertyGroup, RoomPropertyGroup>
  implements OnInit
{
  private _name: string = "";
  private _properties: RoomProperty[] = [];

  public onSubmit(): void {
    if (this.isEditedRoomPropertyGroupValid()) {
      const editedRoomPropertyGroup: RoomPropertyGroup = {
        id: this.input.id,
        name: this._name,
        properties: this._properties,
      };

      this.submitModal(editedRoomPropertyGroup);
    }
    else {
      console.error("Edited info is invalid")
    }
  }

  public ngOnInit(): void {
    this._name = this.input.name;
    this._properties = [...this.input.properties];
  }

  private isPropertiesValid(): boolean {
    return this._properties.every(
      (property) => property.name.trim().length > 0,
    );
  }

  private isNameValid(): boolean {
    return this._name.trim().length > 0;
  }

  private isEditedRoomPropertyGroupValid(): boolean {
    if (this.isPropertiesValid() && this.isNameValid()) {
      return true;
    }
    return false;
  }

  public addPropertyTextBox() {
    this._properties.push({ id: "" as Guid, name: "", group: this.input });
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get properties() {
    return this._properties;
  }
}

export const editRoomPropertyGroupModal: ModalInfo<
  RoomPropertyGroup,
  RoomPropertyGroup,
  EditPropertyGroupModalFormComponent
> = {
  component: EditPropertyGroupModalFormComponent,
};
