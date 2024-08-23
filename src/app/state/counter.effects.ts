import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, reset } from './counter.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { LogicService } from '../services/logic.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {
  constructor(
    private actions: Actions,
    private counterLogiService: LogicService,
    private store: Store<{ counter: number }>
  ) {}

  loggerEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(increment, decrement, reset),
        tap((action) => {
           console.log(action.type); 
        })
      ),
    { dispatch: false }
  );

  beyondZeroErrorEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(decrement),
        withLatestFrom(this.store.select('counter')), 
        tap(([action, counterState]) => {
            if (action.type === '[Counter Component] Decrement' && counterState ===0) {
                this.counterLogiService.minimumCounterReached = true;                
                setTimeout(() => {
                    this.counterLogiService.minimumCounterReached = false
                    this.counterLogiService.logAction(action.type)
                }, 1000);
                // console.log(`Action: ${action.type} triggered. Current counter state: ${counterState}`);
            }
        })
      ),
    { dispatch: false } 
  );
}
