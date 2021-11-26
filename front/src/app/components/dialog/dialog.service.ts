import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";

export type DialogType = 'warning' | 'error' | 'info';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(
        public dialog: MatDialog,
    ) {

    }

    public showDialog(content: string, dialogType: DialogType): void {

        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: { content: content, dialogType: dialogType }
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log('close success');
        });

    }
}