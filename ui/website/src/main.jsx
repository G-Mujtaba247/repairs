import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-center" duration={3000} richColors />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
