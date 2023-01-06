const DATAS = 'ActDatas/DATAS' as const;

export const act_devicedatas = (datasVal : Map<string, Object>) => ({
  type : DATAS,
  payload : {
    datas : datasVal
  }
});

// action type
type MyDeviceGlobalAction =
  | ReturnType<typeof act_devicedatas>;

type MyDeviceGloblsType = {
  devices : Map<string, string[]>
};
  
// state initalize
const initState : MyDeviceGloblsType = {
  devices : new Map<string, string[]>()
};

const actDatas = (state : MyDeviceGloblsType = initState, action : MyDeviceGlobalAction) => {
  switch (action.type) {
    case DATAS :
      const dataMap = new Map()
      action.payload.datas.forEach((data, sn) => dataMap.set(sn, data))
      return {
        ...state,
        devices : dataMap
      };
    default :
      return state;
  }
};

export default actDatas