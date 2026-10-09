import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext.jsx';
import About from './pages/About.jsx';
import Companies from './pages/Companies.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Leadership from './pages/Leadership.jsx';
import WhatWeDo from './pages/WhatWeDo.jsx';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}
