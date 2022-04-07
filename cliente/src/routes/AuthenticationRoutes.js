import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const GridForm= Loadable(lazy(() => import('views/dashboard/formu-denuncia')));

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/formu-denuncia',//esto creo que lo que quiero que se vea
            element: <GridForm />
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
