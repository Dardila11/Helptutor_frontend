const ROOT_URL = 'https://mdquilindo.pythonanywhere.com'

export async function loginUser(dispatch, loginPayload, isGoogleLogin) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response
    if(isGoogleLogin) {
      response = await fetch(`${ROOT_URL}/api/auth/login/google`, requestOptions)
    }else{
      response = await fetch(`${ROOT_URL}/api/auth/login`, requestOptions)
    }
    let data = await response.json();
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));      
      return data
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export function onReload(dispatch, loginPayload) {
  if (loginPayload.user) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: loginPayload })    
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}