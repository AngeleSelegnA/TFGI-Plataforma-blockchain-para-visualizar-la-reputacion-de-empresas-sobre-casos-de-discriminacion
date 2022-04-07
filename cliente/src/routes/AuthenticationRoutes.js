import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Form= Loadable(lazy(() => import('views/pages/authentication/formu-denuncia')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/formu-denuncia',
            element: <Form />
        },
        {
            path: '/comapny/:id',
            element: <AuthRegister3 />
        },
        {
            path: '/comapny/:id',
            element: <AuthRegister3 />
        }
        
    ]
};

export default AuthenticationRoutes;
