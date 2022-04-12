import React from 'react';
import MaterialTable , { MTableToolbar, MTableFilterRow, MTablePagination } from "material-table";
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import {Grid, Button, Box} from '@material-ui/core';



const columns=[
  { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/>,
  cellStyle: {
      backgroundColor: '#FAD7A0',
      color: '#A04000'
    },
    headerStyle: {
        backgroundColor: '#EB984E',
      }
   },
  { title: "Tipo de denuncia", field: "tipoDenuncia" ,
  cellStyle: {
    backgroundColor: '#FAD7A0',
    color: '#A04000'
  },
  headerStyle: {
      backgroundColor: '#EB984E',
    }
  },

  { title: "Fecha", field: "fecha" ,
  cellStyle: {
    backgroundColor: '#FAD7A0',
    color: '#A04000'
  },
  headerStyle: {
      backgroundColor: '#EB984E',
    }
  },

  { title: "Descripción", field: "desc",
  cellStyle: {
      backgroundColor: '#FAD7A0',
      color: '#A04000'
    },
    headerStyle: {
        backgroundColor: '#EB984E',
      }
    },

  {title: "Denunciada antes", field: "reported",  type: "bool",
  cellStyle: {
      backgroundColor: '#FAD7A0',
      color: '#A04000'
    },
    headerStyle: {
        backgroundColor: '#EB984E',
      }
    },
]

const data=[
  {
  tipoDenuncia: "Género",
  fecha: "1/1/2022",
  desc: "Esto será un link",
  reported: true,
  imageUrl: 'https://cdn.pixabay.com/photo/2015/06/20/07/24/color-815547_960_720.png'
  },
  
  {
  tipoDenuncia: "Otro",
  fecha: "3/1/2022",
  desc: "Esto será un link",
  reported: false,
  imageUrl: 'https://www.todofondos.net/wp-content/uploads/fondos-de-colores-fondos-de-pantalla.-fondo-de-pantalla-lisos.jpg'
  },
  {
  tipoDenuncia: "Raza",
  fecha: "1/2/2022",
  desc: "Esto será un link",
  reported: false,
  imageUrl: 'https://cdn.pixabay.com/photo/2015/06/20/07/24/color-815546_960_720.png'
  },
  {
  tipoDenuncia: "Política",
  fecha: "3/11/2021",
  desc: "Esto será un link",
  reported: true,
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzhWS9iJ40wlMrZDIazgd8ilESJIB91r08wjN_FLrExTrtrzbUq8dyggaig3u_bobzuxI&usqp=CAU'
  },
  {
    tipoDenuncia: "Raza",
    fecha: "12/2/2022",
    desc: "Esto será un link",
    reported: true,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/06/20/07/24/color-815546_960_720.png'
    },
  
]

function CompanyTable() {
  return (
    <MaterialTable
      
  />
  );
}

export default CompanyTable