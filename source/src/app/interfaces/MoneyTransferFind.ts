export interface MoneyTransferPayFind {
    mtcn:string, 
    isNewReceiver: boolean,
    documentType:string, 
    documentNumber:string, 
    documentExpedition?:Date, 
    //----------------------------
    valPay:string, 
    valGMF:string, 
    valueAfterTax:string, 
    valRateExchange:string, 
    valUSD:string, 
    valBroker:string, 
    cashValueCOP:string, 
    cashValueUSD:string, 
    //----------------------------
    codDestinationCurrency:string, 
    codOriginatingCurrency:string, 
    dateFiling:string, 
    descPayStatus:string, 
    expectedPayoutLocationCity:string, 
    expectedPayoutLocationStateCode:string, 
    idMTCN:string, 
    idMoneyTransferKey:string, 
    timeFiling:string,
    valCharges:string,
    valDestinationCountry:string,
    valExpectedActualPayout:string,
    valForeignSystemReferenceNo:string,
    valGross:string,
    valNewMTCN:string,
    valOriginalDestinationCurrency:string,
    valOriginatingCityLocale:string,
    valOriginatingCountry:string,
    valPrincipal:string,
    trxValRateExchange:string,
    //----------------------------
    receiverValCountry :string, 
    receiverValFirstName :string, 
    receiverValLastName :string, 
    receiverValNameType :string, 
    //----------------------------
    senderValAddress :string, 
    senderValCity :string,
    senderValCountry :string, 
    senderValCurrentLocationZIP :string, 
    senderValFirstName :string, 
    senderValLastName :string, 
    senderValPhone :string, 
    senderValState :string, 
    senderValNameType :string,
    //----------------------------
    customerIdIssueDate?: string,
    customerValFirstName?: string, 
    customerValMiddleName?: string, 
    customerValLastName?: string, 
    customerValMiddleLastName?: string, 
    customerValNationality?: string,
    customerValBirthPlace?: string,
    customerDateOfBirth?: string, 
    customerValGender?: string,
    //----------------------------
    customerValCountry?: string,

    customerValResidencialCountryCode?: string,
    customerValMobile?:string,
    customerPhoneCountryCode?:string,
    customerValPhone?:string,
    customerValAddress?:string,
    customerEmail?:string,

    //----------------------------
    customerValOccupation?:string,
    customerValJob?:string,
    customerValCompanyName?:string,
    customerValCompanyCountry?:string,

    customerValCompanyCountryCode?:string,
    customerValCompanyPhone?:string,
    customerValCompanyAddress?:string,

    //----------------------------
    customerCodEconomicActivity?:string,
    customerValIncome?:string,
    customerValOtherIncome?:string,
    customerValOtherIncomeDescription?:string,
    customerValExpenses?:string,
    customerValAssets?:string,
    customerValPassive?:string,

    //----------------------------
    customerCodDestinationOfFundsEconomic?:string,
    customerValRelationshipReceiver?:string,
    customerCodROI?:string,
    customerDescROI?:string,

    //----------------------------

    customerCountry?: string, 
    customerCity?: string,
    
}