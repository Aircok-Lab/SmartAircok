import { combineReducers } from 'redux';
import actLogin from './ActLogin'
import actDatas from './ActDatas'
import actLatests from './ActLatests'

const rootReducer = combineReducers({
  actLogin,
  actDatas,
  actLatests
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;