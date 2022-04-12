/* eslint-disable */

import React from 'react';
import {  Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Paper, Grid} from '@material-ui/core';
import empresa from 'assets/images/telefonica.png'
import { styled, useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        //margin: '2rem',
        backgroundColor:'#fff  ',
    },
  }));

const HeaderCompany = ({name}) => {
  const classes = useStyles();
  const theme = useTheme();


  return (

  <div>
    <div className="ui grid intro">
        <div className="row">
            <div className="column center aligned">


            <Grid container direction="column">
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item lg={9} xs={8}>
                    <Typography
                              component = {'span'}
                              sx={{
                                  fontSize: '1.4rem',
                                  fontWeight: 500,
                                  color: theme.palette.secondary.dark
                              }}
                              align='left'
                          >
                      <h1 >                 
                        Telefónica
                      </h1>
                    </Typography>
                  </Grid>
                  <Grid item lg={3} xs={8}>
                    <Box 
                              display="flex" 
                              alignItems="center"
                              justifyContent="center"
                          >
                              <img src={empresa} 
                                  alt="logo"
                                  width='90%'
                                  height="90%" 
                              />
                    </Box>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            </div>
        </div>
    </div>
     
  </div>

)
  }

export default HeaderCompany


