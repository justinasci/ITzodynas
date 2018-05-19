import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as lev from 'fast-levenshtein';

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
  threeLetterList = [];
  frontPageIsCollapsed=false;

  getDictionary() : Observable<any>  {
    return this.http.get('./assets/dictionary.json');
  }

  loadDictionary() {
    return this.getDictionary().subscribe((data: any) => {

      data.eng = data.eng.map( (word, id ) => {
        const t = {'word': word, id: id};
        if(word.length < 4) {
          this.threeLetterList.push(t);
        } 
        return t;
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
      console.log(this.threeLetterList);
    })
  }

  onKeyEn(event: any) {
    this.frontPageIsCollapsed=true;

    if(event.target.value.length === 0) {
      this.display = [];
      return;
    }

    let searchSpace = this.dictionary.eng;
    const targetWord = event.target.value.toLowerCase();

    if(event.target.value.length < 4) {
      searchSpace = this.threeLetterList;
    }

    console.log('filter');
    this.display = searchSpace.filter( (entry, id ) => {
      if(entry.word.toLowerCase().includes(targetWord))
      {
        return entry;
      }
    });


    console.log('map');
    this.display = this.display.map(entry => {
      entry.en = entry.word;
      entry.dif = lev.get(entry.en, targetWord);

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

    console.log('sort');
    this.display.sort( (a, b) => {
      if(a.dif > b.dif) {
        return 1;
      } else if(a.dif === b.dif){
        return 0;
      }
      return -1;
    })


    console.log(this.display);
  }

  onKeyLt(event: any) {
    console.log(event.target.value);
  
  }  
}
