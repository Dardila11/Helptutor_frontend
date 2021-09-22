import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import MainNavBar from './navbar'
import { ToastContainer } from 'react-toastify'
import { useAuthDispatch, onReload } from 'src/context'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    overflow: 'auto'
  },
  contentContainer: {
    display: 'flex',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginTop: theme.spacing(8)
  }
}))

export const MainLayout = () => {
  const classes = useStyles()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if(user!=null){
      onReload(dispatch,user)
      navigate('/seleccion-rol')
    }
  },[dispatch])

  return (
    <div className={classes.root}>
      <MainNavBar />
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
    </div>
  )
}
