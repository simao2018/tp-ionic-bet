import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [DialogComponent],
    providers: [DialogService],
})

export class DialogModule { }