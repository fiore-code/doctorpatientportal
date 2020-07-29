import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  PdfUrlList: Object[] = [];
  user: any;
  newDoctorList: Object[] = [];
  anotherDoctorList:Object[]=[];
  shareToDoctor: boolean = false;
  file_path: any;
  constructor(private patientservice: PatientService, private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session == null) {
      this.router.navigate(['/login']);
    }
    this.user = sessionStorage.getItem("user");
    this.patientservice.getPdfUrl(this.user).subscribe(data => {
      let pdfObjectData = data;
      console.log(pdfObjectData);
      pdfObjectData["Objects"].forEach(element => {
        this.PdfUrlList.push(element);
        console.log(this.PdfUrlList);
      });
    });

    this.getDoctorList();
  }

  backToDoctor() {
    this.shareToDoctor = false;
    this.newDoctorList = [];
    this.file_path = "";
  }

  onDoctorShare(event, filePath) {
    this.file_path = filePath;
    console.log(this.file_path);
    this.patientservice.getDoctorList().subscribe(data => {
      let doctorJson = data;
      console.log(doctorJson);
      doctorJson["object"].forEach(element => {
        this.newDoctorList.push(element);
        console.log(element);
      });
      this.shareToDoctor = true;
    });
  }

  shareToDoctorByEmail(event, email) {
    const doctorObj = {
      emailid: email,
      path: this.file_path
    };
    this.patientservice.sendEmailToDoctor(doctorObj).subscribe(data => {
      console.log(data);
      if (data["status"] == false) {
        alert("Server Error Occurred");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
      else {
        alert("Email Sent To Doctor");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
    });
  }


  logOff() {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }

  getDoctorList() {
    this.patientservice.getDoctorList().subscribe(data => {
      data["object"].forEach(element => {
        this.anotherDoctorList.push(element);
      });
    });
  }


}
