import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  input,
  signal,
} from "@angular/core";

import { IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: "app-tab-button",
  templateUrl: "./tab-button.component.html",
  styleUrls: ["./tab-button.component.scss"],
  standalone: true,
  imports: [IonIcon, IonButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabButtonComponent {
  public readonly _name = input("");
  public readonly _icon = input("");
  public readonly _isExpanded = input<Signal<boolean>>(signal(false));
}
