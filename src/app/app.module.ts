import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'

import firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DprtstudentsComponent } from './components/dprtstudents/dprtstudents.component';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DprtnavComponent } from './components/departmentadmin/dprtnav/dprtnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NewstudentComponent } from './components/departmentadmin/newstudent/newstudent.component';
import { ImportstudentsComponent } from './components/departmentadmin/importstudents/importstudents.component';
import { StudentslistComponent } from './components/departmentadmin/studentslist/studentslist.component';
import { ExportstudentsComponent } from './components/departmentadmin/exportstudents/exportstudents.component';
import { StudentsidsComponent } from './components/departmentadmin/studentsids/studentsids.component';
import { StudentsnavComponent } from './components/departmentadmin/studentsnav/studentsnav.component';
import { CollegeadminComponent } from './components/collegeadmin/collegeadmin.component';
import { CollegestudentsComponent } from './components/collegestudents/collegestudents.component';
import { CollegesemesterComponent } from './components/collegesemester/collegesemester.component';
import { CollegeyearComponent } from './components/collegeyear/collegeyear.component';
import { StudentsregComponent } from './components/studentsreg/studentsreg.component';
import { SelstudentComponent } from './components/selstudent/selstudent.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { Collegeadmin2Component } from './components/collegeadmin2/collegeadmin2.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { Main2Component } from './components/main2/main2.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ExportAsModule } from 'ngx-export-as';
import { IdentitiesComponent } from './components/identities/identities.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Selstudent2Component } from './components/selstudent2/selstudent2.component';
import { Selstudent3Component } from './components/selstudent3/selstudent3.component';
import { Selstudent4Component } from './components/selstudent4/selstudent4.component';
import { Selstudent5Component } from './components/selstudent5/selstudent5.component';
import { Selstudent6Component } from './components/selstudent6/selstudent6.component';
import { Selstudent7Component } from './components/selstudent7/selstudent7.component';
import { Selstudent8Component } from './components/selstudent8/selstudent8.component';
import { Selstudent9Component } from './components/selstudent9/selstudent9.component';
import { Selstudent10Component } from './components/selstudent10/selstudent10.component';
import { DepartmentComponent } from './components/departmentadmin/department/department.component';
import { Collegeadmin3Component } from './components/collegeadmin3/collegeadmin3.component';
import { Main3Component } from './components/main3/main3.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ColorPickerModule } from 'ngx-color-picker';


firebase.initializeApp(environment.firebaseConfig)
firebase.firestore().enablePersistence();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    DprtstudentsComponent,
    DprtnavComponent,
    NewstudentComponent,
    ImportstudentsComponent,
    StudentslistComponent,
    ExportstudentsComponent,
    StudentsidsComponent,
    StudentsnavComponent,
    CollegeadminComponent,
    CollegestudentsComponent,
    CollegesemesterComponent,
    CollegeyearComponent,
    StudentsregComponent,
    SelstudentComponent,
    PicturesComponent,
    Collegeadmin2Component,
    WaitingComponent,
    DashboardComponent,
    NavComponent,
    Main2Component,
    StatisticsComponent,
    IdentitiesComponent,
    Selstudent2Component,
    Selstudent3Component,
    Selstudent4Component,
    Selstudent5Component,
    Selstudent6Component,
    Selstudent7Component,
    Selstudent8Component,
    Selstudent9Component,
    Selstudent10Component,
    DepartmentComponent,
    Collegeadmin3Component,
    Main3Component,
    PageNotFoundComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    InMemoryWebApiModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgxQRCodeModule,
    NgxBarcodeModule,
    ExportAsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    HttpClientModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
