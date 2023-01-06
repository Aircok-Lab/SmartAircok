const LOGIN = 'ActLogin/LOGIN' as const;
const LOGOUT = 'ActLogin/LOGOUT' as const;

export const act_login = (userVal : string, adminVal : boolean, refreshVal : string) => ({
  type : LOGIN,
  payload : {
    user : userVal,
    admin : adminVal, 
    refresh_token : refreshVal
  }
});

export const act_logout = () => ({
  type : LOGOUT
});

// action type
type MyLoginGloblsAction =
  | ReturnType<typeof act_login>
  | ReturnType<typeof act_logout>;

type MyLoginGloblsType = {
  user : string,
  admin : boolean,
  refresh_token : string
};

// state initalize
const initState : MyLoginGloblsType = {
  user : '',
  admin : false,
  refresh_token : ''
};

const actLogin = (state : MyLoginGloblsType = initState, action : MyLoginGloblsAction) => {
  switch (action.type) {
    case LOGIN :
      return  {
        ...state,
        user : action.payload.user,
        admin : action.payload.admin,
        refresh_token : action.payload.refresh_token
      };
    case LOGOUT :
      return  {
        ...state,
        user : '',
        admin : false,
        refresh_token : ''
      };
    default :
      return state;
  }
};

export default actLogin