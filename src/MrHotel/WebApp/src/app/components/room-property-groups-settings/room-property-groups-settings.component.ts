import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { deleteModal } from "@components/modals/delete-modal-form";
import { AddPropertyGroupModal } from "@components/modals/room-property-groups/add-property-group-modal-form/add-property-group-modal-form.component";
import { editRoomPropertyGroupModal } from "@components/modals/room-property-groups/edit-property-group-modal-form";
import { RoomPropertyGroupComponent } from "@components/room-property-group/room-property-group.component";
import { IonIcon } from "@ionic/angular/standalone";
import { ModalService } from "@services/modal/modal.service";
import { RoomPropertyGroupManagerService } from "@services/room-property-group-manager";
import { RoomPropertyGroup } from "@services/room-property-group-manager/data";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";
import { Observable } from "rxjs";

@Component({
  selector: "app-room-property-groups-settings",
  templateUrl: "./room-property-groups-settings.component.html",
  styleUrls: ["./room-property-groups-settings.component.scss"],
  standalone: true,
  imports: [IonIcon, CommonModule, RoomPropertyGroupComponent],
})
export class RoomPropertyGroupsSettingsComponent {
  private readonly _roomPropertyGroups: Observable<
    readonly RoomPropertyGroup[]
  >;

  constructor(
    private readonly _modalService: ModalService,
    private readonly _roomPropertyGroupManager: RoomPropertyGroupManagerService,
  ) {
    addIcons({ addOutline });

    this._roomPropertyGroups =
      this._roomPropertyGroupManager.getRoomPropertyGroups();
  }

  public async addPropertyGroup(): Promise<void> {
    const propertyGroupCreateRequest = await this._modalService.openModal(
      AddPropertyGroupModal,
    );

    if (propertyGroupCreateRequest !== null) {
      this._roomPropertyGroupManager
        .addRoomPropertyGroup(propertyGroupCreateRequest)
        .subscribe();
    }
  }

  public async deletePropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Promise<void> {
    const isDeleteConfirmed = await this._modalService.openModal(deleteModal, {
      message: `Do You want To Delete Property Group: ${roomPropertyGroup.name}?`,
    });

    if (isDeleteConfirmed) {
      this._roomPropertyGroupManager
        .deleteRoomPropertyGroup(roomPropertyGroup)
        .subscribe();
    }
  }

  public async editPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Promise<void> {
    const editedRoomPropertyGroup = await this._modalService.openModal(
      editRoomPropertyGroupModal,
      roomPropertyGroup,
    );

    if (editedRoomPropertyGroup !== null) {
      this._roomPropertyGroupManager
        .editRoomPropertyGroup(editedRoomPropertyGroup)
        .subscribe();
    }
  }

  public get roomPropertyGroups() {
    return this._roomPropertyGroups;
  }
}
