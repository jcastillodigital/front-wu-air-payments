import { Paginator } from "./Paginator";

export interface RequestServerResponse<T>{
    message:string;
    data:T, 
    status?:number;
    count?:number;
    paginator?: Paginator;
}