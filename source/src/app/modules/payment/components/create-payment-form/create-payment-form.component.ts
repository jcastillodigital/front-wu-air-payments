import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthResponse } from 'src/app/interfaces/AuthResponse';
import { DomainItem } from 'src/app/interfaces/DomainItem';
import { FindPaymentRequest } from 'src/app/interfaces/FindPaymentRequest';
import { MoneyTransferPayFind } from 'src/app/interfaces/MoneyTransferFind';
import { VoucherRequest } from 'src/app/interfaces/VoucherRequest';
import { AlertService } from 'src/app/services/alert.service';
import { CBService } from 'src/app/services/cb.service';
import { MoneyTransferPayMapperService } from 'src/app/services/moneytransferpaymapper.service';
import { PaymentConfirmService } from 'src/app/services/payment.confirm.service';
import { PaymentFindService } from 'src/app/services/payment.find.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-payment-form',
  templateUrl: './create-payment-form.component.html',
  styleUrls: ['./create-payment-form.component.css', './../payment-main/payment-main.component.css']
})
export class CreatePaymentFormComponent implements OnInit {

  isSubmited: boolean = false;
  form: FormGroup;
  MENU_URL: string = environment.ROOT.URL;
  valPep: boolean = false;
  addressTypes: DomainItem[] | null = [];
  ocupations: DomainItem[] | null = [];
  positions: DomainItem[] | null = [];
  zones: DomainItem[] | null = [];
  genderTypes: DomainItem[] | null = [];
  countries: DomainItem[] | null = [];
  departments: DomainItem[] | null = [];
  cities: DomainItem[] | null = [];
  locationCities: DomainItem[] | null = [];
  locationCompanyCities: DomainItem[] | null = [];
  indicatives: DomainItem[] | null = [];
  economicActivities: DomainItem[] | null = [];
  activityRange: DomainItem[] | null = [];
  detailOtherIncome: DomainItem[] | null = [];
  expenseRange: DomainItem[] | null = [];
  activeRange: DomainItem[] | null = [];
  passiveRange: DomainItem[] | null = [];
  transactionalMotives: DomainItem[] | null = [];
  transactionalRelationship: DomainItem[] | null = [];
  typeOperation: DomainItem[] | null = [];
  roiData: DomainItem[] | null = [];
  countryValue: string | undefined = "";
  locationCountryValue: string = "";
  companyCountryValue: string = "";

  @Input('moneyTransferPayFind') moneyTransferPayFind: MoneyTransferPayFind | null = null;
  @Input('authData') authData: AuthResponse | null = null;
  @Input('documentTypes') documentTypes: DomainItem[] | null = [];
  @Input('findPaymentRequest') findPaymentRequest: FindPaymentRequest | null = null;
  @Output() interactiveLoader = new EventEmitter<{ status: string, message: string }>();

