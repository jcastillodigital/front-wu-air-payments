import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/AuthResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  MENU_URL: string = environment.ROOT.URL;
  @Input('authData') authData: AuthResponse | null | undefined = null ;
  param1: string = '';
  param2: string = '';
  @Output() interactiveLoader = new EventEmitter<{status: string, message: string}>();

  constructor(
    private router: Router, 
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((queryParams: any) => {
        this.param1 = queryParams.params.param1;
        this.param2 = queryParams.params.param2;
      });
  }

  logout(){
    this.openLoader("Redirigiendo...");
    this.router.ngOnDestroy();
    window.location.href = this.MENU_URL + "?param1=" + this.param1 + "&param2=" + this.param2;
    return;
  }

  openLoader(message:string){
    this.interactiveLoader.emit({status: "open", message: message});
  }


}
