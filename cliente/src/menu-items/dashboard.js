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
            url: '/dashboard',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'Denuncia',
            title: 'Denunciar empresa',
            type: 'item',
            url: '/pages/formu-denuncia',
            icon: icons.IconAlertOctagon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
