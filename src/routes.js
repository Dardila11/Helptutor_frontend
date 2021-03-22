import React from 'react'
import { Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { StudentLayout } from './layouts/StudentLayout'
import { TutorAccountLayout } from './layouts/TutorAccountLayout'
import { TutorLayout } from './layouts/TutorLayout'
import RegisterView from './views/auth/register/RegisterView'
import NotFoundView from './views/errors/NotFoundView'
import EditInfoView from './views/tutorviews/tutorInfo/EditInfoView'
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
    path: '/tutor/account',
    element: <TutorAccountLayout />,
    children: [
      { path: '/myInfo', element: <EditInfoView /> },
      { path: '/viewProfile', element: <EditInfoView /> }
    ]
  },
  {
    path: '/tutor',
    element: <TutorLayout /> /* Layouts */,
    children: [
      /* Views */
      /* { path: '/account', element: <EditInfoView /> }, */
      { path: '/manageKnowledgeArea', element: <ManageKnowledgeAreaView /> },
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
