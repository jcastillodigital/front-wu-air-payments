import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentMainComponent } from "./modules/payment/components/payment-main/payment-main.component";
import { DeactivateGuard } from "./guards/DeactivateGuard";

const routes: Routes = [
    {
        path: "",
        component: PaymentMainComponent,
        canDeactivate: [DeactivateGuard],
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: ""
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {

}