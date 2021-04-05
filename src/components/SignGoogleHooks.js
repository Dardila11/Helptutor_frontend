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

const responseGoogle = async (props, response) => {
  let jsonValues = {
    token: response.tokenId
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
    if (isAuthenticated) navigate('/tutor/cuenta')
    // eslint-disable-next-line
  }, [isAuthenticated])

  const onSuccess = (res) => {
    console.log(res)
    console.log(`login success: currentUser ${res}`)
    /*
     * check whether user email matches @unicauca.edu.co
     */
    let userEmail = res.profileObj.email
    if  (userEmail.substr(userEmail.length - 15) === 'unicauca.edu.co')  {
      responseGoogle(props, res)
    } else {
      console.log("No es de unicauca")
    }
  }

  const onFailure = (res) => {
    console.log(`login failure: res ${res}`)
    responseGoogle(props, res)
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
    <Card onClick={signIn} className={classes.button}>
      <img src="icons/google.svg" alt="google login" className={classes.icon} />
      <span className={classes.buttonText}>
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
