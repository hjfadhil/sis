import { Component, OnInit } from '@angular/core';
import { DprtService } from 'src/app/services/dprt.service';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { acch, deg, gender, yesno, trial, AcademicYears, Studies, Governates } from 'src/app/arrays';
import { Academic } from 'src/app/interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selstudent',
  templateUrl: './selstudent.component.html',
  styleUrls: ['./selstudent.component.css']
})


export class SelstudentComponent implements OnInit {

  student: any
  db = firebase.firestore()
  dpertmentid: any
  acch = acch
  deg = deg
  gender = gender
  yesno = yesno
  trial = trial
  storage = firebase.storage()
  spin = true
  firstVisible: any
  title: any
  elementType: any
  value: any
  bcvalue = '12345'
  bcwidth = 2
  bcheight = 40
  departments: firebase.firestore.DocumentData[]
  seldprt: any
  dprtchange = 0
  academicyears = AcademicYears
  studies = Studies
  governates = Governates
  decreament = firebase.firestore.FieldValue.increment(+1);
  universityRef: string = ""
  college: Academic = {}
  rbd = true

  constructor(private dprtS: DprtService,
              private authS: AuthService,
              private router: Router,
              private location: Location,
    ) { 
      if(!this.authS.user){
        this.router.navigate(['/main'])
      }
      this.college = this.dprtS.college;
      if(this.dprtS.department){
        this.universityRef = this.dprtS.department.ref;
      }
      this.dpertmentid = this.authS.user.displayName
      this.departments = this.dprtS.getDepartments()
    if(!this.dprtS.selstudent2){
      this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.dprtS.selstudent.id).get().then(sn => {
        this.getStudentData(sn)
        this.dprtS.selstudent2 = this.student
        this.title = 'app';
        this.elementType = 'url';
        // let value = 'الاسم: ' + this.student.fullname + '\n\r المواليد: ' + this.student.bd + '\n\r العنوان: ' + this.student.address
        // + '\n\r سنة القبول: ' + this.student.ay + '\n\r فصيلة الدم: ' + this.student.bc + '\n\r الديانة: ' + this.student.cit
        // + '\n\r البريد الالكتروني: ' + this.student.email + '\n\r الهاتف: ' + this.student.phone + '\n\r الدراسة: ' + this.student.study
        // + '\n\r قناة القبول: ' + this.student.accha?.name + '\n\r تسلسل القبول: ' + this.student.accnum + '\n\r سنة القبول: ' + this.student.ay
        // + '\n\r الرقم الامتحاني: ' + this.student.examnum; 
        // this.value = value;
        this.bcvalue = this.student.univnum;
      })
    }else{
      this.student = this.dprtS.selstudent2
      this.seldprt = this.student.d
      this.spin = false
    }
  }

  ngOnInit(): void {
  }

  back(){
    this.location.back()
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

  pictures(){
    this.router.navigate(['collegeadmin', {outlets: {'col':['pictures']}}])
  }

  approved(){
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.dprtS.selstudent.id)
    .update({approved: true}).then(() => {
      this.student.approved = true;
    }).catch(err => {
      console.log(err);
    })
  }

  getphoto(param:any){
    if(this.student[param]){
      let photopath = 'lms/studentsw/'+this.dpertmentid+'/'+this.student.id+'/'+param;
      let ref = this.storage.ref(photopath)
      ref.getDownloadURL().then(url => {
        let p = param + 'url';
        this.student[p] = url
      })
    }
  }

  next(){
    this.spin = true
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).get().then(ds => {
      if(ds.exists){
        this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').orderBy('rd').startAfter(ds).limit(1)
        .get().then(sns => {
          sns.forEach(sn => {
            this.spin = false
            this.getStudentData(sn)
            this.firstVisible = sn
          })        
        })
      }else{
        this.spin = false
      }
    })
  }
  prev(){
    this.spin = true
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').orderBy('rd').endBefore(this.firstVisible).limitToLast(1)
    .get().then(sns => {
      sns.forEach(sn => {
        this.spin = false
        this.getStudentData(sn)
        this.firstVisible = sn
      })
      this.spin = false
    })  
    // this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).get().then(ds => {
    //   if(ds.exists){
    //     this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').orderBy('rd').endBefore(ds).limit(1)
    //     .get().then(sns => {
    //       sns.forEach(sn => {
    //         this.spin = false
    //         this.getStudentData(sn)
    //       })        
    //     })
    //   }else{
    //     this.spin = false
    //   }
    // })
  }

  getStudentData(sn:any){
    if(sn){
      this.student = sn.data()
      this.student.id = sn.id
      this.student.accha = this.acch.find(a => a.id == this.student.acch)
      this.student.fdega = this.deg.find(d => d.id == this.student.fdeg)
      this.student.gena = this.gender.find(g => g.id == this.student.gen)
      this.student.mdega = this.deg.find(d => d.id == this.student.mdeg)
      this.student.trya = this.trial.find(t => t.id == this.student.try)
      this.student.teachsuna = yesno.find(y => y.id == this.student.teachsun)
      // this.getphoto('ph')
      // this.getphoto('js1')
      // this.getphoto('js2')
      // this.getphoto('sj1')
      // this.getphoto('bm1')
      // this.getphoto('bm2')
      // this.getphoto('bw1')
      // this.getphoto('bw2')
      this.seldprt = this.student.d
      this.spin = false
    }else{
      alert('حدث خطأ في التحميل')
    }
      
  }

  setstudentdepartment(dprt:any){
    if(this.student.dprtnum){
      if(this.student.dprtnum.length == 4){
        let ay:string = this.dprtS.department.sisay.ay
        let ay2 = ay.substring(2,4)
        let stdstd = "2"
        if(this.student.study == 'صباحي'){
          stdstd = "1"
        }
        let acdprt = this.college.departments?.find(d => d.id == dprt.value)
        this.student.dprtnum = this.student.dprtnum
        let univnum = ay2+this.college.code+acdprt?.code+stdstd+this.student.dprtnum
        this.student.univnum = univnum
        this.dprtchange = 1
        this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update({d: dprt.value, univnum: univnum, dprtnum: this.student.dprtnum}).then(() => {
          this.dprtchange = 2
        }).catch(err => {
          alert(err)
        })
      }else{
        alert('يجب ان يكون طول تسلسل الطالب في القسم 4 مراتب')
      }
    }else{
      alert('ادخل تسلسل الطالب في القسم اولا')
    }   
  }

  update(){
    let std = {
      fullname: this.student.fullname || '',
      efullname: this.student.efullname || '',
      study: this.student.study || '',
      gaddress: this.student.gaddress || '',
      address: this.student.address || '',
      phone: this.student.phone || '',
      bc: this.student.bc || '',
      gen: this.student.gen || '',
      cit: this.student.cit || '',
      nat: this.student.nat || '',
      bd: this.student.bd || '',
    }
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update(std).then(() => {
      alert('تم التحديث بنجاح')
      this.dprtS.selstudent2.fullname = this.student.fullname
      this.dprtS.selstudent2.efullname = this.student.efullname
      this.dprtS.selstudent2.study = this.student.study
      this.dprtS.selstudent2.gaddress = this.student.gaddress
      this.dprtS.selstudent2.address = this.student.address
      this.dprtS.selstudent2.phone = this.student.phone
      this.dprtS.selstudent2.bc = this.student.bc
      this.dprtS.selstudent2.gen = this.student.gen
      this.dprtS.selstudent2.cit = this.student.cit
      this.dprtS.selstudent2.nat = this.student.nat
      this.dprtS.selstudent2.bd = this.student.bd
    }).catch(err => {
      console.log(err);
    })
  }

  unrefresh(){
    let dprt = document.getElementById('dprt')
    this.setstudentdepartment(dprt)
  }

  unc(){
    this.rbd = false
  }

}
