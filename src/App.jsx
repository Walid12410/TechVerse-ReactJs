import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/DashboradPage';
import { ToastContainer } from 'react-toastify';
import SettingDashboard from './pages/admin/SettingDashboard';
import ServiceDashboard from './pages/admin/ServiceDashboard';
import MemberDashboard from './pages/admin/MemberDashboard';
import ClientDashboard from './pages/admin/ClientDashboard';
import AboutUsDashboard from './pages/admin/AboutUsDashboard';
import ServiceFeatureDashboard from './pages/admin/ServiceFeatureDashboard';
import PricingPlanDashboard from './pages/admin/PricingPlanDashboard';
import ProjectViewDashboard from './pages/admin/ProjectViewDashboard';
import MainPage from './pages/user/MainPage/MainPage';
import ServicePage from './pages/user/ServicePage';
import ContactPage from './pages/user/ContactUsPage';
import ProjectPage from './pages/user/ProjectPage';
import NotFound from './pages/NotFound';
import ContactUsDashboard from './pages/admin/ContactUsDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';
import { useEffect } from 'react';
import LoginPage from './pages/admin/Login';
import PrivateRoute from './component/layout/PrivateRoute';  // <-- Import PrivateRoute
import { Navigate } from 'react-router-dom';
import ProjectDashboard from './pages/admin/ProjectDashboard';
import ProjectDetailDashboard from './pages/admin/ProjectDetailDashboard';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { auth } = useSelector((state) => state.auth);

  return (
    <>
      {/* User Routes */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/project" element={<ProjectPage />} />


        {/* Admin Login Route (Public) */}
        <Route path='/admin' element={!auth ? <LoginPage /> : <Navigate to="/admin/dashboard" />} />

        {/* Admin Routes (Protected by PrivateRoute) */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        <Route path='/admin/settings' element={
          <PrivateRoute><SettingDashboard /></PrivateRoute>
        } />
        <Route path='/admin/service' element={
          <PrivateRoute><ServiceDashboard /></PrivateRoute>
        } />
        <Route path='/admin/member' element={
          <PrivateRoute><MemberDashboard /></PrivateRoute>
        } />
        <Route path='/admin/client' element={
          <PrivateRoute><ClientDashboard /></PrivateRoute>
        } />
        <Route path='/admin/about-us' element={
          <PrivateRoute><AboutUsDashboard /></PrivateRoute>
        } />
        <Route path='/admin/service-feature' element={
          <PrivateRoute><ServiceFeatureDashboard /></PrivateRoute>
        } />
        <Route path='/admin/pricing-plan' element={
          <PrivateRoute><PricingPlanDashboard /></PrivateRoute>
        } />
        <Route path='/admin/project-view' element={
          <PrivateRoute><ProjectViewDashboard /></PrivateRoute>
        } />
        <Route path='/admin/contact-us' element={
          <PrivateRoute><ContactUsDashboard /></PrivateRoute>
        } />
          <Route path='/admin/project' element={
            <PrivateRoute><ProjectDashboard /></PrivateRoute>
          } />
        <Route path='/admin/project-detail/:id' element={
          <PrivateRoute><ProjectDetailDashboard /></PrivateRoute>
        } />

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
