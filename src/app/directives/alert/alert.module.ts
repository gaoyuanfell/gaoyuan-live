import {NgModule} from "@angular/core";
import {AlertDirective, AlertWindow} from "./alert.service";

@NgModule({
    declarations:[AlertDirective,AlertWindow],
    exports:[AlertDirective],
    entryComponents:[AlertWindow]
})
export class AlertModule{

}
