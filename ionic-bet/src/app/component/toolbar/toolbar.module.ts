import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ToolbarComponent } from "./toolbar.component";

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        IonicModule,
        RouterModule,
    ],
    exports: [ToolbarComponent]
})

export class ToolbarModule { }