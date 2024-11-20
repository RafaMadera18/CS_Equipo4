import { Component, OnInit } from "@angular/core";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { ModalController } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";
import { RoomInfo } from "@services/room-manager/data";
import { RoomPropertyGroupManagerService } from "@services/room-property-group-manager";
import { RoomProperty } from "@services/room-property-group-manager/data";

@Component({
  selector: "app-edit-room-modal-form",
  templateUrl: "./edit-room-modal-form.component.html",
  styleUrls: ["./edit-room-modal-form.component.scss"],
})
export class EditRoomModalFormComponent
  extends BaseModalFormComponent<RoomInfo, RoomInfo>
  implements OnInit
{
  private _name: string = "";
  private _properties: RoomProperty[] = [];

  constructor(
    private readonly _roomPropertyGroupManager: RoomPropertyGroupManagerService,
    protected override readonly _modalController: ModalController,
  ) {
    super(_modalController);
  }

  public ngOnInit(): void {
    this._name = this.input.name;
    this._properties = this.input.properties;
  }
}

export const editRoomModal: ModalInfo<
  RoomInfo,
  RoomInfo,
  EditRoomModalFormComponent
> = {
  component: EditRoomModalFormComponent,
};
