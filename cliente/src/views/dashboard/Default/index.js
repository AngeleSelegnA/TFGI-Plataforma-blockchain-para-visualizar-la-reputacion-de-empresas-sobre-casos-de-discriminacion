// prettier-ignore	
import { useEffect, useState } from 'react';
import Web3 from 'web3';

// material-ui
import { Grid } from '@mui/material';
import {CardGroup } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import * as constants from '../../../constantFile';
import complaintContract from '../../../complaintContract.json';
//import BarChartLayaout from '../Graphics/BarCharLayaout.js';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import CompanyItem from './CompanyItem';
import Carousel from 'semantic-ui-carousel-react';

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [reputation, setReputation] = useState([]);
    //Variable y setter para mostrar u ocultar la lista de todas las empresas
    const [showList, setShowList] = useState(false);
    //Desplegar lista de empresas
    const showListF = () => { setShowList(!showList); };
    const [isLoading, setLoading] = useState(true);
    //Unimos reputaciones y empresas
    const cards = companies.map((e, i) => [e, reputation[i]]);

    useEffect(() => {
        setLoading(false);
         //Para conectarse al smart contract
         const infuraUrl = constants.INFURA_URL;

         //Crea una instancia para comunicarse con el nodo indicado
         const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
 
         //Se conectaria con el contrato
         const contract = new web3.eth.Contract(complaintContract.abi, constants.CONTRACT_ADDRESS);
 
         //Obtenemos el array de empresas
         contract.methods.getCompanies().call().then(response => setCompanies(response));
         
         //Obtenemos sus reputaciones
         contract.methods.getReputation().call().then(response => setReputation(response));
         setLoading(false);
    }, []);



    let  elements  = [
		{
            
            render:()=>{
                return (
                    <div class="ui two column grid">
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={1} name={companies[0]} reputation={reputation[0]}/>
                        <div className="column"></div>
                        <CompanyItem key={2} name={companies[1]} reputation={reputation[1]}/>
                        </CardGroup>
                    </div>
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={1} name={companies[0]} reputation={reputation[0]}/>
                        <div className="column"></div>
                        <CompanyItem key={2} name={companies[1]} reputation={reputation[1]}/>
                        </CardGroup>
                    </div>
                    
                    </div>
            
                )
            }
            
		},

        {
            render:()=>{
                return (
                    <div class="ui two column grid">
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={3} name={companies[2]} reputation={reputation[2]}/>
                        <div className="column"></div>
                        <CompanyItem key={4} name={companies[3]} reputation={reputation[3]}/>
            
                        </CardGroup>
                    </div>
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={3} name={companies[2]} reputation={reputation[2]}/>
                        <div className="column"></div>
                        <CompanyItem key={4} name={companies[3]} reputation={reputation[3]}/>
            
                        </CardGroup>
                    </div>
                    
                    </div>
            
                )
            }
        },
        {
            render:()=>{
                return (
                    <div class="ui two column grid">
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={5} name={companies[4]} reputation={reputation[4]}/>
                        <div className="column"></div>
                        <CompanyItem key={6} name={companies[5]} reputation={reputation[5]}/>
                        </CardGroup>
                    </div>
                    <div className="row">
                        <CardGroup itemsPerRow={2}>
                        <div className="column"></div>
                        <CompanyItem key={5} name={companies[4]} reputation={reputation[4]}/>
                        <div className="column"></div>
                        <CompanyItem key={6} name={companies[5]} reputation={reputation[5]}/>
                        </CardGroup>
                    </div>
                    
                    </div>
            
                )
            }
        }
	]

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                        {/*añadir sino aqui los tops en vez de empresas y poner un boton ver empresas*/}
                        <Carousel 
                        isLoading={isLoading}
                        elements = {elements}
                        duration ={3000}
                        animation = 'slide left'
                        showNextPrev = {false}
                        showIndicators = {true}   
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
