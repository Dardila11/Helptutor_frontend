import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from 'react-google-login'
import { Card, makeStyles } from '@material-ui/core'

//REDUX
import { addTutorGoogle, addStudentGoogle, loginGoogle } from '../redux/actions/auth'
import { launchAlert } from '../redux/actions/alerts'
import { connect } from 'react-redux'
import store from '../redux/store.js'
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

const responseGoogle = async (props, response, isUnicaucaEmail, role) => {
  if (isUnicaucaEmail) {
    let jsonValues = {
      token: response.tokenId
    }
    if (props.login) props.loginGoogle(jsonValues)
    else {
      if(role==='tutor')props.addTutorGoogle(jsonValues)
      else props.addStudentGoogle(jsonValues)
    }
  } else {
    store.dispatch(
      launchAlert('El correo proporcionado no pertenece a la universidad del cauca', 1)
    )
  }
}
const LoginHooks = (props) => {
  let navigate = useNavigate()
  const classes = useStyles()
  const { isAuthenticated, tutorSelect, studentSelect } = props
  const hasRoleSelected = tutorSelect || studentSelect 
  
  const validateRole = () => {
    if (!hasRoleSelected && !props.login) {
      store.dispatch(
        launchAlert('Debes seleccionar un rol para registrarte', 1)
      )
    } else {
      signIn()
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/tutor/cuenta')
    // eslint-disable-next-line
  }, [isAuthenticated])

  const onSuccess = (res) => {
    /*
     * check whether user email matches @unicauca.edu.co
     */
    let userEmail = res.profileObj.email
    if (userEmail.substr(userEmail.length - 15) === 'unicauca.edu.co') {
      if(tutorSelect)responseGoogle(props, res, true, 'tutor')
      else responseGoogle(props, res, true, 'student')
    } else {
      responseGoogle(props, res, false)
    }
  }

  const onFailure = (res) => {
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
    <Card onClick={validateRole} className={classes.button}>
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
  addTutorGoogle,
  addStudentGoogle,
  loginGoogle
})(LoginHooks)
