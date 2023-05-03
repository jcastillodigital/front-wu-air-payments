import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { IDeactivateComponent } from "../interfaces/IDeactivateComponent";
import { Observable } from "rxjs";

@Injectable()
export class DeactivateGuard implements CanDeactivate<IDeactivateComponent>
{
  component: Object | null = null;
  route: ActivatedRouteSnapshot | null = null;

  constructor() {
  }

  canDeactivate(component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.component = component;
    this.route = currentRoute;

    if(!component.allowRedirect || !component.canDeactivate() ){
      return window.confirm("Sure man?");
    } else {
      return true;
    }
  }

}