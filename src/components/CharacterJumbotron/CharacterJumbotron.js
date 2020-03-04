import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './CharacterJumbotron.css';

class CharacterJumbotron extends React.Component {
  render() {
    const character = this.props.character;

    return(
      <Jumbotron className="w-100 d-flex flex-wrap justify-content-around">
        <div className="position-relative mx-3 rounded-circle overflow-hidden">
          <img src={character.image} alt={character.name} />
          <p className={"character-image-status lead font-weight-bold " }>{ character.status }</p>
        </div>
        <div>
          <h1 className="display-4">{ character.name }</h1>
          <p className="lead border-bottom border-dark">{`${character.species} - ${character.gender}`}</p>
          <div className="">
            <p className="font-weight-bold mb-0">Origin:</p>
            <p>{character.origin.name}</p>
          </div>
          <div className="border-top">
            <p className="font-weight-bold mb-0">Last Known Location:</p>
            <p>{character.location.name}</p>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

export default CharacterJumbotron;