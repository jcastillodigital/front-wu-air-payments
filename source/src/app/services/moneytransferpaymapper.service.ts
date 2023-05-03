import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { AuthResponse } from "../interfaces/AuthResponse";
import { FindPaymentRequest } from "../interfaces/FindPaymentRequest";
import { MoneyTransferPayFind } from "../interfaces/MoneyTransferFind";
import { IXMLtoObjectMapperService } from "./abstract/imapper.service";
import { xml2json } from 'xml-js';
import { Utils } from "../utils/Utils";
import { AbstractMapperService } from "./abstract/abstract.mapper.service";

@Injectable()
export class MoneyTransferPayMapperService extends AbstractMapperService implements IXMLtoObjectMapperService<string, MoneyTransferPayFind> {

   
   requestStep1(request: FindPaymentRequest, authData: AuthResponse | null | undefined): string {
      var idTx = Utils.generateUUID();
      localStorage.setItem('idTx', idTx);
      return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:srv="http://www.girosyfinanzas.com/servicios/DireccionCanales/SrvIntPayMoneyTransfer/">
           <soapenv:Header />
           <soapenv:Body>
              <srv:searchRequest>
                 <contextTransaction>
                    <idTx>`+ idTx + `</idTx>
                    <idUser>`+ authData?.metadata?.usuario + `</idUser>
                    <idConsumer>APPCB</idConsumer>
                    <idService>APPCB</idService>
                    <codTypeTx>PGI</codTypeTx>
                    <creationMsgDate></creationMsgDate>
                 </contextTransaction>
                 <agent>
                    <id>`+ authData?.metadata?.param2 + `</id>
                    <office>
                       <servicePoint>
                          <id>`+ authData?.metadata?.agencia + `</id>
                          <device>
                             <id>`+ authData?.metadata?.caja + `</id>
                          </device>
                       </servicePoint>
                    </office>
                 </agent>
                 <customer>
                    <id>`+ request.documentNumber + `</id>
                    <typeIdentification>`+ request.documentType + `</typeIdentification>
                 </customer>
                 <moneyTransfer>
                    <valNumeralExchange></valNumeralExchange>
                    <idMTCN>`+ request.mtcn + `</idMTCN>
                    <valPayoutCountry>CO</valPayoutCountry>
                    <valPayoutCurrency>COP</valPayoutCurrency>
                 </moneyTransfer>
                 <ipAddress>10.10.10.1</ipAddress>
                 <methodOfPayment>
                    <cash>
                       <code>EFE</code>
                       <currencyCode>COP</currencyCode>
                    </cash>
                 </methodOfPayment>
              </srv:searchRequest>
           </soapenv:Body>
        </soapenv:Envelope>`;
   }


   requestStep2(request: FindPaymentRequest | null | undefined, authData: any, data: any): string {

      console.log("Request data");
      console.log(JSON.stringify(data));

      let json = localStorage.getItem("authData");
      authData = JSON.parse(json?json:"");

      var xml: any = localStorage.getItem("step1");
      const parser = new DOMParser();
      const doc: any = parser.parseFromString(xml, "text/xml");
      const payment = doc.getElementsByTagName("payment")[0];
      const moneyTransfer = payment.getElementsByTagName("moneyTransfers")[0].getElementsByTagName('moneyTransfer')[0];
      const receiver = moneyTransfer.getElementsByTagName("receiver")[0];
      const sender = moneyTransfer.getElementsByTagName("sender")[0];

      var idTrx = Utils.generateUUID();


      var xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:srv="http://www.girosyfinanzas.com/servicios/DireccionCanales/SrvIntPayMoneyTransfer/">
      <soapenv:Header />
      <soapenv:Body>
         <srv:paymentRequest>
            <contextTransaction>
               <idTx>`+ idTrx + `</idTx>
               <idUser>`+ authData.metadata.usuario + `</idUser>
               <idConsumer>APPCB</idConsumer>
               <idService>APPCB</idService>
               <codTypeTx>PGI</codTypeTx>
            </contextTransaction>
            <ipAddress>10.10.10.1</ipAddress>
            <agent>
               <id>`+ authData?.metadata?.param2 + `</id>
               <office>
                  <servicePoint>
                     <id>`+ authData?.metadata?.agencia + `</id>
                        <device>
                        <id>`+ authData?.metadata?.caja + `</id>
                     </device>
                  </servicePoint>
               </office>
            </agent>
            <payment>
               <valPay>` + this.getNodeValue(payment, "valPay") + `</valPay>
               <valGMF>` + this.getNodeValue(payment, "valGMF") + `</valGMF>
               <valueAfterTax>` + this.getNodeValue(payment, "valueAfterTax") + `</valueAfterTax>
               <valNumeralExchange>1809</valNumeralExchange>
               <moneyTransfers>
                  <moneyTransfer>
                     <valDestinationCountry>` + this.getNodeValue(moneyTransfer, "valDestinationCountry") + `</valDestinationCountry>
                     <codDestinationCurrency>` + this.getNodeValue(moneyTransfer, "codDestinationCurrency") + `</codDestinationCurrency>
                     <valRateExchange>` + this.getNodeValue(moneyTransfer, "valRateExchange") + `</valRateExchange>
                     <valExpectedActualPayout>` + this.getNodeValue(moneyTransfer, "valExpectedActualPayout") + `</valExpectedActualPayout>
                     <dateFiling>` + this.getNodeValue(moneyTransfer, "dateFiling") + `</dateFiling>
                     <timeFiling>` + this.getNodeValue(moneyTransfer, "timeFiling") + `</timeFiling>
                     <idMTCN>` + this.getNodeValue(moneyTransfer, "idMTCN") + `</idMTCN>
                     <idMoneyTransferKey>` + this.getNodeValue(moneyTransfer, "idMoneyTransferKey") + `</idMoneyTransferKey>
                     <valNewMTCN>` + this.getNodeValue(moneyTransfer, "valNewMTCN") + `</valNewMTCN>
                     <valOriginalDestinationCurrency>` + this.getNodeValue(moneyTransfer, "valOriginalDestinationCurrency") + `</valOriginalDestinationCurrency>
                     <valOriginatingCityLocale>` + this.getNodeValue(moneyTransfer, "valOriginatingCityLocale") + `</valOriginatingCityLocale>
                     <valOriginatingCountry>` + this.getNodeValue(moneyTransfer, "valOriginatingCountry") + `</valOriginatingCountry>
                     <codOriginatingCurrency>` + this.getNodeValue(moneyTransfer, "codOriginatingCurrency") + `</codOriginatingCurrency>
                     <valPayIndicator>P</valPayIndicator>
                     <descPayStatus>` + this.getNodeValue(moneyTransfer, "descPayStatus") + `</descPayStatus>
                     <valPayoutCountry>CO</valPayoutCountry>
                     <valPayoutCurrency>COP</valPayoutCurrency>
                     <valPrincipal>` + this.getNodeValue(moneyTransfer, "valPrincipal") + `</valPrincipal>
                     <valGross>` + this.getNodeValue(moneyTransfer, "valGross") + `</valGross>
                     <valCharges>` + this.getNodeValue(moneyTransfer, "valCharges") + `</valCharges>
                     <valForeignSystemReferenceNo>` + this.getNodeValue(moneyTransfer, "valForeignSystemReferenceNo") + `</valForeignSystemReferenceNo>
                     <sender>
                        <valNameType>` + this.getNodeValue(sender, "valNameType") + `</valNameType>
                        <valFirstName>` + this.getNodeValue(sender, "valFirstName") + `</valFirstName>
                        <valLastName>` + this.getNodeValue(sender, "valLastName") + `</valLastName>
                        <valPhone>` + this.getNodeValue(sender, "valPhone") + `</valPhone>
                        <valCountry>` + this.getNodeValue(sender, "valCountry") + `</valCountry>
                        <valState>` + this.getNodeValue(sender, "valState") + `</valState>
                        <valCity>` + this.getNodeValue(sender, "valCity") + `</valCity>
                        <valCurrentLocationZIP>` + this.getNodeValue(sender, "valCurrentLocationZIP") + `</valCurrentLocationZIP>
                        <valAddress>` + this.getNodeValue(sender, "valAddress") + `</valAddress>
                     </sender>
                     `+ this.getUserXml(data) + `
                     <templateId>UNI_01</templateId>
                     <transactionReason>1</transactionReason>
                  </moneyTransfer>
               </moneyTransfers>
               `+ this.getUserXml(data, true) + `
               <valRateExchange>` + this.getNodeValue(payment, "valRateExchange") + `</valRateExchange>
               <valBroker>` + this.getNodeValue(payment, "valBroker") + `</valBroker>
               <valFundsTarget />
               <valUSD>` + this.getNodeValue(payment, "valUSD") + `</valUSD>
               <cashValueCOP>` + this.getNodeValue(payment, "cashValueCOP") + `</cashValueCOP>
               <cashValueUSD>` + this.getNodeValue(payment, "cashValueUSD") + `</cashValueUSD>
            </payment>
            <representative>
               <id />
               <codTypeIdentification />
               <valFirstName />
               <valMiddleName />
               <valLastName />
               <valMiddleLastName />
               <valPhone />
               <codCity />
               <valAddress />
            </representative>
            <methodOfPayment>
               <cash>
                  <code>EFE</code>
                  <valTotalValue>` + this.getNodeValue(payment, "valPay") + `</valTotalValue>
                  <valNetValue>` + this.getNodeValue(payment, "valPay") + `</valNetValue>
                  <currencyCode>COP</currencyCode>
                  <GMF>` + this.getNodeValue(payment, "valGMF") + `</GMF>
               </cash>
            </methodOfPayment>
            ` + this.getFingerImage() + `
            <attachment>
               <file />
            </attachment>
            <codROI>` + data.codROI + `</codROI>
            <descROI>` + data.descROI + `</descROI>
            <detailActivity>` + data.detailActivity + `</detailActivity>
            <kinshipBeneficiary>` + data.kinshipBeneficiary + `</kinshipBeneficiary>
            <reasonShipping>` + data.reasonShipping + `</reasonShipping>
            <fundsTarget>` + data.fundsTarget + `</fundsTarget>
         </srv:paymentRequest>
      </soapenv:Body>
   </soapenv:Envelope>`;

      console.log("XMLRequest", xmlRequest);
      return xmlRequest;
   }

