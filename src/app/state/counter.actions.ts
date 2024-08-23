import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter Component] Increment counter');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const undo = createAction('[Counter Component] undo');
export const setCountTo = createAction('[Counter Component] Set Count To', props<{value: any}>());