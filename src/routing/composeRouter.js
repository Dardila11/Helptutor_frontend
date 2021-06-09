import React from 'react'

import { Routes, Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import { MainLayout } from 'src/layouts/MainLayout'
import TutorAccountLayout from 'src/layouts/TutorAccountLayout'
import StudentAccountLayout from 'src/layouts/StudentAccountLayout'
import StudentLayout from 'src/layouts/StudentLayout/index'
import TutorLayout from 'src/layouts/TutorLayout'
import RegisterView from 'src/views/auth/Register/RegisterView'
import LoginView from 'src/views/auth/Login/index'
import SelectRoleView from 'src/views/auth/Login/selectRole'
import NotFoundView from 'src/views/errors/NotFoundView'

//TUTOR VIEWS
import TutorEditInfoView from 'src/views/tutorviews/tutorInfo/index'
import ManageKnowledgeAreaView from 'src/views/tutorviews/manageKnowledgeArea'
import ManageServicesView from 'src/views/tutorviews/manageServices'
import TutorInfoView from 'src/views/tutorviews/profile/index'
import TutorPublicationsView from 'src/views/tutorviews/publications/index'

//STUDENT VIEWS
import StudentProfileView from 'src/views/studentviews/profile/ProfileView'
import StudentEditInfoView from 'src/views/studentviews/studentInfo'
import StudentPublicationsView from 'src/views/studentviews/publications/index'
import TutorsView from 'src/views/studentviews/tutors/tutorsView'
import StudentAdvertisementsView from 'src/views/studentviews/advertisements'
import TutorScheduleView from 'src/views/tutorviews/schedule/TutorScheduleView'
import Dashboard from 'src/views/statics/dashboard'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginView />} />
        <Route path="registrar" element={<RegisterView />} />
        <Route path="seleccion-rol" element={<SelectRoleView />} />
        <Route path="/" element={<Dashboard />}/>
      </Route>

      <PrivateRoute path="/estudiante" element={<StudentLayout />}>
        <Route path="/" element={<StudentPublicationsView />} />
        <Route path="/publicaciones" element={<StudentPublicationsView />} />
        <Route path="/tutores" element={<TutorsView />} />
        <Route path="/anuncios" element={<StudentAdvertisementsView />} />
      </PrivateRoute>

      <PrivateRoute
        path="/estudiante/cuenta"
        element={<StudentAccountLayout />}>
        <Route path="/perfil" element={<StudentProfileView />} />
        <Route path="/informacion" element={<StudentEditInfoView />} />
      </PrivateRoute>

      <PrivateRoute path="/tutor" element={<TutorLayout />}>
        <Route path="/" element={<TutorPublicationsView />} />
        <Route path="/publicaciones" element={<TutorPublicationsView />} />
      </PrivateRoute>

      <PrivateRoute path="/tutor" element={<TutorAccountLayout />}>
        <Route path="/cuenta" element={<TutorInfoView />} />
        <Route path="/cuenta/perfil" element={<TutorInfoView />} />
        <Route path="/cuenta/informacion" element={<TutorEditInfoView />} />
        <Route path="/cuenta/servicios" element={<ManageServicesView />} />
        <Route path="/cuenta/especialidades" element={<ManageKnowledgeAreaView />} />
        <Route path="/cuenta/horario" element={<TutorScheduleView />} />
      </PrivateRoute>

      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

export default Routing
