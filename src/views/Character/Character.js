import React from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CharacterJumbotron from "../../components/CharacterJumbotron/CharacterJumbotron";

const API_URL = 'https://rickandmortyapi.com/api/character/';

class Character extends React.Component {
  state = {
    id: this.props.match.params.id,
    character: null,
    isLoaded: false,
    error: null
  };

  async fetchCharacterFromAPI() {
    try {
      const response = await fetch(API_URL + this.state.id).then(resp => resp.json());
      this.setState({
        character: response,
        isLoaded: true
      });
    } catch (e) {
      this.setState({
        isLoaded: true,
        error: e
      });
    }
  }

  componentDidMount() {
    // This ain't perfect, but it's done to test passing objects through router.
    // Not what it's for, but you _can_!
    if (this.props.location.state) {
      this.setState({
        character: this.props.location.state.character,
        isLoaded: true
      });
    } 
    if (!this.state.character) {
      this.fetchCharacterFromAPI();
    }
  }

  render() {
    const { character, isLoaded, error } = this.state;
    
    if (error) {
      return <ErrorMessage error={ error }></ErrorMessage>
    } else if (!isLoaded) {
      return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
      <div className="col-sm-12 col-xl-8 d-flex justify-content-center">
        <CharacterJumbotron character={ character }></CharacterJumbotron>
      </div>
    );
  }
}

export default Character;