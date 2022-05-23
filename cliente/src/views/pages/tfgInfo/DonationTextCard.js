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

const DonationTextCard = ({ isLoading }) => {
    const theme = useTheme();/* eslint-disable */
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

const DonationTextCard = ({ isLoading }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Header as='h1' style={{ "color" : "white" }}>¿Por qué donar?</Header>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#fff'
                                    }}
                                    align='left'
                                    margin = {12}
                                >
                                    <p></p>
                                    
                                    <p color= '#3949ab'>
                                        Publicar la denuncia en la Blockchain no es gratis. Con tu ayuda estás dando voz a los denunciantes.
                                    
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

DonationTextCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DonationTextCard;



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Header as='h1' >¿Por qué donar?</Header>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#fff'
                                    }}
                                    align='left'
                                    margin = {12}
                                >
                                    <p></p>
                                    
                                    <p color= '#3949ab'>
                                        Publicar la denuncia en la Blockchain no es gratis. Con tu ayuda estás dando voz a los denunciantes.
                                    
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

DonationTextCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DonationTextCard;
