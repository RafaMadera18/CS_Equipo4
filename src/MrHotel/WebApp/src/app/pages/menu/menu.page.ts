import {
  Component,
  effect,
  ElementRef,
  Signal,
  signal,
  viewChild,
} from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { IonTabs } from "@ionic/angular/standalone";

import { addIcons } from "ionicons";
import {
  reorderThreeOutline,
  arrowBackOutline,
  bedOutline,
  personOutline,
  clipboardOutline,
  cogOutline,
} from "ionicons/icons";

import { TabButtonComponent } from "@components/tab-button";

import { AuthService, UserInfoResponse } from "@services/auth";
import { Nullable } from "@customTypes/nullable";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
  standalone: true,
  imports: [IonTabs, TabButtonComponent],
})
export class MenuPage {
  protected readonly _userInfo: Signal<Nullable<UserInfoResponse>>;

  protected readonly _sidebar =
    viewChild.required<ElementRef<HTMLDivElement>>("sidebar");

  protected readonly _isSidebarExpanded = signal<boolean>(false);

  protected readonly _tabs = viewChild.required(IonTabs);

  constructor(authService: AuthService) {
    addIcons({
      reorderThreeOutline,
      arrowBackOutline,
      bedOutline,
      personOutline,
      clipboardOutline,
      cogOutline,
    });

    this._userInfo = toSignal(authService.userInfo(), { initialValue: null });

    effect(() => {
      this._sidebar().nativeElement.classList.toggle(
        "expanded",
        this._isSidebarExpanded(),
      );
    });
  }

  protected onTabClick(tab: string): void {
    this._tabs().select(tab);
  }

  public get userInfo() {
    return this._userInfo;
  }

  public get isSideBarExpanded() {
    return this._isSidebarExpanded;
  }
}
