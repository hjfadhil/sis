import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-importstudents',
  templateUrl: './importstudents.component.html',
  styleUrls: ['./importstudents.component.css']
})
export class ImportstudentsComponent implements OnInit {

  department: any
  academicyear: any
  filename: any

  constructor(private dprtS: DprtService,
    private authS: AuthService,
    private router: Router,) {
      if(!this.authS.user){
        this.router.navigate(['/collegeadmin'])
      }
  }

  ngOnInit(){
    if(this.dprtS.department){
      this.department = this.dprtS.department
      this.academicyear = this.department.sisay
    }
  }

  openfile(){
    let inpf = document.getElementById('inpf')?.click();
  }
  ifc(event:any){
    let sf = event.target.files[0]
    console.log(sf);
    this.filename = sf.name
  }
}