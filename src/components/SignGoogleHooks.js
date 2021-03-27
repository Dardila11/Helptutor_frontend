import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from 'react-google-login'
import { Card, makeStyles } from '@material-ui/core'

//REDUX
import { addUserGoogle, loginGoogle } from '../redux/actions/auth'
import { connect } from 'react-redux'

const clientId =
  '581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  button: {
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1.3rem',
    boxSizing: 'content-box',
    margin: '2px auto 0px',
    width: '100%',
    padding: '15px 20px',
    /* 
    boxShadow: '0px 16px 60px rgba(78, 79, 114, 0.08)'
    borderRadius: '24px', 
    */
    borderColor: 'transparent',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  icon: {
    height: '25px',
    width: '25px',
    marginRight: '10px',
    left: '30px',
    alignItems: 'center'
  },
  buttonText: {
    /* fontWeight: 'bolder' */
  }
}))

const responseGoogle = async (props, response) => {
  let jsonValues = {
    id_token: response.tokenId
  }
  if (props.login) props.loginGoogle(jsonValues)
  else {
    props.addUserGoogle(jsonValues)
  }
}
const LoginHooks = (props) => {
  let navigate = useNavigate()
  const classes = useStyles()
  const { isAuthenticated } = props

  useEffect(() => {
    if (isAuthenticated) navigate('/tutor/account')
    // eslint-disable-next-line
  }, [isAuthenticated])

  const onSuccess = (res) => {
    console.log(`login success: currentUser ${res.profileObj}`)
    responseGoogle(props, res)
  }

  const onFailure = (res) => {
    console.log(`login failure: res ${res}`)
    responseGoogle(props, res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: false,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <Card onClick={signIn} className={classes.button}>
      <img src="icons/google.svg" alt="google login" className={classes.icon} />
      <span className={classes.buttonText}>
        {' '}
        {props.login ? 'Iniciar Sesión con Google' : 'Registrarme con Google'}
      </span>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  addUserGoogle,
  loginGoogle
})(LoginHooks)
