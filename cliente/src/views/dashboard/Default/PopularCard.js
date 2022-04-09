import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {  CardContent, Grid,  Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import BarChart from './composedChart';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

  
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
                                        <Typography variant="h4">Top 5 Mejor Valoradas</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                                <BarChart colorBarra= {theme.palette.primary[200]} colorLinea={ theme.palette.secondary[200]}/>
                            </Grid>
                            
                        </Grid>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Top 5 Peor Valoradas</Typography>
                                    </Grid>
                                
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                                <BarChart colorBarra= {theme.palette.primary[200]} colorLinea={ theme.palette.secondary[200]}/>
                            </Grid>
                            
                        </Grid>
                     </CardContent>      
                                
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
