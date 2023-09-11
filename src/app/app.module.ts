import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './module/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SreachComponent } from './module/sreach/sreach.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormComponent } from './module/form/form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SreachComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSpaceModule,
    NzUploadModule,
    NzDropDownModule,
    NzModalModule,
    NzGridModule,
    NzEmptyModule,
    NzAlertModule,
    NzNotificationModule,
    NzMessageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
