import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-info',
  templateUrl: './data-info.component.html',
  styleUrls: ['./data-info.component.css']
})
export class DataInfoComponent implements OnInit {

  constructor(public service: DataService,
    private firestore: AngularFirestore,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id:null,
      fullName: '',
      email: '',
      mobile: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({},form.value) ;
    delete data.id;
    if(form.value.id === null)
    this.firestore.collection('data').add(data);
    else
    this.firestore.doc('data/' +form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success("Submitted Successfully", 'Data Registered in Firestore');

  }

}
