import { LastDatasProps } from '@/items/Interfaces'

const DATAS = 'ActLatests/DATAS' as const;

export const act_Latestdatas = (datasVal : LastDatasProps[]) => ({
  type : DATAS,
  payload : {
    datas : datasVal
  }
});

// action type
type MyLatestGlobalAction =
  | ReturnType<typeof act_Latestdatas>;

type MyLatestGloblsType = {
  latests : LastDatasProps[]
};
  
// state initalize
const initState : MyLatestGloblsType = {
  latests : []
};

const actLatests = (state : MyLatestGloblsType = initState, action : MyLatestGlobalAction) => {
  switch (action.type) {
    case DATAS :
      return {
        ...state,
        latests : action.payload.datas
      };
    default :
      return state;
  }
};

export default actLatests