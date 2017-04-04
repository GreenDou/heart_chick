import { Action } from 'redux';
import { createAction, handleActions } from 'redux-actions';

interface ExampleStates {
  example_state:string;
}

const initial_states = {
  example_state: 'Hello World!',
};

export const ACTION_EXAMPLE = 'module/example';
export const action_example = createAction(ACTION_EXAMPLE);

export const example_reducer = handleActions({
  [ACTION_EXAMPLE]: example_split_reducer,
}, initial_states);

function example_split_reducer(state:ExampleStates, action:Action) {
  return state;
}
