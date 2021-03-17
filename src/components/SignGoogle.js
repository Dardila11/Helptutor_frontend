import React from 'react'
import GoogleLogin from 'react-google-login'
import Api from '../services/Api'
import Alert from '@material-ui/lab/Alert';

const responseGoogle = async (response) => {
  let jsonValues = {
    id_token: response.tokenId
  }
  Api.postGoogleTutor(jsonValues).then((res) => {
    if (res.status === 200) {
      return (
        <Alert variant='filled' severity="success">Usuario registrado correctamente</Alert>
      )
    }else {
      return (
        <Alert variant='filled' severity="error">Error registrando el usuario</Alert>
      )
    }
  })
}

const SignInGoogle = () => {

  return (
    <>
    <GoogleLogin
      clientId="581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com"
      buttonText="Acceder con google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    </>
  )
}
export default SignInGoogle
