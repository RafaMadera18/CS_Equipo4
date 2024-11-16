import { Component } from "@angular/core";
import { AddPropertyGroupModal } from "@components/modals/room-property-groups/add-property-group-modal-form/add-property-group-modal-form.component";
import { IonIcon } from "@ionic/angular/standalone";
import { ModalService } from "@services/modal/modal.service";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";

@Component({
  selector: "app-room-tags-settings",
  templateUrl: "./room-tags-settings.component.html",
  styleUrls: ["./room-tags-settings.component.scss"],
  standalone: true,
  imports: [IonIcon],
})
export class RoomTagsSettingsComponent {
  constructor(private readonly _modalService: ModalService) {
    addIcons({ addOutline });
  }

  public async addPropertyGroup(): Promise<void> {
    const propertyGroupCreateRequest = await this._modalService.openModal(
      AddPropertyGroupModal,
    );

    console.log(propertyGroupCreateRequest);
  }
}
