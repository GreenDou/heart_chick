import { createAction, handleActions } from 'redux-actions';
import { assign } from 'lodash';

enum PageType {
  welcome,
  display,
}

interface BaseState {
  readonly cur_page:PageType;
}

const initial_state = {
  cur_page: PageType.welcome,
};

const SWITCH_PAGES = 'switch_pages';
export const action_switch_pages = createAction(SWITCH_PAGES);
export function switch_pages(state, action) {
  return assign({}, state, {
    cur_page: action.payload.cur_page,
  })
}


export const reducer_base = handleActions(
  {
    [SWITCH_PAGES]: switch_pages,
  },
  initial_state);