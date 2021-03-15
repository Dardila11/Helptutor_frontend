import React from 'react';
import GoogleLogin from 'react-google-login'
import Api from '../services/Api'

const responseGoogle = async (response)=> { 
    let jsonValues = {
      id_token: response.tokenId,          
    }
    console.log(jsonValues);
     Api.postGoogleTutor(jsonValues)
      .then(res => {
        if (res.status === 201) {
          console.log(res.status)
        }
      })
}

const SignInGoogle = () => {
 return(
     <GoogleLogin 
     clientId="581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com"
     buttonText="Acceder con google"
     onSuccess={responseGoogle}
     onFailure={responseGoogle}
     cookiePolicy={'single_host_origin'}/>
    )
}
export default SignInGoogle;