import React, { useState, useContext, useEffect } from "react";
import { Rating, Card, Image } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import { context } from './../../contextProvider.js';
import { Button, Box, Paper } from '@material-ui/core';
import { Grid } from 'semantic-ui-react';
import CompanyTable from './CompanyTableAux';
import HeaderCompany from "./HeaderCompany";
import '../Graphics/graphics.css';
import  SendIcon  from '@material-ui/icons/Send';
import { useHistory } from "react-router-dom";
import BarChartLayaout from '../Graphics/BarCharLayaout.js';
import { NavLink } from 'react-router-dom';
import GraphicsLayout from "../Graphics/GraphicsLayout";
import complaintContract from '../../complaintContract.json';
import Web3 from 'web3';
import * as constants from './../../constantFile.js';


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

/*
//Si todavia no se ha conectado con Metamask entonces aparece un popup para la conexion
const infuraUrl = constants.INFURA_URL;
//Crea una instancia para comunicarse con el nodo indicado
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
//Nos conectamos con el contrato
const contract = new web3.eth.Contract(complaintContract.abi, constants.CONTRACT_ADDRESS);
*/

const Company = ({ match }) => {

  const [complaints, setComplaints] = useState([]);
  const nameCompany = match.params.id; //Obtener el nomrbe de la empresa de la url de la pagina
  const Context = React.useContext(context);
  const classes = useStyles();
  
  useEffect(() => {
    Context.contract.methods.getComplaints(nameCompany).call().then(response => setComplaints(response));
  },[]);

  return (
    <div className={classes.root}>
      <Grid>
        <Grid.Row>
          <Grid.Column width = {16}>
            <HeaderCompany name = {nameCompany}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <NavLink to={`/company/${ nameCompany }/form`}>
              <Button className = {classes.button} variant="contained" endIcon={<SendIcon />}>Denunciar</Button>
            </NavLink>
          </Grid.Column> 
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width = {0.5}/>
            <Grid.Column width = {9}>
              <Grid.Row>
                <Grid.Column width = {1} ></Grid.Column>
                <Grid.Column margin = {2} width = {7} >
                  <CompanyTable complaints = {complaints}/>
                </Grid.Column>
                <Grid.Column width = {1} >
                </Grid.Column>
              </Grid.Row>
              <p></p>
              <Grid.Row width = {10} >
                <Grid.Column width = {1}></Grid.Column>
                <Grid.Column width = {8} >
                  <BarChartLayaout titulo="Denuncias por género"/>
                </Grid.Column> 
                <Grid.Column width = {1} ></Grid.Column>
                            
              </Grid.Row>
              </Grid.Column>
                      <Grid.Column width = {5}>
                        <Grid.Row>
                            <Grid.Column width = {1} >
                                
                            </Grid.Column>
                            <Grid.Column width = {4} >
                              <GraphicsLayout/> 
                            </Grid.Column>
                            <Grid.Column width = {1} >
                                    
                            </Grid.Column>
                                
                        </Grid.Row>
                        <p></p>
                        <Grid.Row>
                            <Grid.Column width = {1} >
                                
                            </Grid.Column>
                            <Grid.Column width = {4} >
                              <GraphicsLayout/> 
                            </Grid.Column>
                            <Grid.Column width = {1} >
                                    
                            </Grid.Column>
                                
                        </Grid.Row>

                      </Grid.Column>
                      <Grid.Column width = {0.5}/>
                </Grid.Row>
                </Grid>
    </div>);
}
export default Company;


/*
<Grid>
        <Grid.Row>
          <Grid.Column width = {16}>
            <HeaderCompany name = {nameCompany}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <NavLink to={`/company/${ nameCompany }/form`}>
            <Button className = {classes.button} variant="contained" endIcon={<SendIcon />}>Denunciar</Button>
            </NavLink>
          </Grid.Column> 
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width = {0.5}/>
            <Grid.Column width = {9}>
              <Grid.Row>
                <Grid.Column width = {1} ></Grid.Column>
                <Grid.Column margin = {2} width = {7} >
                  <CompanyTable complaints = {complaints}/>
                </Grid.Column>
                <Grid.Column width = {1} >
                </Grid.Column>
              </Grid.Row>
              <p></p>
              <Grid.Row width = {10} >
                <Grid.Column width = {1}></Grid.Column>
                <Grid.Column width = {8} >
                  <BarChartLayaout titulo="Denuncias por género"/>
                </Grid.Column> 
                <Grid.Column width = {1} ></Grid.Column>
                            
              </Grid.Row>
              </Grid.Column>
                      <Grid.Column width = {5}>
                        <Grid.Row>
                            <Grid.Column width = {1} >
                                
                            </Grid.Column>
                            <Grid.Column width = {4} >
                              <GraphicsLayout/> 
                            </Grid.Column>
                            <Grid.Column width = {1} >
                                    
                            </Grid.Column>
                                
                        </Grid.Row>
                        <p></p>
                        <Grid.Row>
                            <Grid.Column width = {1} >
                                
                            </Grid.Column>
                            <Grid.Column width = {4} >
                              <GraphicsLayout/> 
                            </Grid.Column>
                            <Grid.Column width = {1} >
                                    
                            </Grid.Column>
                                
                        </Grid.Row>

                      </Grid.Column>
                      <Grid.Column width = {0.5}/>
                </Grid.Row>
                </Grid>
    </div>
    */
