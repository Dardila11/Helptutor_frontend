import React, { useEffect } from 'react'

// ROUTER
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'

// CONTEXT
import { getUser, useAuthDispatch, useAuthState } from 'src/context'

// COMPONENT
import NavBarTutor from 'src/layouts/TutorAccountLayout/NavBar'
import NavBarStudent from 'src/layouts/StudentAccountLayout/NavBar'

// PUBLIC VIEWS
import { MainLayout } from 'src/layouts/MainLayout'
import RegisterView from 'src/views/auth/Register/RegisterView'
import LoginView from 'src/views/auth/Login/index'
import SelectRoleView from 'src/views/auth/Login/selectRole'
import NotFoundView from 'src/views/errors/NotFoundView'

// TUTOR VIEWS
import TutorEditInfoView from 'src/views/tutorviews/tutorInfo/index'
import ManageKnowledgeAreaView from 'src/views/tutorviews/manageKnowledgeArea'
import ManageServicesView from 'src/views/tutorviews/manageServices'
import TutorInfoView from 'src/views/tutorviews/profile/index'
import TutorPublicationsView from 'src/views/tutorviews/publications/index'

// STUDENT VIEWS
import StudentProfileView from 'src/views/studentviews/profile/ProfileView'
import StudentEditInfoView from 'src/views/studentviews/studentInfo'
import StudentPublicationsView from 'src/views/studentviews/publications/index'
import TutorsView from 'src/views/studentviews/tutors/tutorsView'
import StudentAdvertisementsView from 'src/views/studentviews/advertisements'
import TutorScheduleView from 'src/views/tutorviews/schedule/TutorScheduleView'
import StudentConsultanciesView from 'src/views/studentviews/consultancies/consultanciesView'

// MEETING VIEWS
import MeetView from 'src/views/meet/MeetView'

// STATIC VIEWS
import LandingPage from 'src/views/statics/LandingPage'

// STYLES
import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white
  }
}))

const Routing = () => {
  const classes = useStyles()
  const dispatch = useAuthDispatch()
  const { isLoading } = useAuthState()

  useEffect(() => {
    getUser(dispatch)
  }, [dispatch])

  return isLoading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="primary">Cargando</Typography>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  ) : (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginView />} />
        <Route path="registrar" element={<RegisterView />} />
        <Route path="seleccion-rol" element={<SelectRoleView />} />
        <Route path="/" element={<LandingPage />} />
      </Route>
      <PrivateRoute path="/estudiante" element={<MainLayout />}>
        <Route path="/" element={<StudentPublicationsView />} />
        <Route path="/publicaciones" element={<StudentPublicationsView />} />
        <Route path="/tutores" element={<TutorsView />} />
        <Route path="/anuncios" element={<StudentAdvertisementsView />} />
        <Route path="/asesorias" element={<StudentConsultanciesView />} />
      </PrivateRoute>
      <PrivateRoute path="/estudiante/cuenta" element={<MainLayout />}>
        <Route path="/perfil" element={<StudentProfileView />} />
        <Route path="/informacion" element={<StudentEditInfoView />} />
      </PrivateRoute>
      <PrivateRoute path="/tutor" element={<MainLayout />}>
        <Route path="/" element={<TutorPublicationsView />} />
        <Route path="/publicaciones" element={<TutorPublicationsView />} />
      </PrivateRoute>
      <PrivateRoute path="/tutor" element={<MainLayout />}>
        <Route path={'/'} element={<TutorInfoView menu={<NavBarTutor />} />} />
        <Route
          path={'/cuenta'}
          element={<TutorInfoView menu={<NavBarTutor />} />}
        />
        <Route path="/cuenta/informacion" element={<TutorEditInfoView />} />
        <Route path="/cuenta/servicios" element={<ManageServicesView />} />
        <Route
          path="/cuenta/especialidades"
          element={<ManageKnowledgeAreaView />}
        />
        <Route path="/cuenta/horario" element={<TutorScheduleView />} />
      </PrivateRoute>
      <PrivateRoute path="/meet" element={<MainLayout />}>
        <Route path="/" element={<MeetView />} />
      </PrivateRoute>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

export default Routing
