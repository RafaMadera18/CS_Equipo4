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
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
  standalone: true,
  imports: [IonTabs, TabButtonComponent],
})
export class MenuPage {
  private readonly _userInfo: Signal<Nullable<UserInfoResponse>>;

  private readonly _sidebar =
    viewChild.required<ElementRef<HTMLDivElement>>("sidebar");

  private readonly _isSidebarExpanded = signal<boolean>(false);

  private readonly _tabs = viewChild.required(IonTabs);

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
    addIcons({
      reorderThreeOutline,
      arrowBackOutline,
      bedOutline,
      personOutline,
      clipboardOutline,
      cogOutline,
    });

    this._userInfo = toSignal(this._authService.getUserInfo(), {
      initialValue: null,
    });

    effect(() => {
      this._sidebar().nativeElement.classList.toggle(
        "expanded",
        this._isSidebarExpanded(),
      );
    });
  }

  public logOut(): void {
    this._authService.logout().subscribe({
      next: () => {
        this._router.navigate(["../"]);
      },
    });
  }

  public onTabClick(tab: string): void {
    this._tabs().select(tab);
  }

  public get userInfo() {
    return this._userInfo;
  }

  public get isSideBarExpanded() {
    return this._isSidebarExpanded;
  }
}
