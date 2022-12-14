import axios, {AxiosInstance, AxiosResponse} from 'axios';

import {LoginProps} from '../items/interfaces';

const aircok_axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:11116',
  headers : {
    "Access-Control-Allow-Origin" : "*"
  }
})

// export const deviceListAPI = async (param : string) => {
//   try{
//     console.log(param)

//     return await client.get(`/devicelist`,{
//       aircokkey : param
//     })
//     .then((res) => {
//       console.log(res.data);
//       if(res.status === 200){
//         console.log(res.data);

//         return res.data;
//       }
//       else{
//         const err = new Error('Failed Call API');
//         throw err;
//       }
//     });
//   }
//   catch (error) {
//     throw error;
//   }
// };

export const loginAPI = async (user : LoginProps) => {
  try{
    const data : AxiosResponse = await aircok_axios.post(
      '/loginprocess',
      {
        id : user.id,
        pw : user.pw
      }
    );

    console.log(data)

    return data;
  }
  catch (err){
    console.log(err)
    return null
  }
}



const APIs = {
  loginAPI
};

export default APIs;