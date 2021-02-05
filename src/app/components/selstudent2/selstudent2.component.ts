import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DprtService, STD } from 'src/app/services/dprt.service';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { acch, deg, gender, yesno, trial, AcademicYears, Studies, Governates } from 'src/app/arrays';

@Component({
  selector: 'app-selstudent2',
  templateUrl: './selstudent2.component.html',
  styleUrls: ['./selstudent2.component.css']
})
export class Selstudent2Component implements OnInit {

  student: any
  db = firebase.firestore()
  dpertmentid
  universityRef: string = ""
  decreament = firebase.firestore.FieldValue.increment(+1)
  departments: firebase.firestore.DocumentData[]
  deg = deg

  constructor(private dprtS: DprtService,
              private router: Router,
              private authS: AuthService,
    ) { 
    this.student = this.dprtS.selstudent2
    this.dpertmentid = this.authS.user.displayName
    this.universityRef = this.dprtS.department.ref;
    this.departments = this.dprtS.departments
  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/collegeadmin', {outlets:{'col':['studentslist']}}])
  }

  delete(){
    let c = confirm('هل انت متأكد من الحذف')
    if(c){
      this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.dprtS.selstudent.id).delete()
      .then(res => {
        alert('تم حذف الملف')
        //let fe = this.dprtS.students.find(s => s.id == this.dprtS.selstudent.id)
        let ffe = this.dprtS.students.findIndex(s => s.id == this.dprtS.selstudent.id)
        this.dprtS.students.splice(ffe, 1)
        this.db.collection('academics').doc(this.dpertmentid).update({rstds:this.decreament})
        this.db.collection('academics').doc(this.universityRef).update({ureg:this.decreament})
        this.router.navigate(['collegeadmin', {outlets: {'col':['studentslist']}}])
      })
    }
  }

  update(){
    let std = {
      ffullname: this.student.ffullname || '',
      fathrel: this.student.fathrel || '',
      fphone: this.student.fphone || '',
      fdeg: this.student.fdeg || '',
      fwork: this.student.fwork || '',
      fathaddr: this.student.fathaddr || '',
      famnum: this.student.famnum || '',
      famser: this.student.famser || '',
      mfullname: this.student.mfullname || '',
      mdeg: this.student.mdeg || '',
    }
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update(std).then(() => {
      alert('تم التحديث بنجاح')
      this.dprtS.selstudent2.ffullname = this.student.ffullname
      this.dprtS.selstudent2.fathrel = this.student.fathrel
      this.dprtS.selstudent2.fphone = this.student.fphone
      this.dprtS.selstudent2.fdeg = this.student.fdeg
      this.dprtS.selstudent2.fwork = this.student.fwork
      this.dprtS.selstudent2.fathaddr = this.student.fathaddr
      this.dprtS.selstudent2.famnum = this.student.famnum
      this.dprtS.selstudent2.famser = this.student.famser
      this.dprtS.selstudent2.mfullname = this.student.mfullname
      this.dprtS.selstudent2.mdeg = this.student.mdeg
    }).catch(err => {
      console.log(err);
    })
  }

}
