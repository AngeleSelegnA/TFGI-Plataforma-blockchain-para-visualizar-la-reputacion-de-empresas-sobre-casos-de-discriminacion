import PropTypes from 'prop-types';
import { useState } from 'react';
import { Image } from 'semantic-ui-react'

import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled } from '@mui/material/styles';
import {  Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'

// project imports
import Button from 'semantic-ui-react';

import ana from 'assets/images/member.png'
import alex from 'assets/images/member.png'
import jorge from 'assets/images/member.png'
import angeles from 'assets/images/member.png'
import david from 'assets/images/member.png'
import javi from 'assets/images/member.png'


// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));


const useStyles = makeStyles((theme) => ({

    button: {
        color: '#bbdefb' , 
        backgroundColor: '#6495ED'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        backgroundColor: '#fff '
    },
  }));

  const info = [
    {
        header: 'Ana Belén Duarte',
        meta: 'Estudiante',
        imageURL: ana
    },
    {
        header: 'Alejandro Ramírez',
        meta: 'Estudiante',
        imageURL: alex
    },
    {
        header: 'Jorge del Valle',
        meta: 'Estudiante',
        imageURL: jorge
    },
    {
        header: 'Ángeles Plaza',
        meta: 'Estudiante',
        imageURL: angeles
    },
    {
        header: 'David Seijas',
        meta: 'Estudiante',
        imageURL: david
    },
    {
        header: 'Javier Verde',
        meta: 'Estudiante',
        imageURL: javi
    }

];

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const MemberCard = ({ i }) => {
    const classes = useStyles();
    return (
/*         <Paper padding = {20} className={classes.paper}>
 */            
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 1 }} margin = {2}>
                        <Typography
                            margin = {2}
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 500,
                                color: '#276fe6 '
                            }}
                            align='center'
                        >
                            {info[i].header}
                        </Typography>
                        <Typography
                            margin = {2}
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: '#4f87e4 '
                            }}
                            align='center'
                        >
                            {info[i].meta}
                        </Typography>
                        <p></p>
                        <Box 
                            margin = {4}
                            display="flex" 
                            alignItems="center"
                            justifyContent="center"
                        >
                            <img src={info[i].imageURL} 
                                alt="logo"
                                width='100'
                                height="100" 
                            />
                        </Box>
                        

                    </Box>
                </CardWrapper>
            
/*         </Paper>
 */    );
};



export default MemberCard;