  param1: string = '';
  param2: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cbService: CBService,
    private paymentConfirmService: PaymentConfirmService,
    private voucherService: VoucherService
  ) {
    this.form = this.formBuilder.group({

      //*****************************/
      mtcn: ['', Validators.required],
      codTypeIdentification: ['', Validators.required],
      documentNumber: ['', Validators.required],
      idIssueDate: ['', Validators.required],

      //*****************************/
      senderValName: ['', Validators.required],
      receiverValName: ['', Validators.required],
      senderValCountry: ['', Validators.required],
      senderValCity: ['', Validators.required],
      valOriginalDestinationCurrency: ['', Validators.required],
      valPrincipal: ['', Validators.required],
      valGMF: ['', Validators.required],
      codDestinationCurrency: ['', Validators.required],
      valUSD: ['', Validators.required],
      valPay: ['', Validators.required],
      valRateExchange: ['', Validators.required],
      cashValueCOP: ['', Validators.required],

      // Consulta de información ***************************************/
      valFirstName: ['', Validators.required],
      valMiddleName: [''],
      valLastName: ['', Validators.required],
      valMiddleLastName: ['', Validators.required],
      valNationality: ['', Validators.required],
      valBirthPlace: ['', Validators.required],
      valBirthPlace1: [''],
      valBirthPlace2: [''],
      dateOfBirth: ['', Validators.required],
      valGender: ['', Validators.required],
      valPep: [''],

      // Solicitud de Información para Operaciones (PEP) **************/
      detailActivity: [''],
      kinshipBeneficiary: [''],
      reasonShipping: [''],
      fundsTarget: [''],

      // Datos de ubicación *******************************************/
      valCountry: ['', Validators.required],

      valState: ['', Validators.required],
      valResidencePlace: ['', Validators.required],

      valState1: [''],
      valResidencePlace1: [''],
      valState2: [''],
      valResidencePlace2: [''],

      valResidencialCountryCode: ['', Validators.required],
      valMobile: ['', Validators.required],
      phoneCountryCode: ['', Validators.required],
      valPhone: ['', Validators.required],
      valAddress: ['', Validators.required],

      addressType: [''],
      numberVia: [''],
      zone: [''],
      bis: [''],
      bisNumber1: [''],
      bisNumber2: [''],

      otherAddress: [''],
      valEmail: ['', Validators.required],

      // Información - Actividad económica ****************************/
      valOccupation: ['', Validators.required],
      valJob: [''],
      valCompanyName: [''],
      valCompanyCountry: [''],
      valCompanyState: [''],
      valCompanyState1: [''],
      valCompanyState2: [''],

      valCompanyCity: [''],
      valCompanyCity1: [''],
      valCompanyCity2: [''],

      valCompanyCountryCode: [''],
      valCompanyPhone: [''],
      valCompanyAddress: [''],

      companyAddressType: [''],
      companyAddressNumber: [''],
      companyZone: [''],
      companyBis: [''],
      companyZoneNumber1: [''],
      companyZoneNumber2: [''],

      // Información - Financiera *************************************/
      codEconomicActivity: ['', Validators.required],
      valIncome: ['', Validators.required],
      valOtherIncome: ['', Validators.required],
      valOtherIncomeDescription: ['', Validators.required],
      valExpenses: ['', Validators.required],
      valAssets: ['', Validators.required],
      valPassive: ['', Validators.required],

      // Informacion transaccional ************************************/
      codDestinationOfFundsEconomic: ['', Validators.required],
      valRelationshipReceiver: ['', Validators.required],

      // Reporte de operaciones inusuales *****************************/
      codROI: ['', Validators.required],
      descROI: [''],

      // Liquidación del giro en pesos *****************************/
      finalGmf: ['', Validators.required],
      finalValue: ['', Validators.required],

      //*****************************/
      isVerified: ['', Validators.required]
    });


    //*************************************************************
    this.form.get('valState1')?.valueChanges.subscribe(value => {
      this.locationCities = this.cities ? this.cities?.filter(
        city => city.parentRef === value
      ) : [];
      this.form.controls['valState'].setValue(value);
    });

    this.form.get('valState2')?.valueChanges.subscribe(value => {
      this.form.controls['valState'].setValue(value);
    });

    //*************************************************************
    this.form.get('valResidencePlace1')?.valueChanges.subscribe(value => {
      this.form.controls['valResidencePlace'].setValue(value);
    });

    this.form.get('valResidencePlace2')?.valueChanges.subscribe(value => {
      this.form.controls['valResidencePlace'].setValue(value);
    });

    //*************************************************************
    this.form.get('valBirthPlace1')?.valueChanges.subscribe(value => {
      this.form.controls['valBirthPlace'].setValue(value);
    });

    this.form.get('valBirthPlace2')?.valueChanges.subscribe(value => {
      this.form.controls['valBirthPlace'].setValue(value);
    });

    //*************************************************************
    this.form.get('valCompanyState1')?.valueChanges.subscribe(value => {
      this.locationCompanyCities = this.cities ? this.cities?.filter(
        city => city.parentRef === value
      ) : [];
      this.form.controls['valCompanyState'].setValue(value);
    });

    this.form.get('valCompanyState2')?.valueChanges.subscribe(value => {
      this.form.controls['valCompanyState'].setValue(value);
    });

    //*************************************************************
    this.form.get('valCompanyCity1')?.valueChanges.subscribe(value => {
      this.form.controls['valCompanyCity'].setValue(value);
    });

    this.form.get('valCompanyCity2')?.valueChanges.subscribe(value => {
      this.form.controls['valCompanyCity'].setValue(value);
    });

    //*************************************************************
    this.form.get('valPep')?.valueChanges.subscribe(value => {
    });

  }

  ngOnInit(): void {
    let that: any = this;

    this.route.queryParamMap
      .subscribe((queryParams: any) => {
        this.param1 = queryParams.params.param1;
        this.param2 = queryParams.params.param2;
      });

    this.loadTypes();

    /*****************************/
    this.form.controls['mtcn'].setValue(this.findPaymentRequest?.mtcn);
    this.form.controls['codTypeIdentification'].setValue(this.findPaymentRequest?.documentType);
    //this.form.controls['codTypeIdentification'].disable();
    this.form.controls['documentNumber'].setValue(this.findPaymentRequest?.documentNumber);
    //**************************** * /
    this.form.controls['senderValCountry'].disable();

    this.form.controls['senderValName'].setValue(this.moneyTransferPayFind?.senderValFirstName + " " + this.moneyTransferPayFind?.senderValLastName);
    this.form.controls['receiverValName'].setValue(this.moneyTransferPayFind?.receiverValFirstName + " " + this.moneyTransferPayFind?.receiverValLastName);
    this.form.controls['senderValCountry'].setValue(this.moneyTransferPayFind?.senderValCountry);
    this.form.controls['senderValCity'].setValue(this.moneyTransferPayFind?.valOriginatingCityLocale);
    this.form.controls['valOriginalDestinationCurrency'].setValue(this.moneyTransferPayFind?.valOriginalDestinationCurrency);
    this.form.controls['valPrincipal'].setValue(this.moneyTransferPayFind?.valPrincipal);
    this.form.controls['valGMF'].setValue(this.moneyTransferPayFind?.valGMF);
    this.form.controls['valUSD'].setValue(this.moneyTransferPayFind?.valUSD);
    this.form.controls['codDestinationCurrency'].setValue(this.moneyTransferPayFind?.codDestinationCurrency);
    this.form.controls['valPay'].setValue(this.moneyTransferPayFind?.valPay);
    this.form.controls['valRateExchange'].setValue(this.moneyTransferPayFind?.valRateExchange);
    this.form.controls['cashValueCOP'].setValue(this.moneyTransferPayFind?.cashValueCOP);

    //***************************** /
    if (!this.moneyTransferPayFind?.isNewReceiver) {

      this.form.controls['idIssueDate'].setValue(this.moneyTransferPayFind?.customerIdIssueDate);
      this.form.controls['valFirstName'].setValue(this.moneyTransferPayFind?.customerValFirstName);
      this.form.controls['valMiddleName'].setValue(this.moneyTransferPayFind?.customerValMiddleName);
      this.form.controls['valLastName'].setValue(this.moneyTransferPayFind?.customerValLastName);
      this.form.controls['valMiddleLastName'].setValue(this.moneyTransferPayFind?.customerValMiddleLastName);
      this.form.controls['valNationality'].setValue(this.moneyTransferPayFind?.customerValNationality);
      this.selectCountry(this.form.controls['valNationality'].value, parseInt(that.moneyTransferPayFind?.customerValBirthPlace) + "");
      this.form.controls['dateOfBirth'].setValue(this.moneyTransferPayFind?.customerDateOfBirth);
      this.form.controls['valGender'].setValue(this.moneyTransferPayFind?.customerValGender);
    }

    //*****************************/
    this.form.controls['valCountry'].setValue(this.moneyTransferPayFind?.customerValCountry);

    this.form.controls['valResidencialCountryCode'].setValue(this.moneyTransferPayFind?.customerValResidencialCountryCode);
    this.form.controls['valMobile'].setValue(this.moneyTransferPayFind?.customerValMobile);
    this.form.controls['phoneCountryCode'].setValue(this.moneyTransferPayFind?.customerPhoneCountryCode);
    this.form.controls['valPhone'].setValue(this.moneyTransferPayFind?.customerValPhone);
    this.form.controls['valAddress'].setValue(this.moneyTransferPayFind?.customerValAddress);
    this.form.controls['valEmail'].setValue(this.moneyTransferPayFind?.customerEmail);

    //*****************************/
    this.form.controls['valOccupation'].setValue(this.moneyTransferPayFind?.customerValOccupation);
    this.form.controls['valJob'].setValue(this.moneyTransferPayFind?.customerValJob);
    this.form.controls['valCompanyName'].setValue(this.moneyTransferPayFind?.customerValCompanyName);
    this.form.controls['valCompanyCountry'].setValue(this.moneyTransferPayFind?.customerValCompanyCountry);
    this.selectCompanyCountry(this.form.controls['valNationality'].value, parseInt(that.moneyTransferPayFind?.customerValBirthPlace) + "");

    this.form.controls['valCompanyCountryCode'].setValue(this.moneyTransferPayFind?.customerValCompanyCountryCode);
    this.form.controls['valCompanyPhone'].setValue(this.moneyTransferPayFind?.customerValCompanyPhone);
    this.form.controls['valCompanyAddress'].setValue(this.moneyTransferPayFind?.customerValCompanyAddress);

    //***************************** /
    this.form.controls['codEconomicActivity'].setValue(this.moneyTransferPayFind?.customerCodEconomicActivity);
    this.form.controls['valIncome'].setValue(this.moneyTransferPayFind?.customerValIncome);
    this.form.controls['valOtherIncome'].setValue(this.moneyTransferPayFind?.customerValOtherIncome);
    this.form.controls['valOtherIncomeDescription'].setValue(this.moneyTransferPayFind?.customerValOtherIncomeDescription);
    this.form.controls['valExpenses'].setValue(this.moneyTransferPayFind?.customerValExpenses);
    this.form.controls['valAssets'].setValue(this.moneyTransferPayFind?.customerValAssets);
    this.form.controls['valPassive'].setValue(this.moneyTransferPayFind?.customerValPassive);

    //***************************** /
    this.form.controls['codDestinationOfFundsEconomic'].setValue(this.moneyTransferPayFind?.customerCodDestinationOfFundsEconomic);
    this.form.controls['valRelationshipReceiver'].setValue(this.moneyTransferPayFind?.customerValRelationshipReceiver);

    /*this.form.controls['codROI'].setValue(this.moneyTransferPayFind?.customerCodROI);
    this.form.controls['descROI'].setValue(this.moneyTransferPayFind?.customerDescROI);*/

    //***************************** /
    this.form.controls['finalGmf'].setValue(this.moneyTransferPayFind?.valGMF);
    this.form.controls['finalValue'].setValue(this.moneyTransferPayFind?.valPay);

    console.log("OnInit load ==============>");
    console.log(this.moneyTransferPayFind);
  }

  openLoader(message: string) {
    this.interactiveLoader.emit({ status: "open", message: message });
  }

  closeLoader() {
    this.interactiveLoader.emit({ status: "close", message: "" });
  }

  cancel() {
    this.openLoader("Redirigiendo...");
    this.router.ngOnDestroy();
    window.location.href = this.MENU_URL + "?param1=" + this.param1 + "&param2=" + this.param2;
    return;
  }

  next() {
    //this.isSubmited = true;

    console.log(this.form.value);
    if (this.form.valid && this.form.controls['isVerified'].value === 'yes') {
      //if (this.isSubmited) {
      this.openLoader("Procesando pago");
      let request: FindPaymentRequest = {
        mtcn: this.findPaymentRequest?.mtcn,
        documentType: this.findPaymentRequest?.documentType,
        documentNumber: this.findPaymentRequest?.documentNumber,
      }

      let auth: AuthResponse = {
        access_token: this.authData?.access_token,
        token_type: this.authData?.token_type,
        url_decrypted: this.authData?.url_decrypted,
        metadata: this.authData?.metadata,
      }

      let that = this;
      this.paymentConfirmService.confirmMoneyTransfer(request, auth, this.form.value)
        .subscribe((response: VoucherRequest) => {
          this.voucherService.downloadAsFile(response);
          window.setTimeout(function () {
            that.closeLoader();
            //that.cancel()
          }, 5000);

        }, (err: any) => {
          that.closeLoader();
          alert("Validar nuevamente la informacion ingresada!");
        });
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    this.isSubmited = true;
  }

  validateIsPep(values: any) {
    this.valPep = values.currentTarget.checked;
  }

  loadTypes(): void {
    this.cbService.getGenderTypes().subscribe((response: DomainItem[]) => {
      this.genderTypes = response;
    });

    this.cbService.getCountries().subscribe((response: DomainItem[]) => {
      this.countries = response;
    });

    this.cbService.getDepartments().subscribe((response: DomainItem[]) => {
      this.departments = response;
    });

    this.cbService.getCities().subscribe((response: DomainItem[]) => {
      this.cities = response;
    });

    this.cbService.getIndicatives().subscribe((response: DomainItem[]) => {
      this.indicatives = response;
    });

    this.cbService.getAddressTypes().subscribe((response: DomainItem[]) => {
      this.addressTypes = response;
    });

    this.cbService.getZones().subscribe((response: DomainItem[]) => {
      this.zones = response;
    });

    this.cbService.getOcupations().subscribe((response: DomainItem[]) => {
      this.ocupations = response;
    });

    this.cbService.getPositions().subscribe((response: DomainItem[]) => {
      this.positions = response;
    });

    this.cbService.getEconomicActivities().subscribe((response: DomainItem[]) => {
      this.economicActivities = response;
    });

    this.cbService.getActivityRange().subscribe((response: DomainItem[]) => {
      this.activityRange = response;
    });

    this.cbService.getDetailOtherIncome().subscribe((response: DomainItem[]) => {
      this.detailOtherIncome = response;
    });

    this.cbService.getExpenseRange().subscribe((response: DomainItem[]) => {
      this.expenseRange = response;
    });

    this.cbService.getActiveRange().subscribe((response: DomainItem[]) => {
      this.activeRange = response;
    });

    this.cbService.getPassiveRange().subscribe((response: DomainItem[]) => {
      this.passiveRange = response;
    });

    this.cbService.getTransactionalMotive().subscribe((response: DomainItem[]) => {
      this.transactionalMotives = response;
    });

    this.cbService.getTransactionalRelationship().subscribe((response: DomainItem[]) => {
      this.transactionalRelationship = response;
    });

    this.cbService.getTypeTransaction().subscribe((response: DomainItem[]) => {
      this.typeOperation = response;
    });

    this.cbService.getROI().subscribe((response: DomainItem[]) => {
      this.roiData = response;
    });

  }

  selectCountry(countryValue: any | null, city: string = '') {
    let that = this;
    this.countryValue = countryValue;

    this.form.controls['valBirthPlace'].setValue('');
    this.form.controls['valBirthPlace1'].setValue('');
    this.form.controls['valBirthPlace2'].setValue('');

    if (countryValue === "CO") {
      window.setTimeout(function () {
        that.form.controls['valBirthPlace1'].setValue(city);
      }, 2000);
    } else {
      this.form.controls['valBirthPlace2'].setValue(city);
    }
  }

  selectLocationCountry(value: any | null) {
    this.locationCountryValue = value;

    this.form.controls['valState'].setValue("");
    this.form.controls['valState1'].setValue("");
    this.form.controls['valState2'].setValue("");
    this.form.controls['valResidencePlace'].setValue("");
    this.form.controls['valResidencePlace1'].setValue("");
    this.form.controls['valResidencePlace2'].setValue("");
  }

  selectCompanyCountry(countryValue: any | null, city: string = '') {
    this.companyCountryValue = countryValue;
    this.form.controls['valCompanyState'].setValue("");
    this.form.controls['valCompanyState1'].setValue("");
    this.form.controls['valCompanyState2'].setValue("");
    this.form.controls['valCompanyCity'].setValue("");
    this.form.controls['valCompanyCity1'].setValue("");
    this.form.controls['valCompanyCity2'].setValue("");
  }

  selectLocationDepartment(departmentValue: any | null) {
    this.locationCities = this.cities ? this.cities?.filter(
      city => city.parentRef === departmentValue
    ) : [];
  }

  selectLocationCompanyDepartment(departmentValue: any | null) {
    this.locationCompanyCities = this.cities ? this.cities?.filter(
      city => city.parentRef === departmentValue
    ) : [];
  }

  setAddress() {
    this.form.controls['valAddress'].setValue(
      this.form.controls['addressType'].value + " " +
      this.form.controls['numberVia'].value + " " +
      this.form.controls['zone'].value + " " +
      (this.form.controls['bis'].value ? "BIS" : "") + " # " +
      this.form.controls['bisNumber1'].value + " - " +
      this.form.controls['bisNumber2'].value
    );
  }

  setAddress2() {
    this.form.controls['valCompanyAddress'].setValue(
      this.form.controls['companyAddressType'].value + " " +
      this.form.controls['companyAddressNumber'].value + " " +
      this.form.controls['companyZone'].value + " " +
      (this.form.controls['companyBis'].value ? "BIS" : "") + " # " +
      this.form.controls['companyZoneNumber1'].value + " - " +
      this.form.controls['companyZoneNumber2'].value
    );
  }

  selectOcupation() {

    console.log("Occupation", this.form.controls['valOccupation'].value);

    /*if(this.form.controls['valOccupation'].value === 'HOG' || 
    this.form.controls['valOccupation'].value === 'PEN' || 
    this.form.controls['valOccupation'].value === 'DES') {
      this.form.get('valCompanyName')?.setValidators([]);
    } else {
      this.form.get('valCompanyName')?.setValidators([Validators.required]);
    }

    if(this.form.controls['valOccupation'].value === 'HOG' || 
    this.form.controls['valOccupation'].value === 'PEN' || 
    this.form.controls['valOccupation'].value === 'DES' ||
    this.form.controls['valOccupation'].value === 'EST'
    ) {
      this.form.get('valCompanyCountry')?.setValidators([]);
      this.form.get('valCompanyState')?.setValidators([]);
      this.form.get('valCompanyCity')?.setValidators([]);
      this.form.get('valCompanyCountryCode')?.setValidators([]);
      this.form.get('valCompanyPhone')?.setValidators([]);
      this.form.get('valCompanyAddress')?.setValidators([]);      
    } else {
      this.form.get('valCompanyCountry')?.setValidators([Validators.required]);
      this.form.get('valCompanyState')?.setValidators([Validators.required]);
      this.form.get('valCompanyCity')?.setValidators([Validators.required]);
      this.form.get('valCompanyCountryCode')?.setValidators([Validators.required]);
      this.form.get('valCompanyPhone')?.setValidators([Validators.required]);
      this.form.get('valCompanyAddress')?.setValidators([Validators.required]); 
    }*/
  }

  getValidateOcupation() {
    return !(this.form.controls['valOccupation'].value !== 'HOG' &&
      this.form.controls['valOccupation'].value !== 'PEN' &&
      this.form.controls['valOccupation'].value !== 'DES' &&  this.form.controls['valOccupation'].value !== '');
  }

}
