import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/AuthResponse';
import { DomainItem } from 'src/app/interfaces/DomainItem';
import { CBService } from 'src/app/services/cb.service';
import { PaymentFindService } from 'src/app/services/payment.find.service';
import { environment } from 'src/environments/environment';
import { MoneyTransferPayMapperService } from 'src/app/services/moneytransferpaymapper.service';
import { MoneyTransferPayFind } from 'src/app/interfaces/MoneyTransferFind';
import { FindPaymentRequest } from 'src/app/interfaces/FindPaymentRequest';

@Component({
  selector: 'app-find-payment-form',
  templateUrl: './find-payment-form.component.html',
  styleUrls: ['./find-payment-form.component.css', './../payment-main/payment-main.component.css']
})
export class FindPaymentFormComponent implements OnInit {

  @Input('authData') authData: AuthResponse | null | undefined = null;
  @Output() findPaymentToMain = new EventEmitter<{status: string, data: MoneyTransferPayFind, findPaymentRequest:FindPaymentRequest, domainItems:DomainItem[] | null}>();
  @Output() interactiveLoader = new EventEmitter<{status: string, message: string}>();

  documentTypes: DomainItem[] | null = [];
  param1: string = '';
  param2: string = '';
  form: FormGroup;

  MENU_URL: string = environment.ROOT.URL;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cbService: CBService,
    private paymentFindService: PaymentFindService, 
    private moneyTransferPayMapperService: MoneyTransferPayMapperService
  ) {
    this.form = this.formBuilder.group({
      mtcn: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((queryParams: any) => {
        this.param1 = queryParams.params.param1;
        this.param2 = queryParams.params.param2;
      });
    this.loadCBTipeOfDocuments();
    if(this.authData===null) {
      this.authData = {};
    }
  }

  loadCBTipeOfDocuments(): void {
    this.cbService.getDocumentTypes().subscribe((response: DomainItem[]) => {
      this.documentTypes = response? response?.filter(
        item => item.parentRef === "NATU"
      ):[];
    });
  }

  submit() {
    this.openLoader("Procesando pago");

    let request:FindPaymentRequest = {
      mtcn : this.form.value.mtcn,
      documentType : this.form.value.tipo_documento,
      documentNumber : this.form.value.numero_documento,
    }

    console.log("Request find payment", request)

    this.paymentFindService.getMoneyTransfer(request, this.authData)
    .subscribe((response: MoneyTransferPayFind) => {
      this.sendToParent(response, request);
      this.closeLoader();
      }, (err => {
        console.log(err);
        this.closeLoader();
        alert("Error al procesar la transaccion!");
      }));
  }

  resetForm() {
    this.form.reset();
  }

  cancel() {
    this.openLoader("Redirigiendo...");
    this.router.ngOnDestroy();
    window.location.href = this.MENU_URL + "?param1=" + this.param1 + "&param2=" + this.param2;
    return;
  }

  sendToParent(data:MoneyTransferPayFind, request:FindPaymentRequest){
    this.findPaymentToMain.emit({status: "step2", data: data, findPaymentRequest: request, domainItems: this.documentTypes});
  }

  openLoader(message:string){
    this.interactiveLoader.emit({status: "open", message: message});
  }

  closeLoader(){
    this.interactiveLoader.emit({status: "close", message: ""});
  }

}
