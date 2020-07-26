import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TimesheetService {
  constructor(private _http: HttpClient, private _appService: AppService, private _authService: AuthService) {
  }

  public saveTimesheet(data): Observable<any> {
    data.user = this._authService.user.localId;
    return this._http.post(environment.API_URL + 'timesheets.json', data).pipe(
      catchError((error) => {
        this._appService.handleError(error);
        return throwError(error);
      })
    )
  }


  public getTimesheets(): Observable<any> {
    return this._http.get(environment.API_URL + 'timesheets.json/?user=' + this._authService.user.localId).pipe(
      map((response) => {
        let result: Array<any> = [];
        for (let key in response) {
          let task: any = {
            title: response[key]['title'],
            notes: response[key]['notes'],
            labels: response[key]['labels'],
            isDone: response[key]['isDone'],
            isStarred: response[key]['isStarred'],
            isImportant: response[key]['isImportant'],
            schedule: response[key]['schedule'],
            createdDate: response[key]['createdDate'],
            updatedDate: response[key]['updatedDate'],
            user: response[key]['user'],
            id: key
          }
          result.push(task);
        }
        return result;
      }),
      catchError((error) => {
        this._appService.handleError(error);
        return throwError(error);
      })
    )
  }

  // DELETE
  public deleteTimesheet(data): Observable<any> {
    return this._http.delete(environment.API_URL + 'timesheets/' + data.id + '.json').pipe(
      catchError((error) => {
        this._appService.handleError(error);
        return throwError(error);
      })
    )
  }

  // UPDATE
  public updateTimesheet(data): Observable<any> {
    data.user = this._authService.user.localId;
    return this._http.put(environment.API_URL + 'timesheets/' + data.id + '.json', data).pipe(
      catchError((error) => {
        this._appService.handleError(error);
        return throwError(error);
      })
    )
  }
}