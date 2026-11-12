import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// ── Lazy-loaded pages (code-split per route) ──────────────────────────────────
const Home               = lazy(() => import('./pages/Home'));
const About              = lazy(() => import('./pages/About'));
const Contact            = lazy(() => import('./pages/Contact'));
const FindTechnician     = lazy(() => import('./pages/FindTechnician'));
const TechnicianProfile  = lazy(() => import('./pages/TechnicianProfile'));
const TechnicianRegister = lazy(() => import('./pages/TechnicianRegister'));
const Auth               = lazy(() => import('./pages/Auth'));
const UserDashboard      = lazy(() => import('./pages/UserDashboard'));
const TechnicianDashboard= lazy(() => import('./pages/TechnicianDashboard'));
const DynamicWebpage     = lazy(() => import('./pages/DynamicWebpage'));
const NotFoundPage       = lazy(() => import('./components/NotFoundPage'));

// ── Full-page loading fallback ────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background" aria-label="Loading page">
    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/"                      element={<Home />} />
          <Route path="/about"                 element={<About />} />
          <Route path="/contact"               element={<Contact />} />
          <Route path="/find-technician"       element={<FindTechnician />} />
          <Route path="/technician-profile/:id"element={<TechnicianProfile />} />
          <Route path="/technician-register"   element={<TechnicianRegister />} />
          <Route path="/auth"                  element={<Auth />} />

          {/* Protected: customer */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute role="customer">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected: technician */}
          <Route
            path="/technician-dashboard"
            element={
              <ProtectedRoute role="technician">
                <TechnicianDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dynamic CMS pages — must be LAST before 404 */}
          <Route path="/:slug" element={<DynamicWebpage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
