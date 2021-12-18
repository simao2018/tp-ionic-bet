import { NgModule } from "@angular/core";
import { IonicModule, IonTabs } from "@ionic/angular";
import { AppService } from "../../../global/app.service";
import { TabComponent } from "./tabs.component";

@NgModule({
    declarations: [TabComponent],
    imports: [
        IonicModule,
    ],
    exports: [TabComponent],
    providers: [AppService],
})
export class TabModule {

}