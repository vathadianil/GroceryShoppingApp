import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list('/catagories', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }
}