   convertDateToString(date:string) {
      return date.replaceAll("-","");
   }

   getUserXml(data: any, isCustomer: boolean = false) {
      return `<` + (isCustomer ? 'customer' : 'receiver') + `>
      <id>` + data.documentNumber + `</id>
      <codTypeIdentification>` + data.codTypeIdentification + `</codTypeIdentification>
      <valNameType>D</valNameType>
      <valFirstName>` + data.valFirstName + `</valFirstName>
      <valMiddleName>` + data.valMiddleName + `</valMiddleName>
      <valLastName>` + data.valLastName + `</valLastName>
      <valMiddleLastName>` + data.valMiddleLastName + `</valMiddleLastName>
      <valGender>` + data.valGender + `</valGender>
      <dateOfBirth>` + this.convertDateToString(data.dateOfBirth) + `</dateOfBirth>

      <idIssue>` + data.valNationality + `</idIssue>
      <idIssueDate>` + this.convertDateToString(data.idIssueDate) + `</idIssueDate>

      <countryOfBirth>` + data.valNationality + `</countryOfBirth>
      <valNationality>` + data.valNationality + `</valNationality>
      <valBirthPlace>` + data.valBirthPlace + `</valBirthPlace>
      
      <valCountry>` + data.valCountry + `</valCountry>
      <valResidencialCountry>` + data.valCountry + `</valResidencialCountry>
      <valState>` + data.valState + `</valState>
      <valResidencialState>` + data.valState + `</valResidencialState>
      <valResidencePlace>` + data.valResidencePlace + `</valResidencePlace>
      <valCity>` + data.valResidencePlace + `</valCity>

      <valResidencialCountryCode>` + data.valResidencialCountryCode + `</valResidencialCountryCode>
      <landLineCountryCode>` + data.valResidencialCountryCode + `</landLineCountryCode>
      <valMobile>` + data.valMobile + `</valMobile>
      <phoneCountryCode>` + data.phoneCountryCode + `</phoneCountryCode>
      <valPhone>` + data.valPhone + `</valPhone>
      <valAddress>` + data.valAddress + `</valAddress>
      <valEmail>` + data.valEmail + `</valEmail>

      <codTypeCustomer>1</codTypeCustomer>
      <valOccupation>` + data.valOccupation + `</valOccupation>
      <valJob>1</valJob>
      <valCompanyName>` + data.valCompanyName + `</valCompanyName>

      <valCompanyCountry>` + data.valCompanyCountry + `</valCompanyCountry>
      <valCompanyState>` + data.valCompanyState + `</valCompanyState>
      <valCityWork>` + data.valCompanyCity + `</valCityWork>
      <valCompanyCity>` + data.valCompanyCity + `</valCompanyCity>
      <valCompanyCountryCode>` + data.valCompanyCountryCode + `</valCompanyCountryCode>
      <valCompanyPhone>` + data.valCompanyPhone + `</valCompanyPhone>
      <valCompanyAddress>` + data.valCompanyAddress + `</valCompanyAddress>

      <codEconomicActivity>` + data.codEconomicActivity + `</codEconomicActivity>
      <valIncome>` + data.valIncome + `</valIncome>
      <valOtherIncome>` + data.valOtherIncome + `</valOtherIncome>
      <valOtherIncomeDescription>` + data.valOtherIncomeDescription + `</valOtherIncomeDescription>
      <valExpenses>` + data.valExpenses + `</valExpenses>
      <valAssets>` + data.valAssets + `</valAssets>
      <valPassive>` + data.valPassive + `</valPassive>
      
      <valIncomeCode>` + data.valIncome + `</valIncomeCode>
      <valExpensesCode>` + data.valExpenses + `</valExpensesCode>
      <valAssetsCode>` + data.valAssets + `</valAssetsCode>
      <valPassiveCode>` + data.valPassive + `</valPassiveCode>
      <valPep>` + (data.valPep ? 'Y' : 'N') + `</valPep>

      <valRelationshipReceiver>` + data.valRelationshipReceiver + `</valRelationshipReceiver>
      <codDestinationOfFundsEconomic>` + data.codDestinationOfFundsEconomic + `</codDestinationOfFundsEconomic>

      <fecLastUpdate>20230302</fecLastUpdate>
      <fecEnroll>2023-01-16</fecEnroll>
      <enrold>true</enrold>
      <flagReceiver>PROMOTE</flagReceiver>
      <havePhoneNumber>Y</havePhoneNumber>
      <doesIdExpire>N</doesIdExpire>
      <ackFlag>X</ackFlag>
      <activeCustomer>false</activeCustomer>
   </`+ (isCustomer ? 'customer' : 'receiver') + `>`;

   }

