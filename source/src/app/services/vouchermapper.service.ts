import { Injectable } from '@angular/core';
import { IXMLtoObjectMapperService } from './abstract/imapper.service';
import { VoucherRequest } from '../interfaces/VoucherRequest';
import { AbstractMapperService } from './abstract/abstract.mapper.service';

@Injectable()
export class VoucherMapperService extends AbstractMapperService implements IXMLtoObjectMapperService<string, VoucherRequest> {

  xmlToDto(xml: string): VoucherRequest {
    const parser = new DOMParser();
    const doc: any = parser.parseFromString(xml, "text/xml");
    const vouvher = doc.getElementsByTagName("voucher")[0];

    return {
      codTypeTx : "PGI",
      codCashier: this.getNodeValue(vouvher, "codCashier"),
      codCitySender : this.getNodeValue(vouvher, "codCitySender") ,
      codCountrySender : this.getNodeValue(vouvher, "codCountrySender") ,
      codCurrencySource : this.getNodeValue(vouvher, "codCurrencySource") ,
      codMTCN : this.getNodeValue(vouvher, "codMTCN") ,
      codOperationTypeNumber : this.getNodeValue(vouvher, "codOperationTypeNumber") ,
      codOperationTypeOperationDesc : this.getNodeValue(vouvher, "codOperationTypeOperationDesc") ,
      codOperatorAgent : this.getNodeValue(vouvher, "codOperatorAgent") ,
      codReceiverCity : this.getNodeValue(vouvher, "codReceiverCity") ,
      codTransactionNumber : this.getNodeValue(vouvher, "codTransactionNumber") ,
      codTypeIdentificationDeclarant : this.getNodeValue(vouvher, "codTypeIdentificationDeclarant") ,
      codTypeIdentificationReceiver : this.getNodeValue(vouvher, "codTypeIdentificationReceiver") ,
      dateTransaction : this.getNodeValue(vouvher, "dateTransaction") ,
      foreingExchangeRate : this.getNodeValue(vouvher, "foreingExchangeRate") ,
      idAgent : this.getNodeValue(vouvher, "idAgent") ,
      idDevice : this.getNodeValue(vouvher, "idDevice") ,
      informationalText : this.getNodeValue(vouvher, "informationalText") ,
      idReceiver : this.getNodeValue(vouvher, "idReceiver") ,
      totalValueTax : this.getNodeValue(vouvher, "totalValueTax") ,
      valAddressReceiver : this.getNodeValue(vouvher, "valAddressReceiver") ,
      valAutorizedAgent : this.getNodeValue(vouvher, "valAutorizedAgent") ,
      valAutorizedAgentId : this.getNodeValue(vouvher, "valAutorizedAgentId") ,
      valDeclarantClarification : this.getNodeValue(vouvher, "valDeclarantClarification") ,
      valDescOperationAgent : this.getNodeValue(vouvher, "valDescOperationAgent") ,
      valDescTypeOperationAgent : this.getNodeValue(vouvher, "valDescTypeOperationAgent") ,
      valDescriptionHeaderReceipt : this.getNodeValue(vouvher, "valDescriptionHeaderReceipt") ,
      valExpectedCurrency : this.getNodeValue(vouvher, "valExpectedCurrency") ,
      valExpectedValue : this.getNodeValue(vouvher, "valExpectedValue") ,
      valFirstNameDeclarant : this.getNodeValue(vouvher, "valFirstNameDeclarant") ,
      valFirstNameReceiver : this.getNodeValue(vouvher, "valFirstNameReceiver") ,
      valFirstNameSender : this.getNodeValue(vouvher, "valFirstNameSender") ,
      valFooter : this.getNodeValue(vouvher, "valFooter") ,
      valGMF : this.getNodeValue(vouvher, "valGMF") ,
      codTypeOperationAgent : this.getNodeValue(vouvher, "codTypeOperationAgent") ,
      codTypeTransactionAgent : this.getNodeValue(vouvher, "codTypeTransactionAgent") ,
      idDeclarant : this.getNodeValue(vouvher, "idDeclarant") ,
      idServicePoint : this.getNodeValue(vouvher, "idServicePoint") ,
      valIPDevice : this.getNodeValue(vouvher, "valIPDevice") ,
      valLastNameDeclarant : this.getNodeValue(vouvher, "valLastNameDeclarant") ,
      valLastNameReceiver : this.getNodeValue(vouvher, "valLastNameReceiver") ,
      valLastNameSender : this.getNodeValue(vouvher, "valLastNameSender") ,
      valNameAgent : this.getNodeValue(vouvher, "valNameAgent") ,
      valNameServicePoint : this.getNodeValue(vouvher, "valNameServicePoint") ,
      valNumeralExchange : this.getNodeValue(vouvher, "valNumeralExchange") ,
      valOccupation : this.getNodeValue(vouvher, "valOccupation") ,
      valOperationCurrency : this.getNodeValue(vouvher, "valOperationCurrency") ,
      valOperationType : this.getNodeValue(vouvher, "valOperationType") ,
      valOperationValue : this.getNodeValue(vouvher, "valOperationValue") ,
      valPhoneReceiver : this.getNodeValue(vouvher, "valPhoneReceiver") ,
      valRateExchange : this.getNodeValue(vouvher, "valRateExchange") ,
      valSourceValue : this.getNodeValue(vouvher, "valSourceValue") ,
      valTotalPay : this.getNodeValue(vouvher, "valTotalPay") ,
      valTotalTransaction : this.getNodeValue(vouvher, "valTotalTransaction") ,
      valTotalTransactionCurrency : this.getNodeValue(vouvher, "valTotalTransactionCurrency") ,
      valTransactionTime : this.getNodeValue(vouvher, "valTransactionTime") ,
      valUSD : this.getNodeValue(vouvher, "valUSD") ,
      valMiddleNameReceiver : this.getNodeValue(vouvher, "valMiddleNameReceiver") ,
      valMiddleLastNameReceiver : this.getNodeValue(vouvher, "valMiddleLastNameReceiver") ,
      valMiddleNameDeclarant : this.getNodeValue(vouvher, "valMiddleNameDeclarant") ,
      valMiddleLastNameDeclarant : this.getNodeValue(vouvher, "valMiddleLastNameDeclarant") ,
      fingerprintImage : this.getNodeValue(vouvher, "fingerprintImage") ,
      salesRate : this.getNodeValue(vouvher, "salesRate") ,
      voucherSize : '1', //this.getNodeValue(vouvher, "valPay") ,
      reprintNumber : '1', //this.getNodeValue(vouvher, "valPay") ,
      printerName :"THEA",//this.getNodeValue(vouvher, "valPay") ,
      isReprint : 'false', //this.getNodeValue(vouvher, "isReprint") ,
    };
  }

  dtoToXML(dto: VoucherRequest): string {
    throw new Error('Method not implemented.');
  }
}
