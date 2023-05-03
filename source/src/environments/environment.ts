export const environment = {     
    production: false,
    ROOT : {
        URL: 'http://localhost:4200/?param1=param1&param2=CNB001'
    },
    JWT :{
        URL: '/mocks/air/auth/',
    },
    VOUCHER: {
        URL: '/mocks/air/printVoucher/',
    },
    CB :{
        URL: '/mocks/air/cbservice/',
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
            URL: '/mocks/air/MoneyTransferPay/'
        }
    }
}