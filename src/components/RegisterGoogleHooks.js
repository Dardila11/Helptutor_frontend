import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from 'react-google-login'
import { Card, makeStyles } from '@material-ui/core'
import Api from 'src/services/Api'

import { loginUser, useAuthDispatch } from 'src/context' 
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

const RegisterHooks = ({tutorSelect, studentSelect}) => {
  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
  let navigate = useNavigate()
  const classes = useStyles()
  const hasRoleSelected = tutorSelect || studentSelect

  const validateRole = () => {
    if (!hasRoleSelected) {
      toast.error("No has seleccionado un rol para registrarte")
    } else {
      signIn()
    }
  }


  const onSuccess = async (res) => {
    /*
     * check whether user email matches @unicauca.edu.co
     */
    let userEmail = res.profileObj.email
    if (userEmail.substr(userEmail.length - 15) === 'unicauca.edu.co') {
        let jsonValues = {
          token: res.tokenId
        }
        console.log(jsonValues)
        if(tutorSelect){
          Api.postGoogleTutor(jsonValues).then(async (result) => {  
            let response = await loginUser(dispatch, jsonValues, true) //loginUser action makes the request and handles all the neccessary state changes
            if (!response.user) return
            if(response.roles[0] && response.roles[1]) navigate('/seleccion-rol')
            if(response.roles[0] && !response.roles[1]) navigate('/tutor')
            if(!response.roles[0] && response.roles[1]) navigate('/estudiante')
            toast.success("Bienvenido "+response.user.first_name)
          }).catch(err=>{
            console.log(err)
            toast.error("Login error "+err)
          }
          )
        }else{
          Api.postGoogleStudent(jsonValues).then(result => {
            console.log(result)
          }).catch(err=>{
            console.log(err)
            toast.error("Login error "+err)
          }
          )
        }
    } else {
      toast.error("El correo no pertenece a Unicauca")
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
        {'Registrarme con Google'}
      </span>
    </Card>
  )
}


export default RegisterHooks
