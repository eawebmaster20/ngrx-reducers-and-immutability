import { createSelector } from "@ngrx/store";

export const counterSelectorFeature = (state:number)=>state;
export const selectAll= createSelector(counterSelectorFeature, (state:number)=>state)