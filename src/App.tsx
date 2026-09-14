import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContentPage } from './pages/ContentPage';
import { ContentDetailPage } from './pages/ContentDetailPage';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { ExperimentDetailPage } from './pages/ExperimentDetailPage';
import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminExperimentsPage } from './pages/admin/AdminExperimentsPage';
import { AdminNotesPage } from './pages/admin/AdminNotesPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="content" element={<ContentPage />} />
              <Route path="content/:slug" element={<ContentDetailPage />} />
              <Route path="experiments" element={<ExperimentsPage />} />
              <Route path="experiments/:slug" element={<ExperimentDetailPage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="notes/:slug" element={<NoteDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin CMS standalone routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="content" element={<AdminContentPage />} />
              <Route path="experiments" element={<AdminExperimentsPage />} />
              <Route path="notes" element={<AdminNotesPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
