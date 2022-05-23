import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// material-ui
import { useTheme } from '@mui/material/styles';
import {  CardContent, Grid,  Box, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
// assets
import CircularGraph from './CircularGraph';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const typesPos = { "Etnia" : 0, "Género" : 1, "Maltrato" : 2, "Edad" : 3, "Religión": 4, "Condición sexual": 5, "Discapacidad": 6, "Mobbing": 7, "Explotación": 8, "Otro": 9}




function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const coloresGenders = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresConsents = ['#0000FF','#FF0000'];
const coloresTypes = [ '#7fb3d5' , '#2980b9' , '#1f618d' , '#154360','#7fb8d5' , '#2960b9' , '#1f718d' , '#134960','#6fb3d5' , '#8980b9'];
const coloresAges = ["#87CEFA", "#00BFFF","#1E90FF","#4169E1","#0000FF","#0000CD","#00008B","#000080", "#191970"];


//IMPORTANTE: DATA DEBE SER [{"category" : ... , "value": x}]
//EN CIRCULARGRAPH YA SE ARREGLA PARA QUE LO LEA LA GRAFICA.
//SE HACE ASI PORQUE EN HOME LOS DATOS SE OBTIENEN DE LA BBDD Y ESTA LOS DEVUELVE ASI



const typesNames = ["etnia", "género", "maltrato", "edad","religión", "condición sexual", "discapacidad", "mobbing", "explotación", "otro"];
const gendersNames = ["femenino", "masculino", "no binario", "otro", "prefiero no responder"];
const consentsNames = ["sí", "no"];
const ageNames = ["16-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "más de 80", "prefiero no responder"];


const ChartsCard = ({ isLoading, complaints }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    
    let typeDicc = {"etnia" : 0, "género" : 0, "maltrato" : 0, "edad" : 0, "religión" : 0, "condición sexual" : 0, "discapacidad" : 0, "mobbing" : 0, "explotación" : 0, "otro" : 0};
    let genderDicc = {"femenino" : 0, "masculino" : 0, "no binario" : 0 , "otro" : 0, "prefiero no responder" : 0};
    let consentDicc = { "sí" : 0 , "no" : 0};
    let ageDicc = { "16-20" : 0, "21-30" : 0, "31-40" : 0, "41-50" : 0, "51-60" : 0, "61-70" : 0, "71-80" : 0, "más de 80" : 0, "prefiero no responder" : 0};

    for(let c of complaints){ //Contruir los diccionarios
        console.log(c);
        //Valores seguros
        typeDicc[c.type.toLowerCase()] += 1;
        if(c.consent){
            consentDicc["sí"] += 1;
        }
        else consentDicc["no"] += 1;

        //Checkear generos:
        if(c.gender == "hombre" || c.gender == "masculino"){
            genderDicc["masculino"] += 1;
        }
        else if(c.gender == "mujer" || c.gender == "femenino"){
            genderDicc["femenino"] += 1;
        }
        else if(c.gender == "no binario"){
            genderDicc["no binario"] += 1;
        }
        else if(c.gender == ""){
            genderDicc["prefiero no responder"] += 1;
        }
        else genderDicc["otro"] += 1;

        //Checkear edades:
        if(c.age != ""){
            let age = parseInt(c.age);
            if(age>=81)
                ageDicc["más de 80"] += 1;
            else if(age>=71)
                ageDicc["71-80"] += 1;
            else if(age>=61)
                ageDicc["61-70"] += 1;
            else if(age>=51)
                ageDicc["51-60"] += 1;
            else if(age>=41)
                ageDicc["41-50"] += 1;
            else if(age>=31)
                ageDicc["31-40"] += 1;
            else if(age>=21)
                ageDicc["21-30"] += 1;
            else
                ageDicc["16-20"] += 1;
        }
        else ageDicc["prefiero no responder"] += 1;
    }

    let dataTypes = [];
    let dataGenders = [];
    let dataConsents = [];
    let dataEdad = [];
    
    for(let elem of typesNames){
        dataTypes.push({
            "category" : elem,
            "value" : typeDicc[elem]
        })
    }

    for(let elem of gendersNames){
        dataGenders.push({
            "category" : elem,
            "value" : genderDicc[elem]
        })
    }
    
    for(let elem of consentsNames){
        dataConsents.push({
            "category" : elem,
            "value" : consentDicc[elem]
        })
    }

    for(let elem of ageNames){
        dataEdad.push({
            "category" : elem,
            "value" : ageDicc[elem]
        })
    }
    
    console.log(dataTypes);
    console.log(dataGenders);
    console.log(dataConsents);
    console.log(dataEdad);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography color = "#2196f3" variant="h4">Gráficas de las denuncias</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable  auto disable tabs example"
                                    >
                                    {/*  OJO, SE HACE DISABLE SI NO HAY DATOS DE ESAS DENUNCIAS  */}  
                                    <Tab label="Nº de cada tipo" {...a11yProps(0) } />
                                    <Tab label="Género" {...a11yProps(1)} />
                                    <Tab label="Edad" {...a11yProps(2)} />
                                    <Tab label="Consentimiento" {...a11yProps(3)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0} >
                                    <CircularGraph ancho={400} alto={400} data = {dataTypes} colores = {coloresTypes}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <CircularGraph ancho={400} alto={400} data = {dataGenders} colores = {coloresGenders}/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <CircularGraph ancho={400} alto={400} data = {dataEdad} colores = {coloresAges}/>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <CircularGraph ancho={400} alto={400} data = {dataConsents} colores = {coloresConsents}/>
                                </TabPanel>
                            </Box>
                                
                            </Grid>
                            
                        </Grid>
                     </CardContent>      
                                
                </MainCard>
            )}
        </>
    );
};

ChartsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ChartsCard;