   xmlToDto(xml: string): MoneyTransferPayFind {
      const parser = new DOMParser();
      const doc: any = parser.parseFromString(xml, "text/xml");
      const payment = doc.getElementsByTagName("payment")[0];
      let newCustomer = false;
      let customer = null;
      if (payment.getElementsByTagName("customer")[0].getElementsByTagName("flagReceiver")[0].innerHTML === "NEW") {
         newCustomer = true;
      } else {
         customer = payment.getElementsByTagName("customer")[0];
      }

      const moneyTransfer = payment.getElementsByTagName("moneyTransfers")[0].getElementsByTagName('moneyTransfer')[0];
      const receiver = moneyTransfer.getElementsByTagName("receiver")[0];
      const sender = moneyTransfer.getElementsByTagName("sender")[0];


      let response: MoneyTransferPayFind = {
         mtcn: "",
         documentNumber: "",
         documentType: "",
         isNewReceiver: newCustomer,
         valPay: this.getNodeValue(payment, "valPay"),
         valGMF: this.getNodeValue(payment, "valGMF"),
         valueAfterTax: this.getNodeValue(payment, "valueAfterTax"),
         valRateExchange: this.getNodeValue(payment, "valRateExchange"),
         valUSD: this.getNodeValue(payment, "valUSD"),
         valBroker: this.getNodeValue(payment, "valBroker"),
         cashValueCOP: this.getNodeValue(payment, "cashValueCOP"),
         cashValueUSD: this.getNodeValue(payment, "cashValueUSD"),
         //----------------------------
         codDestinationCurrency: this.getNodeValue(moneyTransfer, "codDestinationCurrency"),
         codOriginatingCurrency: this.getNodeValue(moneyTransfer, "codOriginatingCurrency"),
         dateFiling: this.getNodeValue(moneyTransfer, "dateFiling"),
         descPayStatus: this.getNodeValue(moneyTransfer, "descPayStatus"),
         expectedPayoutLocationCity: this.getNodeValue(moneyTransfer, "expectedPayoutLocationCity"),
         expectedPayoutLocationStateCode: this.getNodeValue(moneyTransfer, "expectedPayoutLocationStateCode"),
         idMTCN: this.getNodeValue(moneyTransfer, "idMTCN"),
         idMoneyTransferKey: this.getNodeValue(moneyTransfer, "idMoneyTransferKey"),
         timeFiling: this.getNodeValue(moneyTransfer, "timeFiling"),
         valCharges: this.getNodeValue(moneyTransfer, "valCharges"),
         valDestinationCountry: this.getNodeValue(moneyTransfer, "valDestinationCountry"),
         valExpectedActualPayout: this.getNodeValue(moneyTransfer, "valExpectedActualPayout"),
         valForeignSystemReferenceNo: this.getNodeValue(moneyTransfer, "valForeignSystemReferenceNo"),
         valGross: this.getNodeValue(moneyTransfer, "valGross"),
         valNewMTCN: this.getNodeValue(moneyTransfer, "valNewMTCN"),
         valOriginalDestinationCurrency: this.getNodeValue(moneyTransfer, "valOriginalDestinationCurrency"),
         valOriginatingCityLocale: this.getNodeValue(moneyTransfer, "valOriginatingCityLocale"),
         valOriginatingCountry: this.getNodeValue(moneyTransfer, "valOriginatingCountry"),
         valPrincipal: this.getNodeValue(moneyTransfer, "valPrincipal"),
         trxValRateExchange: this.getNodeValue(moneyTransfer, "valRateExchange"),
         //----------------------------
         receiverValCountry: this.getNodeValue(receiver, "valCountry"),
         receiverValFirstName: this.getNodeValue(receiver, "valFirstName"),
         receiverValLastName: this.getNodeValue(receiver, "valLastName"),
         receiverValNameType: this.getNodeValue(receiver, "valNameType"),
         //----------------------------
         senderValAddress: this.getNodeValue(sender, "valAddress"),
         senderValCity: this.getNodeValue(sender, "valCity"),
         senderValCountry: this.getNodeValue(sender, "valCountry"),
         senderValCurrentLocationZIP: this.getNodeValue(sender, "valCurrentLocationZIP"),
         senderValFirstName: this.getNodeValue(sender, "valFirstName"),
         senderValLastName: this.getNodeValue(sender, "valLastName"),
         senderValPhone: this.getNodeValue(sender, "valPhone"),
         senderValState: this.getNodeValue(sender, "valState"),
         senderValNameType: this.getNodeValue(sender, "valNameType"),
         //----------------------------
         customerIdIssueDate: this.getStringToDate(this.getNodeValue(customer, "idIssueDate")),
         customerValFirstName: this.getNodeValue(customer, "valFirstName"),
         customerValMiddleName: this.getNodeValue(customer, "valMiddleName"),
         customerValLastName: this.getNodeValue(customer, "valLastName"),
         customerValMiddleLastName: this.getNodeValue(customer, "valMiddleLastName"),
         customerValNationality: this.getNodeValue(customer, "valNationality"),
         customerValBirthPlace: this.getNodeValue(customer, "valBirthPlace"), 
         customerDateOfBirth: this.getStringToDate(this.getNodeValue(customer, "dateOfBirth")),
         customerValGender: this.getNodeValue(customer, "valGender"),
         //----------------------------
         customerValCountry: this.getNodeValue(customer, "valCountry"),

         customerValResidencialCountryCode: this.getNodeValue(customer, "valResidencialCountryCode"),
         customerValMobile: this.getNodeValue(customer, "valMobile"),
         customerPhoneCountryCode: this.getNodeValue(customer, "phoneCountryCode"),
         customerValPhone: this.getNodeValue(customer, "valPhone"),
         customerValAddress: this.getNodeValue(customer, "valAddress"),
         customerEmail: this.getNodeValue(customer, "valEmail"),

         //----------------------------
         customerValOccupation: this.getNodeValue(customer, "valOccupation"),
         customerValJob: this.getNodeValue(customer, "valJob"),
         customerValCompanyName: this.getNodeValue(customer, "valCompanyName"),
         customerValCompanyCountry: this.getNodeValue(customer, "valCompanyCountry"),

         customerValCompanyCountryCode: this.getNodeValue(customer, "valCompanyCountryCode"),
         customerValCompanyPhone: this.getNodeValue(customer, "valCompanyPhone"),
         customerValCompanyAddress: this.getNodeValue(customer, "valCompanyAddress"),

         //----------------------------
         customerCodEconomicActivity: this.getNodeValue(customer, "codEconomicActivity"),
         customerValIncome: this.getNodeValue(customer, "valIncome"),
         customerValOtherIncome: this.getNodeValue(customer, "valOtherIncome"),
         customerValOtherIncomeDescription: this.getNodeValue(customer, "valOtherIncomeDescription"),
         customerValExpenses: this.getNodeValue(customer, "valExpenses"),
         customerValAssets: this.getNodeValue(customer, "valAssets"),
         customerValPassive: this.getNodeValue(customer, "valPassive"),

         //----------------------------
         customerCodDestinationOfFundsEconomic: this.getNodeValue(customer, "codDestinationOfFundsEconomic"),
         customerValRelationshipReceiver: this.getNodeValue(customer, "valRelationshipReceiver"),
         /*customerCodROI: this.getNodeValue(customer, "codROI"),
         customerDescROI: this.getNodeValue(customer, "descROI"),*/

      };

      console.log("Step1 response ", response);
      return response;
   }

   dtoToXML(dto: MoneyTransferPayFind): string {
      return '';
   }


}