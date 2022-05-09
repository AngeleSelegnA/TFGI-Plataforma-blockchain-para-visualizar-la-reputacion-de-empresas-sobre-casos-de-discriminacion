/* import React, { useState, useContext, useEffect }  from 'react';
import { context } from '../../../contextProvider.js';
import Web3 from 'web3';
import complaintContract from '../../../complaintContract.json';
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
import './graphics.css';

/* import historyItem from './historyItem'
 */import { letterSpacing } from '@mui/system';


const columns=[
  { title: "Tipo de denuncia", field: "tipoDenuncia" ,
  cellStyle: {
    backgroundColor: '#fff',
    color: '#276fe6'
  },
  headerStyle: {
      backgroundColor: '#6da1df ',
    }
  },

  { title: "Fecha", field: "fecha" ,
  cellStyle: {
    backgroundColor: '#fff',
    color: '#276fe6'
  },
  headerStyle: {
      backgroundColor: '#6da1df',
    }
  },

  {title: "Denunciada antes", field: "reported",  type: "bool",
  cellStyle: {
      backgroundColor: '#fff',
      color: '#276fe6'
    },
    headerStyle: {
        backgroundColor: '#6da1df',
      }
    },
]


const CompanyTableAux = ({ complaints }) => {
//const CompanyTable = ({ complaints }) => {

  let data = []

  /* for(let i = 0; i < complaints.length; ++i){
    
    data.push({
      tipoDenuncia: complaints[i].typeC,
      fecha: complaints[i].dateC,
      text: complaints[i].text,
      consent: complaints[i].consent,
      reported: false
    });
  } */

  return (
    <MaterialTable              
      columns = {columns}
      data = {data}
      title = "Lista de denuncias reportadas:"
      colorTitle = '#ede7f6'
      actions = {[
          {
          icon: 'favorite_border',
          tooltip: 'Ver la experiencia',
          /* antes en vez de aler window.confirm para tener aceptar y cancelar */
          onClick: (event, rowData) => {rowData.consent ? alert(rowData.text) : alert("El denunciante no concede permisos para leer su experiencia")}
        },
      ]}
      components={{
           FilterRow: (rowProps) => {
            const { columns, onFilterChanged } = rowProps;
  
            return (
              <>
                <tr style={{color: '#A04000', backgroundColor: '#fff'}}>
                  {columns.map((col) => {
                    if (col.field) {
                      return (
                        <td>
                          <input
                            placeholder="filter" 
                            id={col.field}
                            onChange={(e) => {
                              console.log(e.target.id, e.target.value);
                              onFilterChanged(col.tableData.id, e.target.value);
                            }}
                          />
                        </td>
                      );
                    }
                  })}
                </tr>
              </>
            );
          },
          Action: props => (
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color= {props.data.consent ? "primary" : "secondary"}
              variant="contained"
              textcolor = "fff"
              disabled = {!props.data.consent}
              size="small"
            >
              Leer experiencia
            </Button>
          ),
          Toolbar: props => (
            <div style={{color: 'white', backgroundColor: '#3880d8'}}>
               <MTableToolbar {...props} />
            </div>
          ),
           Pagination: props => (
            <div style={{color: '#fff', backgroundColor: '#fff'}}>
               <MTablePagination {...props} />
            </div>
          ),
         
        }}
      options ={{
          actionsColumnIndex: -1,
   
          headerStyle: {
              width: 56,
              whiteSpace: 'nowrap',
              textAlign: 'left',
              flexDirection: 'row',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingLeft: 5,
              paddingRight: 5,
              backgroundColor: '#6da1df',
              fontWeight: 'bold',
              color: '#FFF'
          },
          sorting: true,
          filtering: true,
          search: true,
      }}
      localization = {{
          header: {
              actions: "Descripción"
              
          },
          
          
      }}
      icons={{
        Filter: () => <FilterListIcon style={{ color: "4f87e4" }} />,
        Search: () => <SearchIcon style={{ color: "white" }} />,
        ResetSearch: () => <Clear style={{ color: "white" }} />,
        FirstPage: () => <FirstPageIcon style={{ color: "blue" }} />,
        LastPage: () => <LastPageIcon style={{ color: "blue" }} />,
        ArrowBack: () => <ArrowBackIcon style={{ color: "blue" }} />,
        ArrowForward: () => <ArrowForwardIcon style={{ color: "blue" }} />,
        PreviousPage: () => <ChevronLeftIcon style={{ color: "blue" }} />,
        NextPage: () => <ChevronRightIcon style={{ color: "blue" }} />,
        SortArrow: () => <ArrowDownward style={{ color: "white" }}/>,
      }}
  />
  );
}

export default CompanyTableAux */