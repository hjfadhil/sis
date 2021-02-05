import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-selstudent6',
  templateUrl: './selstudent6.component.html',
  styleUrls: ['./selstudent6.component.css']
})
export class Selstudent6Component implements OnInit {

  db = firebase.firestore()
  storage = firebase.storage();
  studentid: string = ""
  collegeid: string = ""
  prog = false
  url = ""
  ph: any
  dpertmentid: any

  constructor(private dprtS: DprtService) { 
    this.dpertmentid = this.dprtS.departmentid
    this.collegeid = this.dprtS.department.ref;
    this.studentid = this.dprtS.selstudent2.id
    const filepath = 'lms/studentsw/'+this.dpertmentid+'/'+this.studentid+'/ph';
    this.storage.ref(filepath).getDownloadURL().then(url => {
      this.url = url 
    }).catch(err => {
      this.url = " "
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

  browse(){
    let js1 = document.getElementById('js1')
    if(js1){
      js1.click()
    }
  }

  filec(event:any){
    let file = event.target.files[0]
    let db = this.db
    let studentid = this.studentid
    let collegeid = this.dpertmentid
    this.prog = true
    if(file){
      const filepath = 'lms/studentsw/'+this.dpertmentid+'/'+this.studentid+'/ph';
      const fileRef = this.storage.ref(filepath)
      const task = fileRef.put(file)
      task.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var progressp = progress.toString()+"%";
        if(this.prog){
          let pbd = document.getElementById('pb')
          if(pbd){
            pbd.style.width =  progressp
          }
        }
        //document.getElementById('pb').setAttribute('aria-valuenow', progress.toString())
        if(progress == 100){
          snapshot.ref.getDownloadURL().then(url => {
            this.url = url
          })
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
          case firebase.storage.TaskState.SUCCESS:
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let std = {ph: true}
        db.collection('academics').doc(collegeid).collection('lmsstudents').doc(studentid).update(std).then(() => {
          alert('تم رفع الصورة بنجاح')
        })
      });
    }else{
      alert('لايوجد ملف لتحميله')
    }
  }

  back(){

  }

}
