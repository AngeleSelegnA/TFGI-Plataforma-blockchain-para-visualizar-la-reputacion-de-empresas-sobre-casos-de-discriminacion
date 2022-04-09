import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import telefonica from '../../../assets/images/telefonica.png';


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
          <Button basic color='blue' onClick={'/dashboard/formu-denuncia'}>
            Ver empresa
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
CompanyItem.propTypes = {
  isLoading: PropTypes.bool
};


export default CompanyItem;