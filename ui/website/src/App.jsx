import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import DynamicWebpage from './pages/DynamicWebpage'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:slug" element={<DynamicWebpage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
