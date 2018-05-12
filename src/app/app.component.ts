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
  dictionary: any;
  display = [];
  frontPageIsCollapsed=false;

  getDictionary() : Observable<any>  {
    return this.http.get('./assets/dictionary.json');
  }

  loadDictionary() {
    return this.getDictionary().subscribe((data: any) => {

      data.eng = data.eng.map( (word, id ) => {
        return {'word': word, id: id};
      });
      let d = [];

      data.lt.forEach((element, id) => {
        for(let i = 0; i < element.length; i++) {
          const t = {'id': id, 'word': element[i]};
          d.push(t);
        }
      });

      data.lt = d;
      this.dictionary = data;
    })
  }

  onKeyEn(event: any) {


    this.frontPageIsCollapsed=true;

    if(event.target.value.length < 3) {
      this.display = [];
      return;
    }

    this.display = this.dictionary.eng.filter( (entry, id ) => {
      if(entry.word.includes(event.target.value))
      {
        return entry;
      }
    });
    this.display = this.display.map(entry => {
      entry.en = entry.word;
      entry.lt = this.dictionary.lt.filter(lt => {
        if(lt.id === entry.id) {
          return lt;
        }
      });
      entry.lt = entry.lt.map(lt => {
        return lt.word;
      })

      return entry;
    });



    console.log(this.display);
  }

  onKeyLt(event: any) {
    console.log(event.target.value);
  
  }
  
}
