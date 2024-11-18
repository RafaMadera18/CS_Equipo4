import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AddPropertyGroupModal } from "@components/modals/room-property-groups/add-property-group-modal-form/add-property-group-modal-form.component";
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

  public get roomPropertyGroups() {
    return this._roomPropertyGroups;
  }
}
