import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { useTasks } from './hooks/useTasks';
import NavigationBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { toasts, removeToast } = useTasks();
  const navigate = useNavigate();

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);
  const handleCloseSidebar = () => setShowSidebar(false);

  // Helper to determine toast icons
  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return 'check-circle-fill';
      case 'warning': return 'exclamation-triangle-fill';
      case 'danger': return 'x-circle-fill';
      case 'info':
      default:
        return 'info-circle-fill';
    }
  };

  // Keyboard Shortcuts: Shift+N (Create), Shift+D (Dashboard), Shift+A (All Tasks)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in form controls
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.shiftKey) {
        switch (e.key.toUpperCase()) {
          case 'N':
          case 'C':
            e.preventDefault();
            navigate('/add');
            break;
          case 'D':
            e.preventDefault();
            navigate('/');
            break;
          case 'A':
            e.preventDefault();
            navigate('/tasks');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="app-container">
      {/* Navbar */}
      <NavigationBar onToggleSidebar={handleToggleSidebar} />

      {/* Main Core Shell */}
      <div className="app-main">
        {/* Sidebar Navigation */}
        <Sidebar show={showSidebar} onClose={handleCloseSidebar} />

        {/* Content Outlet Panel */}
        <main className="content-wrapper">
          <AppRoutes />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Toast Notifications Stack */}
      <div className="custom-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`custom-toast toast-${toast.type} shadow`}>
            <div className="d-flex align-items-center gap-2">
              <i className={`bi bi-${getToastIcon(toast.type)} fs-5 text-${toast.type}`}></i>
              <span className="fw-semibold text-dark" style={{ fontSize: '0.85rem' }}>
                {toast.message}
              </span>
            </div>
            <button
              type="button"
              className="btn-close ms-3"
              onClick={() => removeToast(toast.id)}
              style={{ fontSize: '0.65rem' }}
              aria-label="Close"
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </BrowserRouter>
  );
};

export default App;
