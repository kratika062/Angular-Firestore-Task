import { Injectable } from '@angular/core';
import { Data } from './data.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  formData: Data;

  constructor(private firestore : AngularFirestore) { }
  
  getData() {
    return this.firestore.collection('data').snapshotChanges();
  }
}
