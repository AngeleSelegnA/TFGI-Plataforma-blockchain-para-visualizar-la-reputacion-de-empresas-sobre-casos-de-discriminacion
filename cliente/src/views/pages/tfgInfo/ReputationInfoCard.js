/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor:  '#fff',
    color: theme.palette.secondary.dark,
    overflow: 'hidden',
    position: 'relative'
}));


// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ReputationInfoCard = ({ isLoading }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4. }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography sx={{ fontSize: '2rem', fontWeight: 800, mr: 1, mt: 1.75, mb: 0.75 }}>
                                    ¿Cómo se calcula la reputación?
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary.dark
                                    }}
                                    align='left'
                                    margin = {12}
                                >
                                    <p></p>
                                    
                                    <p color= '#3949ab'>
                                        La reputación se calcula en base al número de denuncias registradas y a los datos sobre reputación obtenidos en Glassdoor.
                                        A medida que el número de denuncias aumenta, este tiene un mayor peso en el cálculo de la reputación.
                                    
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

ReputationInfoCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ReputationInfoCard;
