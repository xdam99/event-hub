import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppWrapper } from './modules/app/components/AppWrapper'
import { Layout } from './modules/app/components/Layout'
import { LoginForm } from './modules/features/authentication/components/LoginForm'
import { RegisterForm } from './modules/features/authentication/components/RegisterForm'
import { OtpVerifyPage } from './modules/features/authentication/components/OtpVerifyPage'
import { ProfilePage } from './modules/features/user/components/ProfilePage'
import './App.css'
import { lazy, Suspense } from 'react'
import AnalyticsDashboard from './modules/features/dashboard/components/AnalyticsDashboard'
import { Box, CircularProgress } from '@mui/material'
import Logout from './modules/features/authentication/components/Logout'

const Event = lazy(() => import('./modules/features/events/components/Event'))


function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/otp-verify" element={<OtpVerifyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<AnalyticsDashboard />} />
            <Route path='/events' element={
              <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                  <CircularProgress size={60} sx={{ color: "#319795" }} />
                </Box>
              }>
                <Event/>
              </Suspense>
            }/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
