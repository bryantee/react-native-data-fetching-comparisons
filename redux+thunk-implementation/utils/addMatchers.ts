import {ActionReducerMapBuilder, AsyncThunk, isAnyOf, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit';

interface BuilderMatcher<T, U = string> {
  builder: ActionReducerMapBuilder<T>;
  thunk: AsyncThunk<U, any, {}>;
  stateVariable: string;
  resetData?: {};
}

export const isAPendingAction = <U = string>(thunk: AsyncThunk<U, any, {}>) => isPending(thunk);

export const isAFulfilledAction = <U = string>(thunk: AsyncThunk<U, any, {}>) => isFulfilled(thunk);

export const isARejectedAction = <U = string>(thunk: AsyncThunk<U, any, {}>) => isRejected(thunk);

export const addMatchers = <T, U>({builder, thunk, stateVariable, resetData}: BuilderMatcher<T, U>) => {
  builder.addMatcher(isAnyOf(isAPendingAction(thunk)), (state: any) => {
    state[stateVariable].isLoading = true;
  });
  builder.addMatcher(isAnyOf(isAFulfilledAction(thunk), isARejectedAction(thunk)), (state: any) => {
    state[stateVariable].isLoading = false;
  });
  builder.addMatcher(isAnyOf(isAPendingAction(thunk), isAFulfilledAction(thunk)), (state: any) => {
    state[stateVariable].error = undefined;
  });
  builder.addMatcher(isAnyOf(isAPendingAction(thunk), isARejectedAction(thunk)), (state: any) => {
    state[stateVariable].data = {
      ...state[stateVariable].data,
      ...resetData,
    };
  });
};
