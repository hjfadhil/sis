import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CollegeadminComponent } from './components/collegeadmin/collegeadmin.component';
import { Collegeadmin2Component } from './components/collegeadmin2/collegeadmin2.component';
import { Collegeadmin3Component } from './components/collegeadmin3/collegeadmin3.component';
import { CollegesemesterComponent } from './components/collegesemester/collegesemester.component';
import { CollegestudentsComponent } from './components/collegestudents/collegestudents.component';
import { CollegeyearComponent } from './components/collegeyear/collegeyear.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/departmentadmin/department/department.component';
import { DepartmentadminComponent } from './components/departmentadmin/departmentadmin.component';
import { DprtnavComponent } from './components/departmentadmin/dprtnav/dprtnav.component';
import { DprtstudentsComponent } from './components/departmentadmin/dprtstudents/dprtstudents.component';
import { ExportstudentsComponent } from './components/departmentadmin/exportstudents/exportstudents.component';
import { ImportstudentsComponent } from './components/departmentadmin/importstudents/importstudents.component';
import { NewstudentComponent } from './components/departmentadmin/newstudent/newstudent.component';
import { StudentsidsComponent } from './components/departmentadmin/studentsids/studentsids.component';
import { StudentslistComponent } from './components/departmentadmin/studentslist/studentslist.component';
import { StudentsnavComponent } from './components/departmentadmin/studentsnav/studentsnav.component';
import { HomeComponent } from './components/home/home.component';
import { IdentitiesComponent } from './components/identities/identities.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { Main2Component } from './components/main2/main2.component';
import { Main3Component } from './components/main3/main3.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { SelstudentComponent } from './components/selstudent/selstudent.component';
import { Selstudent10Component } from './components/selstudent10/selstudent10.component';
import { Selstudent2Component } from './components/selstudent2/selstudent2.component';
import { Selstudent3Component } from './components/selstudent3/selstudent3.component';
import { Selstudent4Component } from './components/selstudent4/selstudent4.component';
import { Selstudent5Component } from './components/selstudent5/selstudent5.component';
import { Selstudent6Component } from './components/selstudent6/selstudent6.component';
import { Selstudent7Component } from './components/selstudent7/selstudent7.component';
import { Selstudent8Component } from './components/selstudent8/selstudent8.component';
import { Selstudent9Component } from './components/selstudent9/selstudent9.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
// import { StudentsregComponent } from './components/studentsreg/studentsreg.component';
// import { WaitingComponent } from './components/waiting/waiting.component';

const routes: Routes = [
   {path: '', component: MainComponent},
   {path: 'main', component: MainComponent},
   {path: 'main2', component: Main2Component},
   {path: 'login', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  // {path: 'dashboard', component: DashboardComponent},
   {path: 'collegeadmin', component: CollegeadminComponent, children: [
    {path: '', outlet: 'col', component: Collegeadmin3Component},
    {path: 'newstudent', outlet: 'col', component: NewstudentComponent},
    {path: 'importstudents', outlet: 'col', component: ImportstudentsComponent},
    {path: 'studentslist', outlet: 'col', component: StudentslistComponent},
    {path: 'exportstudents', outlet: 'col', component: ExportstudentsComponent},
    {path: 'studentsids', outlet: 'col', component: StudentsidsComponent},
    {path: 'semesters', outlet: 'col', component: CollegesemesterComponent},
    {path: 'years', outlet: 'col', component: CollegeyearComponent},
    {path: 'selstudent', outlet: 'col', component: SelstudentComponent},
    {path: 'selstudent2', outlet: 'col', component: Selstudent2Component},
    {path: 'selstudent3', outlet: 'col', component: Selstudent3Component},
    {path: 'selstudent4', outlet: 'col', component: Selstudent4Component},
    {path: 'selstudent5', outlet: 'col', component: Selstudent5Component},
    {path: 'selstudent6', outlet: 'col', component: Selstudent6Component},
    {path: 'selstudent7', outlet: 'col', component: Selstudent7Component},
    {path: 'selstudent8', outlet: 'col', component: Selstudent8Component},
    {path: 'selstudent9', outlet: 'col', component: Selstudent9Component},
    {path: 'selstudent10', outlet: 'col', component: Selstudent10Component},
    {path: 'pictures', outlet: 'col', component: PicturesComponent},
    {path: 'statistics', outlet: 'col', component: StatisticsComponent},
    {path: 'identities', outlet: 'col', component: IdentitiesComponent},
    {path: 'departmentadmin', outlet: 'col', component: DepartmentComponent},
    {path: 'setting', outlet: 'col', component: SettingsComponent},
    { path: '**', component: PageNotFoundComponent },
  ]},
  // {path: 'waiting', component: WaitingComponent, children: [
  // ]},
  // {path: 'collegeadmin2', outlet:'cadmin', component: Collegeadmin2Component, children: [
  //   {path: 'studentslist', outlet:'coladmin', component: StudentslistComponent},
  // ]},
  // {path: 'departmentadmin', component: DprtnavComponent},
  // {path: 'newstudent', component: NewstudentComponent},
  // {path: 'studentreg', component: StudentsregComponent},
  
  // {path: 'collegestudents', component: CollegestudentsComponent},
  // {path: 'dprtstudents', component: StudentsnavComponent, children: [
  //   {path: 'importstudents', outlet:'students', component: ImportstudentsComponent},
  //   {path: 'studentslist', outlet:'students', component: StudentslistComponent},
  //   {path: 'exportstudents', outlet:'students', component: ExportstudentsComponent},
  //   {path: 'studentsids', outlet:'students', component: StudentsidsComponent},
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
