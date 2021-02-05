import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DprtService } from 'src/app/services/dprt.service';
import { Academic, Department } from 'src/app/interfaces';
import firebase from 'firebase/app'
import { SettingService } from 'src/app/services/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identities',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent implements OnInit {

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'elementid', // the id of html/table element,
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {
        top: '20',
      }
    }
  }
  student:any
  college: any
  department: any
  url: any
  storage= firebase.storage()
  bcvalue = ''
  image: any
  src= ""
  collegesettings: any

  constructor(private exportAsService: ExportAsService,
              private dprtS: DprtService,
              private settingS: SettingService,
              private router: Router,
    ) { 
      this.dprtS.auth.onAuthStateChanged(user => {
        if(user){
          this.student = this.dprtS.selstudent2
          this.college = this.dprtS.college
          this.collegesettings = this.settingS.college
          this.src = this.collegesettings.logo
          this.bcvalue = this.student.univnum
          const filepath = 'lms/studentsw/'+this.dprtS.departmentid+'/'+this.student.id+'/ph';
          this.storage.ref(filepath).getDownloadURL().then(url => {
            this.url = url
          }).catch(err => {
            this.url = " "
            console.log(err);
          })
          this.department = this.college.departments?.find((d:Department) => d.id == this.dprtS.selstudent2.d) || {}
        }else{
          this.router.navigate(['/'])
        }
      })
    }

  ngOnInit(): void {
  }

  export() {
    // download the file using old school javascript method
    // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
    //   // save started
    // });
    // // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe(content => {
    //   console.log(content);
    // })
  }

  download(){
    // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
    //   // save started
    // });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    var data = document.getElementById('elementid') as HTMLElement;  
    html2canvas(data).then(canvas => {  
      
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
    }
  
    print(){
      window.print()
    }

}
