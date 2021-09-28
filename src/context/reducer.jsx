let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";
let roles = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).roles
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  roles: [] || roles,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        roles: action.payload.roles,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        roles: []
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};