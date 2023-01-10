import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { LoginProps, DeviceAPIProps } from '../items/Interfaces';

// API 헤더 설정
const aircok_axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:11116',
  headers : {
    "Access-Control-Allow-Origin" : "http://localhost:11116"
  }
})
aircok_axios.defaults.withCredentials = true;

// 로그인 API
export const loginAPI = async (user : LoginProps) => {
  try{
    const data : AxiosResponse = await aircok_axios.post(
      '/login/user',
      {
        id : user.id,
        pw : user.pw
      }
    );

    return data;
  }
  catch (err){
    // console.log(err)
    return null
  }
}

// 로그아웃 API
export const logoutAPI = async () => {
  try{
    const data : AxiosResponse = await aircok_axios.post(
      '/logout'
    );

    return data;
  }
  catch (err){
    // console.log(err)
    return null
  }
}

// 장비 리스트 API
export const deviceListsAPI = async () => {
  try{
    const data : AxiosResponse = await aircok_axios.get(
      '/device/lists'
    );

    return data;
  }
  catch (err){
    // console.log(err)
    return null
  }
}

// 장비 데이터 API
export const deviceDataAPI = async (params : DeviceAPIProps) => {
  console.log(params)
  try{
    const data : AxiosResponse = await aircok_axios.get(
      '/device/data/' + params.sn + '?st=' + params.st + '&et=' + params.et
    );

    return data;
  }
  catch (err){
    // console.log(err)
    return null
  }
}

// 장비 최신 데이터 API
export const deviceLatestDataAPI = async () => {
  try{
    const data : AxiosResponse = await aircok_axios.get(
      '/device/latests'
    );

    return data;
  }
  catch (err){
    // console.log(err)
    return null
  }
}



const APIs = {
  loginAPI,
  logoutAPI,
  deviceListsAPI,
  deviceDataAPI,
  deviceLatestDataAPI
};

export default APIs;