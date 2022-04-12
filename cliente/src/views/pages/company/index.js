/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';


// material-ui
import { Grid } from '@mui/material';

// project imports
import ReportButtonCard from './ReportButtonCard';
import ReputationCard from './ReputationCard';
import { gridSpacing } from 'store/constant';
import * as constants from '../../../constantFile';
import complaintContract from '../../../complaintContract.json';
import { makeStyles } from '@material-ui/core/styles';
import HeaderCard from './HeaderCard'
import CompanyTable from './CompanyTable'
import ChartsCard from './ChartsCard'
import { Button } from '@material-ui/core';
import  SendIcon  from '@material-ui/icons/Send';
import TableCard from './TableCard'



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.primary.main
    },
  
  
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1000,
    },
    paperTable: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1200,
      backgroundColor: '#bbdefb',
    },
    paperGraphics: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1200,
      backgroundColor: '#bbdefb'
    },
    button: {
      color: '#bbdefb' , 
      backgroundColor: '#6495ED'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
// ==============================|| DEFAULT DASHBOARD ||============================== //

//const Company = ({ match }) => {
     
const Company = () => {

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const [complaints, setComplaints] = useState([]);
    //const nameCompany = match.params.id; //Obtener el nomrbe de la empresa de la url de la pagina
    //const Context = React.useContext(context);
    const classes = useStyles();
  
    /* useEffect(() => {
        Context.contract.methods.getComplaints(nameCompany).call().then(response => setComplaints(response));
    },[]); */

    return (
        // dos filas
        <Grid container spacing={gridSpacing}>
            {/* fila 1 */}
            <Grid item xs={12}>
                {/* 3 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item lg={8} md={6} sm={6} xs={12}>
{/*                         <HeaderCompany name = {nameCompany} isLoading={isLoading} />
 */}                    
                            <HeaderCard name = 'telefonica' isLoading={isLoading} />
                    </Grid>
                        
                    {/* columna 3 */}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        {/* 2 filas en la 3º columna */}
                        <Grid container spacing={gridSpacing}>
                            {/* fila 1 en la 3º columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ReportButtonCard isLoading={isLoading} />
                                 {/* <NavLink to={`/company/${ nameCompany }/form`}>
                                    <Button className = {classes.button} variant="contained" endIcon={<SendIcon />}>Denunciar</Button>
                                </NavLink> */}
                            </Grid>
                            {/* fila 2 en la 3º columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ReputationCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                 {/* 2 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item xs={12} md={8}>
                        <TableCard/>
                    </Grid>
                    {/* columna 2 */}
                    <Grid item xs={12} md={4}>
                        <ChartsCard/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Company;