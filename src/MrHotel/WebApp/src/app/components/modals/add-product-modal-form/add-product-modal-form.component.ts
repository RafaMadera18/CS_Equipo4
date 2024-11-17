import { Component } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";


@Component({
  selector: 'app-add-product-modal-form',
  templateUrl: './add-product-modal-form.component.html',
  styleUrls: ['./add-product-modal-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddProductModalFormComponent{

}
