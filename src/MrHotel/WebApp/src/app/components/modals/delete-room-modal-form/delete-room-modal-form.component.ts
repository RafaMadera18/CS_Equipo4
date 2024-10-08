import { Component, OnInit } from '@angular/core';
import { BaseModalFormComponent } from '../modal-base-form-component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-room-modal-form',
  templateUrl: './delete-room-modal-form.component.html',
  styleUrls: ['./delete-room-modal-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DeleteRoomModalFormComponent extends BaseModalFormComponent{

  state: boolean = true;

  onSubmit() {
    this.dismissModal({ state: this.state});
  }

}
