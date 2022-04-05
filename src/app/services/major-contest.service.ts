import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MajorContestService {
  private _majorIdContest: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  majorIdContest$: Observable<any> = this._majorIdContest.asObservable();

  setMajorIdContest(major_id: number) {
    this._majorIdContest.next(major_id);
  }
  constructor() { }
}
