// assets
import { IconDashboard , IconAlertOctagon, IconInfoCircle} from '@tabler/icons';

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
            url: '/views/pages/tfgInfo',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'Denuncia',
            title: 'Formulario Denuncia',
            type: 'item',
            url: '/views/pages/formulario', 
            icon: icons.IconAlertOctagon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
