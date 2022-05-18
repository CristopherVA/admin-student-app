import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AdminStudentPage } from './pages/AdminStudentPage'
import { CreateStudentPage } from './pages/CreateStudentPage'

export const App = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="student" element={<AdminStudentPage />} />
        <Route path="create" element={<CreateStudentPage />} />
        <Route path="update" element={<CreateStudentPage />} />
        <Route render={ () => <Navigate to='/' /> } />

    </Routes>
  )
}