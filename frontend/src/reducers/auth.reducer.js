const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        // console.log(action);
        // console.log(state);
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case 'LOGOUT':
        localStorage.removeItem('token');
        console.log('logged out');
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;