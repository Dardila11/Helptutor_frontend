import React from 'react'

import { Routes, Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import { MainLayout } from '../layouts/MainLayout'
import { TutorAccountLayout } from '../layouts/TutorAccountLayout'
import { TutorLayout } from '../layouts/TutorLayout'
import RegisterView from '../views/auth/Register/RegisterView'
import LoginView from '../views/auth/Login'
import NotFoundView from '../views/errors/NotFoundView'
import EditInfoView from '../views/tutorviews/tutorInfo/EditInfoView'
import ManageKnowledgeAreaView from '../views/tutorviews/manageKnowledgeArea'
import ManageServicesView from '../views/tutorviews/manageServices'
import ProfileView from '../views/tutorviews/profile/ProfileView'

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
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

export default Routing
