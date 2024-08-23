import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset, setCountTo, undo } from './state/counter.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogicService } from './services/logic.service';
import { counterState } from './state/counter.reducer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrxInDec';
  countInputVal = 0;
  resetBool:boolean = false;
  counter:Observable<number> = this.store.select(state=>state.counter.count);
  constructor(private store: Store<{ counter: counterState }>, public counterLogicService: LogicService) { 
    this.counter.subscribe((res)=>console.log(res));
   }

  setCounter(){
    this.store.dispatch(setCountTo({value:this.countInputVal}))
    this.countInputVal = 0;
  }
  increment(){
    this.store.dispatch(increment());
  }
  decrement(){
    this.store.dispatch(decrement());
  }
  reset() {
    this.animateResetButton();
    this.store.dispatch(reset());
  }
  undo(){
    this.store.dispatch(undo());
  }
  animateResetButton(){
    this.resetBool = true;
    setTimeout(() => {
      this.resetBool = false;
    }, 1000);
  }
}
