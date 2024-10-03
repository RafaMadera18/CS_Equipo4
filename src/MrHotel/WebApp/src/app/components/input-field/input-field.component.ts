import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  IonInput,
  IonIcon,
  IonNote,
  IonInputPasswordToggle,
} from "@ionic/angular/standalone";

import { Nullable } from "@customTypes/nullable";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  standalone: true,
  imports: [
    IonInput,
    IonIcon,
    IonNote,
    ReactiveFormsModule,
    IonInputPasswordToggle,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  name = input("");
  type = input("");
  label = input("");
  placeholder = input("");
  icon = input("");
  errorMessage = input<Nullable<string>>(null);
  blur = output();
}
