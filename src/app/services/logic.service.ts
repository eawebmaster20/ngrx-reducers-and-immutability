import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  minimumCounterReached = false
  constructor() { }
  logAction(action: string) {
    console.log(`Action: ${action} was triggered.`);
  }
}
