//REACT
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import GoogleLogin from 'react-google-login'

//REDUX
import { addUserGoogle, loginGoogle } from '../redux/actions/auth'
import { connect } from 'react-redux'

const responseGoogle = async (props, response) => {
  let jsonValues = {
    id_token: response.tokenId
  }
  if (props.login) props.loginGoogle(jsonValues)
  else {
    props.addUserGoogle(jsonValues)
  }
}

const SignInGoogle = (props) => {
  let navigate = useNavigate()
  const { isAuthenticated } = props

  useEffect(() => {
    if (isAuthenticated) navigate('/tutor/cuenta')
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <>
      <GoogleLogin
        clientId="581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com"
        buttonText={
          props.login ? 'Iniciar sesión con Google' : 'Registrarme con Google'
        }
        onSuccess={(response) => responseGoogle(props, response)}
        onFailure={(response) => responseGoogle(props, response)}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  addUserGoogle,
  loginGoogle
})(SignInGoogle)
