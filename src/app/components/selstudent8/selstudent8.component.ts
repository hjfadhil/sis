import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-selstudent8',
  templateUrl: './selstudent8.component.html',
  styleUrls: ['./selstudent8.component.css']
})
export class Selstudent8Component implements OnInit {

  db = firebase.firestore()
  storage = firebase.storage();
  studentid:any
  collegeid:any
  prog:any
  url:any
  sj:any
  sd:any
  sa:any
  dpertmentid
  student

  constructor(private dprtS: DprtService) {
    this.dpertmentid = this.dprtS.departmentid
    this.collegeid = this.dprtS.department.ref;
    this.studentid = this.dprtS.selstudent2.id
    this.student = this.dprtS.selstudent2 
    this.sj = this.student.sj
    this.sd = this.student.sd
    this.sa = this.student.sa
    const filepath = 'lms/studentsw/'+this.dpertmentid+'/'+this.studentid+'/sj1';
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
      const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/sj1';
      const fileRef = this.storage.ref(filepath)
      const task = fileRef.put(file)
      task.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var progressp = progress.toString()+"%";
        if(this.prog){
          let pbb = document.getElementById('pb')
          if(pbb){
            pbb.style.width =  progressp
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
        let std = {sj1: true}
        db.collection('academics').doc(collegeid).collection('lmsstudents').doc(studentid).update(std).then(() => {
          alert('تم رفع الصورة بنجاح')
        })
      });
    }else{
      alert('لايوجد ملف لتحميله')
    }
  }

  updatevalues(){
    let std = {
      sj: this.sj,
      sd: this.sd,
      sa: this.sa
    }
    this.db.collection('academics').doc(this.collegeid).collection('lmsstudents').doc(this.studentid).update(std).then(() => {
      alert('تم تحديث البيانات')
    })
  }

}
