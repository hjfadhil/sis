import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService, STD } from 'src/app/services/dprt.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {

  department: any
  academicyear: any
  db = firebase.firestore()
  students:any[] = []
  num:any
  lastVisible: any
  firstVisible: any
  stdsREf: any
  search: any
  examnum: any
  email:any
  phone:any
  auth = firebase.auth()
  selall = false
  selnum = 0
  prevnum = 0
  field = 'rd'
  pageSize = 20
  ftechnum = 0
  seldate: any
  decreament = firebase.firestore.FieldValue.increment(-1)
  universityRef: string = ""
  loading = false
  study = ""
  pages = 1
  npages = 1
  pagestepper = 0
  totalstudents = []
  loading2 = false

  constructor(private dprtS: DprtService,
    private authS: AuthService,
    private router: Router,) {
      // this.auth.onAuthStateChanged(user => {
      //   if(!this.dprtS.students){
      //     this.universityRef = this.dprtS.department?.ref
      //     this.study = this.dprtS.study
      //     this.db.collection('academics').doc(this.department).collection('lmsstudents').where('study', '==', this.study).orderBy('rd').limit(20)
      //     .get().then(sns => {
      //       this.students = []
      //       let num = sns.docs.length
      //       this.ftechnum = num
      //       this.lastVisible = sns.docs[num-1]
      //       this.dprtS.lastVisible = this.lastVisible
      //       sns.forEach(sn => {
      //         let std = {
      //           id: sn.id,
      //           name: sn.get('fullname'),
      //           rd: sn.get('rd'),
      //           purl: sn.get('phurl')
      //         }
      //         this.students.push(std)
      //         this.dprtS.students = this.students
      //       })
      //     })
      //   }else{
      //     this.students = this.dprtS.students
      //     this.ftechnum = this.students.length
      //   }
      // })
      this.pagestepper = this.dprtS.stepper
      this.reclassactive(this.pagestepper)
      this.dprtS.students2.subscribe(stds => {
        if(stds){
          this.department = this.dprtS.departmentid2
          this.totalstudents = stds
          this.totalstudents = this.totalstudents.sort((a:STD,b:STD) => {
            // if(a['name'] < b['name']){
            //   return -1
            // }
            // else if(a['name'] > b['name']){
            //   return 1
            // }else{
            //   return 0  
            // }
            return a.name.localeCompare(b.name) || this.rdCompare(a, b)
          })
          this.students = this.totalstudents.slice(0,20)
          this.num = this.totalstudents.length
          this.npages = Math.ceil(this.num/20)
          this.pages = (this.npages > 10)? 10 : this.npages
          this.loading = false
        }
      })
      this.dprtS.estudents2.subscribe(stds => {
        if(stds){
          this.department = this.dprtS.departmentid2
          this.totalstudents = stds
          this.totalstudents.sort((a:any,b:any) => {
            if(a['name'] < b['name']){
              return -1
            }
            else if(a['name'] > b['name']){
              return 1
            }else{
              return 0  
            }
          })
          this.students = this.totalstudents.slice(0,20)
          this.num = this.totalstudents.length
          this.npages = Math.ceil(this.num/20)
          this.pages = (this.npages > 10)? 10 : this.npages
          this.loading = false
        }
      })
  }

  ngOnInit(){
    if(this.dprtS.department){
      this.academicyear = this.dprtS.department.sisay
      this.num = this.totalstudents.length
      this.npages = Math.ceil(this.num/20)
      this.pages = (this.npages > 10)? 10 : this.npages
    }
  }

  selstd(std:any){
    //this.dprtS.selstudent2 = null
    this.dprtS.selstudent = std
    this.router.navigate(['/collegeadmin', {outlets:{'col':['selstudent']}}])
  }

  prev(){
    if(this.prevnum > 0){
    this.prevnum -= this.students.length
    this.ftechnum -= this.students.length
    this.db.collection('academics').doc(this.department).collection('lmsstudents').orderBy('rd').endBefore(this.firstVisible).limitToLast(20)
    .get().then(sns => {
      this.students = []
      let num = sns.docs.length
      this.lastVisible = sns.docs[num-1]
      this.firstVisible = sns.docs[0]
      this.dprtS.lastVisible = this.lastVisible
      sns.forEach(sn => {
        let std = {
          id: sn.id,
          name: sn.get('fullname'),
          rd: sn.get('rd'),
          purl: sn.get('phurl')
        }
        this.students.push(std)
        this.dprtS.students = this.students
      })
    })
    }
  }

  nextf(){
    this.prevnum += this.students.length
    this.ftechnum += this.students.length
    this.getStudents()
  }

  rtime(t:any){
    let d = new Date(t)
    let y = d.getFullYear()
    let m = d.getMonth()+1
    let day = d.getDate();
    let h = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();
    let date = day+'/'+m+'/'+y+' - '+h+':'+mm+":"+ss
    return date;
  }

  getStudents(){
    this.db.collection('academics').doc(this.department).collection('lmsstudents').orderBy('rd').startAfter(this.lastVisible || 0).limit(20)
    .get().then(sns => {
      this.students = []
      let num = sns.docs.length
      this.lastVisible = sns.docs[num-1]
      this.firstVisible = sns.docs[0]
      this.dprtS.lastVisible = this.lastVisible
      sns.forEach(sn => {
        let std = {
          id: sn.id,
          name: sn.get('fullname'),
          rd: sn.get('rd'),
          purl: sn.get('phurl')
        }
        this.students.push(std)
        this.dprtS.students = this.students
      })
    })
  }

  searchf(){
    // if(this.search){
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').where('fullname', '==', this.search).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
    // }else{
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').orderBy('rd').limit(20).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
    // }
    if(this.search){
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['name']
        let isn = sn.indexOf(this.search)
        let r = isn !== -1
        return r
      })
    }
  }

  searchf2(){
    if(this.examnum){
      // this.db.collection('academics').doc(this.department).collection('lmsstudents').where('examnum', '==', this.examnum).get()
      // .then(doc => {
      //   this.students = []
      //   doc.docs.forEach(sn => {
      //     let std = {
      //       id: sn.id,
      //       name: sn.get('fullname'),
      //       rd: sn.get('rd'),
      //       purl: sn.get('phurl')
      //     }
      //     this.students.push(std)
      //   })
      // })
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['examnum']
        let isn = sn.indexOf(this.examnum)
        let r = isn !== -1
        return r
      })
    }else{
      // this.db.collection('academics').doc(this.department).collection('lmsstudents').where('examnum', '==', "").get()
      // .then(doc => {
      //   this.students = []
      //   doc.docs.forEach(sn => {
      //     let std = {
      //       id: sn.id,
      //       name: sn.get('fullname'),
      //       rd: sn.get('rd'),
      //       purl: sn.get('phurl')
      //     }
      //     this.students.push(std)
      //   })
      // })
    }
  }

  searchf3(){
    if(this.email){
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').where('email', '==', this.email).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
    // }else{
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').orderBy('rd').limit(20).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['email']
        let isn = -1
        if(sn){
          isn = sn.indexOf(this.email)
        }
        let r = isn !== -1
        return r
      })
    }
  }

  searchf4(){
    console.log(this.phone);
    
    if(this.phone){
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').where('phone', '==', this.phone).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
    // }else{
    //   this.db.collection('academics').doc(this.department).collection('lmsstudents').orderBy('rd').limit(20).get()
    //   .then(doc => {
    //     this.students = []
    //     doc.docs.forEach(sn => {
    //       let std = {
    //         id: sn.id,
    //         name: sn.get('fullname'),
    //         rd: sn.get('rd'),
    //         purl: sn.get('phurl')
    //       }
    //       this.students.push(std)
    //     })
    //   })
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['phone']
        let isn = sn.indexOf(this.phone)
        let r = isn !== -1
        return r
      })
    }
  }

  filter1(std:any){
    // this.prevnum = 0
    // this.db.collection('academics').doc(this.department).collection('lmsstudents').where('fullname','==', std.name).get()
    // .then(sns => {
    //   this.students = []
    //   sns.forEach(sn => {
    //     let std:any = {
    //       id: sn.id,
    //       name: sn.get('fullname'),
    //       rd: sn.get('rd'),
    //       purl: sn.get('phurl')
    //     }
    //     this.db.collection('lmsusers').where('u', '==', sn.id).get().then(usns => {
    //       usns.forEach(usn => {
    //         if(usn.exists){
    //           std['uf'] = true
    //         }
    //       })
    //     })
    //     this.students.push(std)
    //     this.students.sort((s1, s2) => {
    //       if(s1.rd > s2.rd){
    //         return 1
    //       }else{
    //         return -1
    //       }
    //     })
    //   })
    // })
    this.students = this.totalstudents.filter(stdt => {
      let sn: string = stdt['name']
      let isn = sn.indexOf(std['name'])
      let r = isn !== -1
      return r
    })
  }

  deletesel(){
    let c = confirm('ستحذف جميع الاسماء المحددة, هل انت متأكد؟')
    if(c){
    let cbs = document.querySelectorAll('.cbdelete:checked')
    this.selall = false    
    cbs.forEach((cb) => {
      this.db.collection('academics').doc(this.department).collection('lmsstudents').doc(cb.id).delete().then(() => {
        let fe = this.students.findIndex(st => st.id == cb.id)
        let fet = this.totalstudents.findIndex(st => st['id'] == cb.id)
        if(this.study == 'صباحي'){
          let efe = this.dprtS.estudents.findIndex(ste => ste.id == cb.id)
          this.dprtS.estudents.splice(efe, 1)
        }
        if(this.study == 'مسائي'){
          let efe = this.dprtS.students.findIndex(ste => ste.id == cb.id)
          this.dprtS.students.splice(efe, 1)
        }
        //let dfet = this.dprtS.students2.findIndex(st => st['id'] == cb.id)
        this.students.splice(fe, 1)
        this.totalstudents.splice(fet, 1)
      })
      // this.db.collection('academics').doc(this.department).update({rstds:this.decreament})
      // this.db.collection('academics').doc(this.universityRef).update({ureg:this.decreament})
    })
    }
  }

  selectall(){
    this.selall = true
    let cbs = document.querySelectorAll('.cbdelete')
    this.selnum = cbs.length;
    cbs.forEach((cb:any) => {
      cb.checked = true
    })
  }

  deselectall(){
      this.selall = false
      this.selnum = 0
      let cbs = document.querySelectorAll('.cbdelete:checked')
      cbs.forEach((cb:any) => {
        cb.checked = false
      })
  }
  chechedf(checked:any){
    if(checked){
      this.selnum = this.selnum + 1
    }else{
      this.selnum = this.selnum - 1
    }
    
  }

  getByDate(){
    if(this.seldate){
    let ms = 24*60*60*1000
    let cd = Date.now();
    let sd = new Date(this.seldate).valueOf()
    let sdf = sd + ms;
    // this.db.collection('academics').doc(this.department).collection('lmsstudents').where('rd', '>=', sd).where('rd', '<=', sdf)
    // .orderBy('rd').get().then(sns => {
    //   this.students = []
    //   sns.forEach(sn => {
    //     let std = {
    //       id: sn.id,
    //       name: sn.get('fullname'),
    //       rd: sn.get('rd'),
    //       purl: sn.get('phurl')
    //     }
    //     this.ftechnum = sns.docs.length
    //     this.students.push(std)
    //     this.dprtS.students = this.students
    //   })
    // })
    this.students = this.totalstudents.filter(stdt => {
      let sn: number = stdt['rd']
      let r = (sn >= sd && sn < sdf)
      return r
    })
  }
  }

  identf(){
    this.router.navigate(['/collegeadmin', {outlets: {'col':['identities']}}])
    //this.router.navigate(['/collegeadmin', {outlets: {'col':['selstudent']}}])
  }

  searchf5(){
    this.db.collection('academics').doc(this.department).collection('lmsstudents').get()
    .then(sns => {
      this.students = []
      sns.forEach(sn => {
        let std:any = {
          id: sn.id,
          name: sn.get('fullname'),
          rd: sn.get('rd'),
          purl: sn.get('phurl')
        }
        this.db.collection('lmsusers').where('u', '==', sn.id).get().then(usns => {
          usns.forEach(usn => {
            if(usn.exists){
              std['uf'] = true
              this.students.push(std)
            }
          })
        })
        this.students.sort((s1, s2) => {
          if(s1.rd > s2.rd){
            return 1
          }else{
            return -1
          }
        })
      })
    })    
  }

  searchf6(){
    this.loading = true
    this.db.collection('academics').doc(this.department).collection('lmsstudents').get()
    .then(sns => {
      this.students = []
      sns.forEach(sn => {
        let std:any = {
          id: sn.id,
          name: sn.get('fullname'),
          rd: sn.get('rd'),
          purl: sn.get('phurl')
        }
        this.db.collection('lmsusers').where('u', '==', sn.id).get().then(usns => {
          if(usns.docs.length == 0){
            std['uf'] = false
            this.students.push(std)
          }
          // usns.forEach(usn => {
          //   if(!usn.exists){
          //   }
          // })
        })
      })
      this.students.sort((s1, s2) => {
        if(s1.rd > s2.rd){
          return 1
        }else{
          return -1
        }
      })
      this.loading = false
    })    
  }

  selstudy(){
    this.dprtS.study = this.study
    // this.db.collection('academics').doc(this.department).collection('lmsstudents').where('study', '==', this.study).orderBy('rd').limit(20)
    // .get().then(sns => {
    //   this.students = []
    //   let num = sns.docs.length
    //   this.ftechnum = num
    //   this.lastVisible = sns.docs[num-1]
    //   this.dprtS.lastVisible = this.lastVisible
    //   sns.forEach(sn => {
    //     let std = {
    //       id: sn.id,
    //       name: sn.get('fullname'),
    //       rd: sn.get('rd'),
    //       purl: sn.get('phurl')
    //     }
    //     this.students.push(std)
    //     this.dprtS.students = this.students
    //   })
    // })
    document.getElementsByName('studybtn').forEach(e => {
      e.classList.remove('active')
    })
    document.getElementById(this.study)?.classList.add('active')
    this.loading = true
    if(this.study == 'صباحي'){
      this.dprtS.getmstudents()
    }else if (this.study == 'مسائي'){
      this.dprtS.getestudents()
    }
  }

  restcounter(){
    this.db.collection('academics').doc(this.department).collection('lmsstudents').get().then(sn => {
      this.db.collection('academics').doc(this.department).update({rstds: sn.docs.length}).then(() => {
        alert('تم تعديل العداد')
      })
    })
  }

  defilter1(){
    this.nextf()
  }
  nextstipper(){
    if((this.npages-(this.pagestepper+10)) > 10){
      this.pagestepper = this.pagestepper + 10;
    }else{
      this.pagestepper = this.pagestepper + this.npages-(this.pagestepper+10);
    }
  }
  prevstipper(){
    if(this.pagestepper > 0){
      let rem = this.pagestepper % 10
      if(rem > 0){
        this.pagestepper = this.pagestepper - rem
      }else{
        this.pagestepper = this.pagestepper - 10
      }
    }
  }

  gonext(stepper:number){
    this.reclassactive(stepper)
    this.prevnum = (stepper-1)*20
    this.ftechnum = (stepper-1)*20
    let start = (stepper-1)*20
    let last = (stepper-1)*20+20
    this.students = this.totalstudents.slice(start, last)
  }

  reclassactive(stepper:number){
    let lis = document.getElementsByClassName('page-item')
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      li.classList.remove('active')
    }
    document.getElementById(stepper+"")?.classList.add('active')
  }

  rdCompare(a:STD, b:STD){
    if(a.rd > b.rd){
      return 1
    }else if (a.rd < b.rd){
      return -1
    }else {
      return 0
    }
  }

}
