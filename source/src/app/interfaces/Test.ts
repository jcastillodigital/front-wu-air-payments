export interface Test {
    
        id: number;
        rent_date?: string;
        limit_date?: string;
        return_date?: string;
        cli_id?: number;
        cop_id?: number;
        copy_format?: string;
        copy_status?: string;
        fil_id?: number;
        film_title?: string;
        client_name?: string;
        client_lastname?: string;
        client_dni?: number;
        isPending?: boolean;
        isExpired?: boolean;
    }
