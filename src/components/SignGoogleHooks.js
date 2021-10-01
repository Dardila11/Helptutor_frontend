import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from 'react-google-login'
import { Card, makeStyles } from '@material-ui/core'

import { loginUser, useAuthDispatch, useAuthState } from 'src/context'
import { toast } from 'react-toastify'
const clientId =
  '581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  button: {
    cursor: 'pointer',
    display: 'flex',
    boxSizing: 'content-box',
    margin: '2px auto 0px',
    padding: '8px 22px',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: '10px',
    left: '30px',
    alignItems: 'center'
  }
}))

const LoginHooks = () => {
  const { roles } = useAuthState()
  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
  const navigate = useNavigate()
  const classes = useStyles()

  const onSuccess = async (res) => {
    /*
     * check whether user email matches @unicauca.edu.co
     */
    let userEmail = res.profileObj.email
    if (userEmail.substr(userEmail.length - 15) === 'unicauca.edu.co') {
      let jsonValues = {
        token: res.tokenId
      }
      let payload = jsonValues
      try {
        loginUser(dispatch, payload, true)
        // toast.success('Bienvenido ' + response.user.first_name)
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error('El correo no pertenece a la Universidad del Cauca')
    }
  }

  const onFailure = (res) => {
    console.log('login error')
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

  useEffect(() => {
    console.log('cargando')
    if (roles[0] && roles[1]) navigate('/seleccion-rol')
    if (roles[0] && !roles[1]) navigate('/tutor')
    if (!roles[0] && roles[1]) navigate('/estudiante')
  }, [roles, navigate])

  return (
    <Card onClick={signIn} className={classes.button}>
      <img src="icons/google.svg" alt="google login" className={classes.icon} />
      <span className={classes.buttonText}>{'Iniciar Sesión con Google'}</span>
    </Card>
  )
}

export default LoginHooks
