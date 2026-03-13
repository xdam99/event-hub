import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppWrapper } from './modules/app/components/AppWrapper'
import { Layout } from './modules/app/components/Layout'
import { LoginForm } from './modules/features/authentication/components/LoginForm'
import { RegisterForm } from './modules/features/authentication/components/RegisterForm'
import { OtpVerifyPage } from './modules/features/authentication/components/OtpVerifyPage'
import { ProfilePage } from './modules/features/user/components/ProfilePage'
import './App.css'
import { lazy, Suspense } from 'react'
import AnalyticsDashboard from './modules/features/dashboard/ui/AnalyticsDashboard'

const Event = lazy(() => import('./modules/features/events/components/Event'))

//Browerrouter to provide routing
//Routes to provide routes
function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/otp-verify" element={<OtpVerifyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<AnalyticsDashboard />} />
            <Route path='/events' element={
              <Suspense fallback={<div>Loading...</div>}>
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
