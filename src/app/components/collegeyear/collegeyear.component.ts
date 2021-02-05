import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';
import { AcademicYears } from '../../arrays';
import firebase from 'firebase/app';

@Component({
  selector: 'app-collegeyear',
  templateUrl: './collegeyear.component.html',
  styleUrls: ['./collegeyear.component.css']
})
export class CollegeyearComponent implements OnInit {

  department: any
  academicyear: any
  academicyears = AcademicYears
  reg: any
  upd: any
  db = firebase.firestore();

  constructor(private dprtS: DprtService,
              private authS: AuthService,
              private router: Router,
    ) { 
      // if(!this.authS.user){
      //   this.router.navigate(['/collegeadmin'])
      // }
    }
    
    ngOnInit(): void {
      if(this.dprtS.department){
        this.department = this.dprtS.department
        console.log(this.department);
        
        this.academicyear = this.department.sisay
        this.reg = this.department.reg
        this.upd = this.department.scu
        this.db.collection('academics').doc(this.dprtS.department.id).get().then(sn => {
          this.reg = sn.get('reg')
          this.upd = sn.get('scu')
        })
    }
  }

  setay(ay:string){
    let c = false;
    if(ay){
      c = confirm('سيتم تغيير العام الدراسي الحالي للكلية هل انت متأكد')
      if(c){
        console.log(ay);
        this.dprtS.setdprtacademicyear(ay)
      }
    }
    
  }

  regf(){
    if(this.reg === undefined){
      this.reg = false;
    }
    this.dprtS.stdreg(this.reg)
  }

  updf(){
    if(this.upd === undefined){
      this.upd = false;
    }
    this.dprtS.stdupd(this.upd)
  }

}
