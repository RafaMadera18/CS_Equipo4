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
  public readonly name = input("");
  public readonly icon = input("");
  public readonly expanded = input<Signal<boolean>>(signal(false));
}
