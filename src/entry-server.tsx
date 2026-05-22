import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { EnvironmentProvider } from './context/EnvironmentContext';
import { AppLayout } from './components/layout';
import { OverviewPage } from './pages/OverviewPage';
import { AuthPage } from './pages/AuthPage';
import { LearnPage } from './pages/LearnPage';
import { EncryptPage } from './pages/EncryptPage';
import { CertChatPage } from './pages/CertChatPage';
import { Routes, Route, Navigate } from 'react-router-dom';

export function render(url: string, base: string) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <EnvironmentProvider>
        <MemoryRouter initialEntries={[url]} basename={base}>
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
        </MemoryRouter>
      </EnvironmentProvider>
    </React.StrictMode>
  );

  return { html };
}
