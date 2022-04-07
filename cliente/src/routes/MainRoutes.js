import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const Form=Loadable(lazy(() => import('views/dashboard/formu-denuncia')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/views/pages/tfg-info',
            element: <Form/>
        },
        {
            path: '/views/dashboard/formu-denuncia', //esto es lo que saldra
            element: <Form />
        }
    ]
};

export default MainRoutes;
