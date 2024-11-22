import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { IonicModule, ModalController } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";
import { RoomInfo } from "@services/room-manager/data";
import { RoomPropertyGroupManagerService } from "@services/room-property-group-manager";
import {
  RoomProperty,
  RoomPropertyGroup,
} from "@services/room-property-group-manager/data";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-edit-room-modal-form",
  templateUrl: "./edit-room-modal-form.component.html",
  styleUrls: ["./edit-room-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class EditRoomModalFormComponent
  extends BaseModalFormComponent<RoomInfo, RoomInfo>
  implements OnInit
{
  private _name: string = "";
  private _properties: RoomProperty[] = [];
  private _propertyGroups: Observable<readonly RoomPropertyGroup[]> = of([]);
  private _selectedProperties: { [propertyId: string]: RoomProperty } = {};

  constructor(
    private readonly _roomPropertyGroupManager: RoomPropertyGroupManagerService,
    protected override readonly _modalController: ModalController,
  ) {
    super(_modalController);
  }

  public ngOnInit(): void {
    this._name = this.input.name;
    this._properties = this.input.properties;
    this._propertyGroups =
      this._roomPropertyGroupManager.getRoomPropertyGroups();
    this.selectedProperties = this.getSelectedRoomProperties();
  }

  public onSubmit(): void {
    if (this.isNameValid()) {
      this._properties = Object.values(this._selectedProperties);
      const editedRoom = new RoomInfo(
        this.input.id,
        this._name,
        this._properties,
      );

      console.log(editedRoom);
      this.submitModal(editedRoom);
    } else {
      console.error("Room name data is invalid");
      this.dismissModal();
    }
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

  public get propertyGroups() {
    return this._propertyGroups;
  }

  public get selectedProperties() {
    return this._selectedProperties;
  }

  public set selectedProperties(selectedProperties: {
    [propertyId: string]: RoomProperty;
  }) {
    this._selectedProperties = selectedProperties;
  }

  private getSelectedRoomProperties(): { [propertyId: string]: RoomProperty } {
    return this._properties.reduce<{ [propertyId: string]: RoomProperty }>(
      (acc, property) => {
        acc[property.id!] = {
          id: property.id,
          name: property.name,
          group: property.group,
        };
        return acc;
      },
      {},
    );
  }

  private isNameValid(): boolean {
    return this._name.trim().length !== 0;
  }
}

export const editRoomModal: ModalInfo<
  RoomInfo,
  RoomInfo,
  EditRoomModalFormComponent
> = {
  component: EditRoomModalFormComponent,
};
