import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DialogModule } from "../../components/dialog/dialog.module";




const Routes = [{
    path: '',
    component: LoginComponent
}]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(Routes),
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        // HttpClientModule,
        DialogModule,
    ],
    exports: [RouterModule]
})

export class LoginModule { }