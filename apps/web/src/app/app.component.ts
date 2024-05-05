import { Component, OnInit } from '@angular/core';
import { Cat } from './cat.model';
import { CatService } from './cat.service';

@Component({
  selector: 'az-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cats: Cat[] = [];
  isAddingOrEditing = false;
  isEditing = false;
  catForm: Cat = { name: `Cat_${Math.floor(10 + Math.random() * 900)}`, age: Math.floor(10 + Math.random() * 900) };

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.getCats();
  }

  getCats(): void {
    this.catService.getAllCats().subscribe(cats => this.cats = cats);
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.catService.updateCat(this.catForm).subscribe(() => {
        this.resetForm();
        this.getCats();
      });
    } else {
      this.catForm.id = window.crypto.randomUUID();
      this.catService.addCat(this.catForm).subscribe(() => {
        this.resetForm();
        this.getCats();
      });
    }
  }

  editCat(cat: Cat): void {
    this.isAddingOrEditing = true;
    this.isEditing = true;
    this.catForm = { ...cat };
  }

  deleteCat(cat: Cat): void {
    this.catService.deleteCat(cat.id).subscribe(() => {
      this.getCats();
    });
  }

  resetForm(): void {
    this.catForm = { name: `Cat_${Math.floor(10 + Math.random() * 900)}`, age: Math.floor(10 + Math.random() * 900) };
    this.isAddingOrEditing = false;
    this.isEditing = false;
  }
}
