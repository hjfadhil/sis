import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { DprtService } from 'src/app/services/dprt.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exportstudents',
  templateUrl: './exportstudents.component.html',
  styleUrls: ['./exportstudents.component.css']
})
export class ExportstudentsComponent {

  db = firebase.firestore()
  departmentid = ""

  constructor(private router: Router,
              private dprtS: DprtService,
    ) {
      this.departmentid = this.dprtS.departmentid
      console.log(this.departmentid);
      
  }

  getStudents(){
    this.db.collection('academics').doc(this.departmentid).collection('lmsstudents').get().then(sns => {
      let js: any[] = []
      sns.forEach(sn => {
        let d = sn.data();
        let obj = {
          الاسم: d.fullname,
          الاسم_الانكليزي: d.efuulname,
          قناة_القبول: d.acch,
          التسلسل_في_قوائم_القبول: d.accnum,
          المحافظة: d.gaddress || '',
          العنوان: d.address,
          سنة_القبول: d.ay,
          فصيلة_الدم: d.bc,
          المواليد: d.bd,
          الجنس: d.gen,
          الايميل: d.email,
          الهاتف: d.phone,
          الدراسة: d.study,
          الرقم_الامتحاني: d.examnum,
          عدد_افراد_الاسرة: d.famnum,
          تسلسل_الطالب_في_الاسرة: d.famser,
          اسم_ولي_الامر: d.ffullname,
          عنوان_ولي_الامر: d.fathaddr,
          الصلة_بولي_الامر: d.fathrel,
          هاتف_ولي_الامر: d.fphone,
          التحصيل_الدراسي_لوي_الامر: d.fdeg,
          مهنة_ولي_الامر: d.fwork,
          اسم_الام: d.mfullname,
          التحصيل_الدراسي_للام: d.mdeg,
          الجنسية: d.cit,
          اسم_الكفيل: d.kefname,
          عنوان_الكفيل: d.kefcit,
          تاريخ_الكفالة: d.kefdate,
          رقم_هوية_الكفيل: d.kefidnum,
          هاتف_الكفيل: d.kefphone,
          دائرة_الكفيل: d.kefwork,
          القومية: d.nat,
          اسم_الاعداية: d.primname,
          محافظة_الاعدادية: d.primgov,
          المجموع_في_الاعدادية: d.primsum,
          الدور: d.try,
          الفرع: d.branch,
          من_ابناء_الاساتذة: d.teachsun,
          العلاقة_بالشهيد: d.shrel,
          فئة_الشهيد: d.shcl,
          تاريخ_الاستشهاد: d.shdate,
          رقم_القرار: d.shnum,
          مصادقة: d.approved
        }
        js.push(obj)
      })
      this.export(js)
    })
  }

  export(ja:any[]){
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //let exos = [{a:1, b:2}]
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ja);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "examtable"+Date.now()+".xlsx";
    saveAs(blob, filename)
    // let blob = new Blob([xf], {type: fileType})
  }

  

}
