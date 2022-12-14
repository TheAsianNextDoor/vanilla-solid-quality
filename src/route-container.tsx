import { Routes, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

import { PrivateRoute } from './common/containers/private-route/private-route';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyImport = (fileImport: Promise<any>, componentName: string) => {
  return lazy(() => fileImport.then((module) => ({ default: module[componentName] })));
};

const Dashboard = lazyImport(import('./pages/dashboard/dashboard'), 'Dashboard');
const Login = lazyImport(import('./pages/login/login'), 'Login');
const Template = lazyImport(import('./pages/template/template'), 'Template');
const TemplateEdit = lazyImport(import('./pages/template/edit/template-edit'), 'TemplateEdit');
const Inspection = lazyImport(import('./pages/inspection/inspection'), 'Inspection');
const InspectionEdit = lazyImport(import('./pages/inspection/edit/inspection-edit'), 'InspectionEdit');

export const RouteContainer = () => {
  return (
    <>
      <Routes>
        {/** Private Routes */}
        <Route path="/" element={PrivateRoute}>
          <Route path="dashboard" element={Dashboard} />
          <Route path="template">
            <Route path="/" element={Template} />
            <Route path="/:id" element={TemplateEdit} />
          </Route>
          <Route path="inspection">
            <Route path="/:id">
              <Route path="/" element={Inspection} />
              <Route path="edit" element={InspectionEdit} />
            </Route>
          </Route>
        </Route>

        {/** Public Routes */}
        <Route path="login" element={Login} />
      </Routes>
    </>
  );
};
