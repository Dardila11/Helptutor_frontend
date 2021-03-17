import React from 'react'
import { Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { StudentLayout } from './layouts/StudentLayout'
import { TutorLayout } from './layouts/TutorLayout'
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView'
import EditInfoView from './views/tutorInfo/EditInfoView'
import ManageKnowledgeAreaView from './views/tutorviews/manageKnowledgeArea'

const routes = [
  {
    path: '/student',
    element: <StudentLayout /> /* Layouts */,
    children: [
      /* Views */
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/tutor',
    element: <TutorLayout /> /* Layouts */,
    children: [
      /* Views */
      { path: '/account', element: <EditInfoView /> },
      { path: '/manageKnowledgeArea', element: <ManageKnowledgeAreaView/>},
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout /> /* Layouts */,
    children: [
      /* Views */
      { path: 'register', element: <RegisterView /> },
      { path: 'info', element: <EditInfoView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]

export default routes
