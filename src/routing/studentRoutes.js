import React from 'react'

import { Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'

//Layouts
import StudentLayout from 'src/layouts/StudentLayout'
import StudentAccountLayout from 'src/layouts/StudentAccountLayout'
//Views
import StudentProfileView from 'src/views/studentviews/profile/ProfileView'
import StudentEditInfoView from 'src/views/studentviews/studentInfo/EditInfoView'
import StudentPublicationsView from 'src/views/studentviews/publications/index'
import TutorsView from 'src/views/studentviews/tutors/tutorsView'

const StudentRoutes = () => {
    return (
        <>
        <PrivateRoute path="/estudiante" element={<StudentLayout />}>
            <Route path="/" element={<StudentPublicationsView />} />
            <Route path="/publicaciones" element={<StudentPublicationsView />} />
            <Route path="/tutores" element={<TutorsView />}/>
        </PrivateRoute>

        <PrivateRoute path="/estudiante/cuenta" element={<StudentAccountLayout />}>
            <Route path="/perfil" element={<StudentProfileView />} />
            <Route path="/informacion" element={<StudentEditInfoView />} />
        </PrivateRoute>
        </>
    )
}

export default StudentRoutes