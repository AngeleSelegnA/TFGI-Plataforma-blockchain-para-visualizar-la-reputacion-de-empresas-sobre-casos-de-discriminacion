import PropTypes from 'prop-types';
import React from 'react';
import {  Card, Image } from 'semantic-ui-react';
import telefonica from '../../../assets/images/telefonica.png';
import { Button} from '@material-ui/core';
import { NavLink } from 'react-router-dom';


const CompanyItem = ({ name, reputation }) => {

  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='small'
          src={telefonica}
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Reputación: <strong>{reputation}</strong></Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
            
            <NavLink to={`/views/pages/company`}>
              <Button  color= "primary"  variant="contained" >Ver empresa</Button>
            </NavLink>
          {/* <Button basic color='blue' onClick={'/pages/company/index'}>
            Ver empresa
          </Button> */}
        </div>
      </Card.Content>
    </Card>
  )
}
CompanyItem.propTypes = {
  isLoading: PropTypes.bool
};


export default CompanyItem;