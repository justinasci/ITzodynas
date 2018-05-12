import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){
    this.loadDictionary();
  }
  title = 'app';
  lt = '';
  en = '';
  dictionary = [];

  getDictionary() : Observable<any>  {
    return this.http.get('./assets/dictionary.json');
  }

  loadDictionary() {
    return this.getDictionary().subscribe((data: any) => {
      this.dictionary = data;
      console.log(this.dictionary);
    })
  }

  onKeyEn(event: any) {
    console.log(event.target.value);
  }

  onKeyLt(event: any) {
    console.log(event.target.value);
  }
  
}
