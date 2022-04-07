// assets
import { IconDashboard } from '@tabler/icons';
import { IconAlertOctagon } from '@tabler/icons';
import { IconInfoCircle } from '@tabler/icons';

// constant
const icons = { IconDashboard , IconAlertOctagon, IconInfoCircle};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Menú',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Inicio',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },

        {
            id: 'tfg info',
            title: 'Nuestro proyecto',
            type: 'item',
            url: '/dashboard/tfg-info',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'Denuncia',
            title: 'Formulario Denuncia',
            type: 'item',
            url: '/dashboard/formu-denuncia', //esto es lo que yo tengo en mi proyecto
            icon: icons.IconAlertOctagon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
