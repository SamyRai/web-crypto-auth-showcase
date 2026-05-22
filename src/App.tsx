import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EnvironmentProvider } from './context/EnvironmentContext';
import { AppLayout } from './components/layout';
import { OverviewPage } from './pages/OverviewPage';
import { AuthPage } from './pages/AuthPage';
import { LearnPage } from './pages/LearnPage';
import { EncryptPage } from './pages/EncryptPage';
import { CertChatPage } from './pages/CertChatPage';

function App() {
  return (
    <EnvironmentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/success" element={<Navigate to="/learn" replace />} />
            <Route path="/encrypt" element={<EncryptPage />} />
            <Route path="/cert-chat" element={<CertChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EnvironmentProvider>
  );
}

export default App;
