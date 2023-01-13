import { takeEvery, put, call } from "redux-saga/effects";

import { act_login } from '../items/ActLogin';
import { act_devicedatas } from '../items/ActDatas';
import { act_Latestdatas } from '../items/ActLatests';

import apis from '../api/APIs'

import { DeviceDataProps, LastDatasProps } from '../items/Interfaces';

interface LoginSagaProps {
  type : string, 
  data : {    
    id : string,
    pw : string
  }
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



// interface deviceListsAPIProps {
//   data : {
//     devices : string[],
//     result : string
//   }
// }

interface deviceDataSagaProps {
  type : string, 
  data : {
    sn : string,
    st : string,
    et : string
  }
}

interface deviceDataAPIProps {
  data : {
    data : DeviceDataProps[],
    result : string
  }
}

interface latestDataAPIProps {
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
      console.log(loginAPIRes.data)
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


function* dataSaga({ data } : deviceDataSagaProps ) {
  try {
    // const datamap = new Map<string ,Object>();
    const dataAPIRes : deviceDataAPIProps = yield call(apis.deviceDataAPI, data);
    if(dataAPIRes?.data.result === 'success'){
      // datamap.set(data.sn, dataAPIRes.data.data)
      yield put(act_devicedatas(dataAPIRes.data.data));
    }
    // yield put(act_devicedatas(datamap));
  } catch (error) {
    console.log(error)
  }
}


function* latestdataSaga() {
  try {
    const deviceAPIRes : latestDataAPIProps = yield call(apis.deviceLatestDataAPI);
    if(deviceAPIRes?.data.result === 'success'){
        yield put(act_Latestdatas(deviceAPIRes.data.data));
      }
    }
  catch (error) {
    console.log(error)
  }
}

export default rootSaga;