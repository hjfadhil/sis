import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Academic, Department } from '../interfaces';

export interface STD  {
  id: string,
  name: string,
  rd: number,
  phone: string,
  email: string,
  purl: string
}

@Injectable({
  providedIn: 'root'
})
export class DprtService {

  db = firebase.firestore();
  auth = firebase.auth();
  departmentid: any = ""
  department: any
  selstudent: any
  selstudent2: any
  lastVisible: any
  students: STD[] = []
  estudents: STD[] = []
  departments: firebase.firestore.DocumentData[] =  []
  study = 'صباحي'
  students2: BehaviorSubject<any> = new BehaviorSubject(null)
  estudents2: BehaviorSubject<any> = new BehaviorSubject(null)
  stepper = 0
  departmentid2 = ""
  seldprt: Department = {}
  college: Academic = {}

  constructor() { 
    this.auth.onAuthStateChanged(user => {
      let department = user?.displayName+""
      this.departmentid2 = department
      // this.db.collection('academics').doc(department).collection('lmsstudents').where('study', '==', this.study).limit(20).get()
      // .then(sns => {
      //   this.students = []
      //   sns.forEach(sn => {
      //     let std = {
      //       id: sn.id,
      //       name: sn.get('fullname'),
      //       rd: sn.get('rd'),
      //       phone: sn.get('phone'),
      //       email: sn.get('email'),
      //       purl: sn.get('phurl')
      //     }
      //     this.students.push(std)
      //   })
      // }).then(() => {
      //   this.students2.next(this.students)
      // })
    })    
   
  }

  getestudents(){
    if(this.estudents.length == 0){
    this.db.collection('academics').doc(this.departmentid2).collection('lmsstudents').where('study', '==', 'مسائي').get()
      .then(sns => {
        this.estudents = []
        sns.forEach(sn => {
          let std = {
            id: sn.id,
            name: sn.get('fullname'),
            rd: sn.get('rd'),
            phone: sn.get('phone'),
            email: sn.get('email'),
            purl: sn.get('phurl'),
            d: sn.get('d')
          }
          this.estudents.push(std)
        })
      }).then(() => {
        this.estudents2.next(this.estudents)
      })
    }else{
      this.estudents2.next(this.estudents)
    }
  }
  getmstudents(){
    if(this.students.length == 0){
    this.db.collection('academics').doc(this.departmentid2).collection('lmsstudents').where('study', '==', 'صباحي').get()
      .then(sns => {
        this.students = []
        sns.forEach(sn => {
          let std = {
            id: sn.id,
            name: sn.get('fullname'),
            rd: sn.get('rd'),
            phone: sn.get('phone'),
            email: sn.get('email'),
            purl: sn.get('phurl'),
            d: sn.get('d')
          }
          this.students.push(std)
        })
      }).then(() => {
        this.students2.next(this.students)
      })
    }else{
      this.students2.next(this.students)
    }
  }

  getDepartment(){
    return this.department;
  }
  getDepartmentId(){
    return this.departmentid;
  }
  setDepartment(id:any){
    this.db.collection('academics').doc(id).get().then(sn => {
      this.department = sn.data()
    })
  }
  setdprtacademicyear(ay:string){
    let sisay = {
      ay: ay
    }
    this.db.collection('academics').doc(this.college.id).update({sisay: sisay}).then(() => {
      //window.location.reload();
    }).catch(err => {
      alert(err)
    })
  }
  getDepartments(){
    if(this.departments.length == 0){
      this.db.collection('academics').where('ref', '==', this.departmentid2).where('level', '==', 'MAOyd2uWobjkU52gQMjc')
      .get().then(sns => {
        sns.forEach(sn => {
          let dprt = {
            name: sn.get('name.ar'),
            id: sn.id,
          }
          this.departments.push(dprt)
        })
      })
    }
    return this.departments
  }
  stdreg(v: boolean){
    this.db.collection('academics').doc(this.department.id).update({reg:v})
  }
  stdupd(v:boolean){
    this.db.collection('academics').doc(this.department.id).update({scu:v})
  }
}
