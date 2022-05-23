/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import {  Header } from 'semantic-ui-react'

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TextCard = ({ isLoading }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                            <Grid item margin = '1.5rem 1.2rem'>
                                <Header as='h1' style={{ "color" : "white" }}>Descripción del Proyecto</Header>
                            </Grid>
                            
                            <Grid item xs={12} margin = '0 1.2rem'>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        color: '#fff'
                                    }}
                                    align='left'
                                >
                                    <p >
                                        Hoy en día, por desgracia aún está muy presente la discriminación en las empresas por sexismo, racismo, homofobia, transfobia, u otras muchas discriminaciones. Esta situación lleva a casos de mobbing o acoso contra empleados/as. 
                                    
                                    </p>
                                    <p >
                                        ¿Cómo saber antes de entrar si una empresa tiene un historial problemático de discriminación? Este TFG va a explorar el potencial de la tecnología blockchain para crear una plataforma transparente y no censurable, que permita a las personas conocer la reputación de empresas antes de aceptar trabajar para ellas. A través de esta plataforma, se podrán:
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} margin = '0 7rem '>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: 400,
                                        color: '#fff'
                                    }}
                                    align='left'
                                >
                                    
                                    <p >
                                        1. Buscar denuncias a entidades por discriminaciones sociales (por edad, género, etnia, nacionalidad, orientación sexual, etc)
                                    </p>
                                    <p >
                                        2. Realizar denuncias anónimas compartiendo relatos sobre situaciones vividas
                                    </p>
                                    <p >
                                        3. Aportar información de la propia empresa sobre sus esfuerzos para paliar la discriminación
                                    </p>
                                    <p >
                                        4. Proporcionar la reputación acumulada de las empresas con la información disponible
                                    </p>
                                </Typography>

                            </Grid>
                            
                            
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TextCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TextCard;
