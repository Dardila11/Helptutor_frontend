import React from 'react';
import {
  Container,
  Card,
  Typography,
  Box,
  makeStyles,
  CardActionArea,
  Button
} from '@material-ui/core';
import GoogleLogin from 'react-google-login'

const responseGoogle = (response)=> {
    console.log(response)
}

const useStyles = makeStyles({
  root: {}
});

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