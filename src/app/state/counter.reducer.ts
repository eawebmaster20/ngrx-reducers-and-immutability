import { createReducer, on } from "@ngrx/store";
import { decrement, increment, incrementBy, reset, setCountTo, undo } from "./counter.actions";

export interface counterState{
  count:number,
  intervals:number, 
  past:number[]
}
export const initState:counterState = {
  count: 0,
  intervals:1,
  past: []
}
export const counterReducer = createReducer(
    initState,
    on(increment, (state) => ({...state, past:[...state.past,state.count],count: state.count + state.intervals})),
    on(setCountTo, (state, {value}) => ({...state,past:[...state.past,state.count], count: value})),
    on(incrementBy, (state, {value}) => ({...state,past:[...state.past,state.count], intervals: value})),
    on(decrement, (state) => ({...state,past:[...state.past,state.count], count: state.count >= state.intervals ? state.count - state.intervals: state.count})),
    on(undo, (state) => {
      if(state.past.length > 0){
        const previousCount = state.past[state.past.length -1]
        return{
          ...state, count:previousCount, past:state.past.slice(0, state.past.length -1)
        }
      }
      else{
        return state;
      }
    }),
    on(reset, (state) =>({...state,past:[...state.past,state.count], count: 0}))
  );