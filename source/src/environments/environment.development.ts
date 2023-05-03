export const environment = {     
    production: false,
    ROOT : {
        URL: 'https://172.16.16.37:8443/menu-app/#/menu/main'
    },
    JWT :{
        URL: 'https://172.16.16.37:8443/AuthCorresponsales/auth/token/web'
    },
    VOUCHER: {
        URL: 'https://172.16.16.37:8443/pagosEnvios-1.0.0/printer/printVoucher'
    },
    CB :{
        URL: 'https://172.16.16.37:8443/pagosEnvios-1.0.0/soapServices/CBService',
        DOMAINS : {
            DOCUMENT_TYPE: 'TiposDocumento',
            GENDER_TYPE: 'Sexo',
            COUNTRIES: 'Paises',
            DEPARTMENTS: 'Departamentos',
            CITIES: 'Ciudades',
            INDICATIVES: 'IndicativoPaises', 
            ADDRESS_TYPE: 'Direcciones', 
            ZONE: 'SectorCiudad', 
            OCUPATION: 'OcupacionesGyf', 
            POSITION_TYPE: 'CargoUNI01', 
            ECONOMIC_ACTIVITY: 'ActividadEconomica', 
            INCOME_RANGE: 'IngresosUNI010',
            EXPENSE_RANGE: 'EgresosUNI01',
            ACTIVE_RANGE: 'ActivosUNI01',
            PASSIVE_RANGE: 'PasivosUNI01',
            DETAIL_OTHER_INCOME: 'DetalleActividadIndependienteTC',
            TRANSACTIONAL_MOTIVE: 'MotivoTransaccionUNI01',
            TRANSACTIONAL_RELATIONSHIP: 'ParentescoUNI01',
            TYPE_OPERATION: 'TipoTransaccion',
            ROI: 'ROIEnvio'
        }
    },
    PAYMENT :{
        FIND:{
            URL: 'https://172.16.16.37:8443/pagosEnvios-1.0.0/soapServices/MoneyTransferPay'
        }
    }
}