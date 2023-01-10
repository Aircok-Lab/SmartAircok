import { takeEvery, put, call } from "redux-saga/effects";

import { act_login } from '../items/ActLogin';
import { act_devicedatas } from '../items/ActDatas';
import { act_Latestdatas } from '../items/ActLatests';

import apis from '../api/APIs'

import { LoginProps, LastDatasProps } from '../items/Interfaces';

interface LoginSagaProps {
  type : string, 
  data : LoginProps
}

interface loginAPIProps {
  data : {
    user : string,
    admin : boolean,
    refresh_token : string,
    result : string
  }
}

interface logoutAPIProps {
  status : number
}

interface deviceListsAPIProps {
  data : {
    devices : string[],
    result : string
  }
}

interface deviceDataAPIProps {
  data : {
    data : LastDatasProps[],
    result : string
  }
}


function* rootSaga() {
  yield takeEvery("SAGA_LOGIN", loginSaga);
  yield takeEvery("SAGA_LOGOUT", logoutSaga);
  yield takeEvery("SAGA_DATAS", dataSaga);
  yield takeEvery("SAGA_LATESTS", latestdataSaga);
}

function* loginSaga({ data } : LoginSagaProps )  {
  try {
    const loginAPIRes : loginAPIProps = yield call(apis.loginAPI, data);
    if(loginAPIRes?.data.result === 'success'){
      yield put(act_login(loginAPIRes.data.user, loginAPIRes.data.admin, loginAPIRes.data.refresh_token));
    }
  } catch (error) {
    console.log(error)
  }
}

function* logoutSaga()  {
  try {
    const loginAPIRes : logoutAPIProps = yield call(apis.logoutAPI);
    if(loginAPIRes?.status === 200){
      document.location.href='/login'
    }
  } catch (error) {
    console.log(error)
  }
}


function* dataSaga() {
  try {
    const deviceAPIRes : deviceListsAPIProps = yield call(apis.deviceListsAPI);
    if(deviceAPIRes?.data.result === 'success'){
      const datamap = new Map<string ,Object>();
      for (const sn of deviceAPIRes.data.devices) {
        const dataAPIRes : deviceDataAPIProps = yield call(apis.deviceDataAPI, sn);
        if(dataAPIRes?.data.result === 'success'){
          datamap.set(sn, dataAPIRes.data.data)
        }
      }
      yield put(act_devicedatas(datamap));
    }
  } catch (error) {
    console.log(error)
  }
}


function* latestdataSaga() {
  try {
    const deviceAPIRes : deviceDataAPIProps = yield call(apis.deviceLatestDataAPI);
    if(deviceAPIRes?.data.result === 'success'){
        yield put(act_Latestdatas(deviceAPIRes.data.data));
      }
    }
  catch (error) {
    console.log(error)
  }
}

export default rootSaga;