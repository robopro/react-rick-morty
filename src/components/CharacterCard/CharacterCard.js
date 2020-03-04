import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './CharacterCard.css';

class CharacterCard extends React.Component {
  render() {
    const character = this.props.character;

    return (
      <Card className="character-card m-2">
        <Card.Img src={character.image} />
        <Card.ImgOverlay>
          <Card.Link as={Link} 
            to={{
              pathname: '/character/' + character.id,
              // Yes, you _can_ do this. Love it.
              state: {character: character}
            }}
            className="card-overlay d-flex justify-content-center align-items-center"
          >
            <Card.Title className="card-text font-weight-bold text-dark">
              {character.name}
            </Card.Title>
          </Card.Link>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default CharacterCard;