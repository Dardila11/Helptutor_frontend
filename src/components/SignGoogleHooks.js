import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from 'react-google-login'
import { Card, makeStyles } from '@material-ui/core'

import { loginUser, useAuthDispatch } from 'src/context' 
import { toast } from 'react-toastify'
const clientId =
  '581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  button: {
    cursor: 'pointer',
    display: 'flex',
    /* fontSize: '1.3rem', */
    boxSizing: 'content-box',
    margin: '2px auto 0px',

    /* padding: theme.spacing(0.7), */
    padding: '8px 22px',
    /* 
    width: '100%',
    boxShadow: '0px 16px 60px rgba(78, 79, 114, 0.08)'
    borderRadius: '24px', 
    borderColor: 'transparent',
    */
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: '10px',
    left: '30px',
    alignItems: 'center'
  },
  buttonText: {
    /* fontWeight: 'bolder' */
  }
}))

const responseGoogle = async (login,response, isUnicaucaEmail, role,dispatch,navigate) => {
    if (isUnicaucaEmail) {
      let jsonValues = {
        token: response.tokenId
      }
      if (login){ 
        let payload = jsonValues
        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            if (!response.user) return
            if(response.roles[0] && response.roles[1]) navigate('/seleccion-rol')
            if(response.roles[0] && !response.roles[1]) navigate('/tutor')
            if(!response.roles[0] && response.roles[1]) navigate('/estudiante')
            toast.success("Bienvenido "+response.user.first_name)
        } catch (error) {
            console.log(error)
        }
      }
      /*else {
        if (role === 'tutor') props.addTutorGoogle(jsonValues)
        else props.addStudentGoogle(jsonValues)
      }*/
    } else {
      console.log("error")
    }
  }

const LoginHooks = ({login, tutorSelect, studentSelect}) => {
  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
  let navigate = useNavigate()
  const classes = useStyles()
  const hasRoleSelected = tutorSelect || studentSelect

  const validateRole = () => {
    if (!hasRoleSelected && !login) {
      console.log("No has seleccionado el rol")
    } else {
      signIn()
    }
  }


  const onSuccess = (res) => {
    /*
     * check whether user email matches @unicauca.edu.co
     */
    let userEmail = res.profileObj.email
    if (userEmail.substr(userEmail.length - 15) === 'unicauca.edu.co') {
      if (tutorSelect) responseGoogle(login, res, true, 'tutor',dispatch,navigate)
      else responseGoogle(login, res, true, 'student',dispatch,navigate)
    } else {
      responseGoogle(login, res, false)
    }
  }

  const onFailure = (res) => {
    console.log("login error")
    console.log(res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    /* isSignedIn: true, */
    accessType: false,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <Card onClick={validateRole} className={classes.button}>
      <img src="icons/google.svg" alt="google login" className={classes.icon} />
      <span className={classes.buttonText}>
        {login ? 'Iniciar Sesión con Google' : 'Registrarme con Google'}
      </span>
    </Card>
  )
}


export default LoginHooks
