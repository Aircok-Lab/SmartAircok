import axios, {AxiosInstance, AxiosResponse} from 'axios';

const aircok_axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8200',
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

export const test2 = async (param : string) => {
  try{
    const data : AxiosResponse = await aircok_axios.get(
      '/devicelist',
      {
        params : {
          aircokkey : param
        }
      }
    );

    return data;
  }
  catch (err){
    console.log(err)
    return null
  }
}



// const APIs = {
//   deviceListAPI
// };

// export default APIs;