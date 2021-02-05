import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { DprtService } from './dprt.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  db = firebase.firestore()
  storage = firebase.storage()
  collegeid = ""
  college:any
  useruid: any

  constructor(private dprtS: DprtService,
              private http: HttpClient,
    ) { 
    this.dprtS.auth.onAuthStateChanged(user => {
      if(user) {
        this.useruid = user.uid
        this.collegeid = this.dprtS.departmentid2
        if(this.collegeid){
          this.getCollege()
        }
      }
    })
  }

  uploadlogo(logo:File){
    const path = 'lms/universitieslogos/'
    return this.storage.ref(path).put(logo).then(sn => {
      return sn.ref.getDownloadURL().then(url => {
        this.db.collection('academics').doc(this.collegeid).update({logourl: url})
        .then(() => {
          alert('تمت عملية التحديث بنجاح')
        })
        return url
      })
    })
  }

  updateColor(color:string){
    return this.db.collection('academics').doc(this.collegeid).update({color: color})
  }

  updateshdprtname(bool: boolean){
    return this.db.collection('academics').doc(this.collegeid).update({shdprtname: bool})
  }

  getCollege(){
    this.db.collection('academics').doc(this.collegeid).get().then(sn => {
      return sn.data()
    }).then(col => {
      this.college = col
    })
  }
}
