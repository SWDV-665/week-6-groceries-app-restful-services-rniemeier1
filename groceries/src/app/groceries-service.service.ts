import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {map, catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  constructor(public http: HttpClient) { }

  //List of Groceries
  items = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = "http://localhost:8080";

  //getItems(){
  //  return this.items;
  //}

  getItems():Observable<object[]>{
    return <Observable<object[]>> this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const err = error || '';
      errMsg = err.toString() ? error.status + " - " + error.statusText : err.toString();
    }
    else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(index){
    this.items.splice(index,1);
  }
  
  addItem(item){
    this.items.push(item);
  }

  editItem(item, index){
    this.items[index] = item;
  }
}
