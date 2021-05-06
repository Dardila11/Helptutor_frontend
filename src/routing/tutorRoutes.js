import React from 'react'

import { Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'

//Layouts
import TutorAccountLayout from 'src/layouts/TutorAccountLayout'
//Views
import EditInfoView from 'src/views/tutorviews/tutorInfo/EditInfoView'
import ManageKnowledgeAreaView from 'src/views/tutorviews/manageKnowledgeArea'
import ManageServicesView from 'src/views/tutorviews/manageServices'
import ProfileView from 'src/views/tutorviews/profile/ProfileView'

const TutorRoutes = () => {
  return (
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
  )
}

export default TutorRoutes
