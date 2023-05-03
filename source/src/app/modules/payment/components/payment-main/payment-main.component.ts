import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse, MetaData } from 'src/app/interfaces/AuthResponse';
import { DomainItem } from 'src/app/interfaces/DomainItem';
import { FindPaymentRequest } from 'src/app/interfaces/FindPaymentRequest';
import { IDeactivateComponent } from 'src/app/interfaces/IDeactivateComponent';
import { MoneyTransferPayFind } from 'src/app/interfaces/MoneyTransferFind';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-main',
  templateUrl: './payment-main.component.html',
  styleUrls: ['./payment-main.component.css', './../payment-main/payment-main.component.css']
})
export class PaymentMainComponent implements OnInit, IDeactivateComponent {

  MENU_URL: string = environment.ROOT.URL;
  loaderLabel: string;
  loaderOpener: boolean;
  param1?: string | null | undefined;
  param2?: string | null | undefined;
  authData?: AuthResponse | null | undefined = null;
  findPaymentRequest: FindPaymentRequest | null = null;
  domainItems: DomainItem[] | null = null;

  step: string = "";
  moneyTransferPayFind: MoneyTransferPayFind | null = null;

  allowRedirect: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.param1 = '';
    this.param2 = '';
    this.loaderLabel = 'Cargando';
    this.loaderOpener = true;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler($event:any) {
    console.log("Cargo el window:beforeunload-beforeUnloadHandler");
    $event.returnValue = this.allowRedirect;
    return this.allowRedirect;
  }

  canDeactivate(): boolean {
    return this.allowRedirect;
  }

  ngOnInit(): void {
    let that = this;

    window.setTimeout(function () {
      that.validateParams();
    }, 1000);
  }

  validateParams(): void {
    this.route.queryParamMap
      .subscribe((queryParams: any) => {
        console.log("PARAMS**********");
        console.log(queryParams);
        this.param1 = queryParams.params.param1;
        this.param1 = this.param1?.replaceAll("%20", "+");
        this.param1 = this.param1?.replaceAll(" ", "+");
        this.param2 = queryParams.params.param2;
        console.log("Param1 " + this.param1);
        console.log("Param2 " + this.param2);

        if (
          this.param1 === "" || this.param2 === "" ||
          this.param1 === undefined || this.param2 === undefined ||
          this.param1 === null || this.param2 === null
        ) {
          this.redirectMenu();
          return;
        }

        this.login();
      });
  }

  login(): void {
    this.openerLoader("Autenticando");
    this.authService.login(this.param1, this.param2)
      .subscribe((response: AuthResponse) => {
        this.authData = response;
        let info: string[] | undefined = this.authData !== null ? this.authData?.url_decrypted?.split("|") : [];
        if (info !== undefined && info?.length > 0) {
          this.authData.metadata = {
            agencia: info[1] ? info[1] : "",
            caja: info[2] ? info[2] : "",
            usuario: info[3] ? info[3] : "",
            param2: info[0] ? info[0] : "",
          };
        }

        localStorage.setItem("authData", JSON.stringify(this.authData))

        if (this.authData !== undefined && this.authData !== null && (this.authData.error === null || this.authData.error === undefined || this.authData.error === "")) {
          this.step = "step1";
          let token: any = this.authData.access_token;
          localStorage.setItem("token", token);
          this.closeLoader();
        } else {
          alert(this.authData.error_description);
          this.closeLoader();
          let that = this;
          window.setTimeout(function(){
            that.redirectMenu();
          }, 2000);
        }

        return;
      }, (err: any) => {
        this.redirectMenu();
        return;
      });
  }

  redirectMenu(): void {
    this.router.ngOnDestroy();
    window.location.href = this.MENU_URL;
    return;
  }

  findPaymentToMain(event: any) {
    console.log("Emit find payment", event);
    this.step = event.status;
    this.moneyTransferPayFind = event.data;
    this.domainItems = event.domainItems;
    this.findPaymentRequest = event.findPaymentRequest;
  }

  openerLoader(label: string = '') {
    this.loaderLabel = label === '' ? "Cargando" : label;
    this.loaderOpener = true;
  }

  closeLoader() {
    this.loaderLabel = "Cargando";
    this.loaderOpener = false;
  }

  interactiveLoader(event: any) {
    if (event.status === 'open') {
      this.openerLoader(event.message);
    } else {
      this.closeLoader();
    }
  }

}
