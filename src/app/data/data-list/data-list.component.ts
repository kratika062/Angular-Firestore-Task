import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Data } from 'src/app/shared/data.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  list: Data[];
  constructor(public service: DataService, private firestore: AngularFirestore,private toastr: ToastrService) { }

  ngOnInit(){
    this.service.getData().subscribe(res=>{
      this.list= res.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Data
        } 
      })
    })
  }
   onEdit(data: Data){
    this.service.formData= Object.assign({}, data);

   }
  onDelete(id: string){
    if(confirm("Are you Sure to delete this record")){
      this.firestore.doc("data/"+id).delete();
      this.toastr.warning('Deleted Succesfully.','Firestore data Deletion')
    }
  }



}
