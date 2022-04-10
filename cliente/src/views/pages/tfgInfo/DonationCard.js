/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';


// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const DonationCard = ({ isLoading }) => {
    const theme = useTheme();
    const [amount, setAmount] = useState(""); //cantidad a donar en ethers


    const handleDonation = async (e) => {
        try{
            if(!window.ethereum) //Para ver si el usuario tiene cartera
                throw new Error("No se encontro cartera de metamask.");
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("enviando transaccion")
            const tx = await signer.sendTransaction({
                to: constants.ADDRESS2,
                value:  ethers.utils.parseEther(amount),
                gasPrice: signer.getGasPrice(),
                gasLimit : 100000
            });
            console.log({tx});
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                                <Grid container alignItems="center">
                                    <Grid item>
                                            <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                108 ether
                                            </Typography>
                                        
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1.1rem',
                                                fontWeight: 800,
                                                color: theme.palette.primary[200]
                                            }}
                                        >
                                            Total Recaudado
                                        </Typography>
                                            
                                    </Grid>
                                    
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

DonationCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DonationCard;
