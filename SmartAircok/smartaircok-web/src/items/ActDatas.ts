import { DeviceDataProps } from '@/items/Interfaces'

const DATAS = 'ActDatas/DATAS' as const;

export const act_devicedatas = (datasVal : DeviceDataProps[]) => ({
  type : DATAS,
  payload : {
    datas : datasVal
  }
});

// action type
type MyDeviceGlobalAction =
  | ReturnType<typeof act_devicedatas>;

type MyDeviceGloblsType = {
  // devices : Map<string, string[]>
  devices : DeviceDataProps[]
};
  
// state initalize
const initState : MyDeviceGloblsType = {
  // devices : new Map<string, string[]>()
  devices : []
};

const actDatas = (state : MyDeviceGloblsType = initState, action : MyDeviceGlobalAction) => {
  switch (action.type) {
    case DATAS :
      return {
        ...state,
        devices : action.payload.datas
      };
    default :
      return state;
  }
};

export default actDatas