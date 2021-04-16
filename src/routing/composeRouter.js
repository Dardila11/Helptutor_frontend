import React from 'react'

import { Routes, Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import { MainLayout } from 'src/layouts/MainLayout'
import TutorAccountLayout from 'src/layouts/TutorAccountLayout'
import StudentAccountLayout from 'src/layouts/StudentAccountLayout'
import RegisterView from 'src/views/auth/Register/RegisterView'
import LoginView from 'src/views/auth/Login'
import NotFoundView from 'src/views/errors/NotFoundView'
import EditInfoView from 'src/views/tutorviews/tutorInfo/EditInfoView'
import ManageKnowledgeAreaView from 'src/views/tutorviews/manageKnowledgeArea'
import ManageServicesView from 'src/views/tutorviews/manageServices'
import ProfileView from 'src/views/tutorviews/profile/ProfileView'
import StudentProfileView from 'src/views/studentviews/profile/ProfileView'
import StudentEditInfoView from 'src/views/studentviews/studentInfo/EditInfoView'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginView />} />
        <Route path="registrar" element={<RegisterView />} />
      </Route>
      <PrivateRoute path="/tutor" element={<TutorAccountLayout />}>
        <Route path="/cuenta" element={<ProfileView />} />
        <Route path="/cuenta/perfil" element={<ProfileView />} />
        <Route path="/cuenta/informacion" element={<EditInfoView />} />        
        <Route path="/cuenta/servicios" element={<ManageServicesView />} />
        <Route
          path="/cuenta/especialidades"
          element={<ManageKnowledgeAreaView />}
        />
      </PrivateRoute>
      <PrivateRoute path="/estudiante" element={<StudentAccountLayout />}>
        <Route path="/cuenta/perfil" element={<StudentProfileView />} />
        <Route path="/cuenta/informacion" element={<StudentEditInfoView />} />
      </PrivateRoute>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

export default Routing
