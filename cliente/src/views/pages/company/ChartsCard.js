import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {  CardContent, Grid,  Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import CircularGraph from './CircularGraph';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ChartsCard = ({ isLoading }) => {
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
                                        <Typography variant="h4">Gráfica empresa 1</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                                <CircularGraph />
                            </Grid>
                            
                        </Grid>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Gráfica empresa 2</Typography>
                                    </Grid>
                                
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                                <CircularGraph />
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
