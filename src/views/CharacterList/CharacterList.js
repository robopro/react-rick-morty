import React from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SearchForm from '../../components/SearchForm/SearchForm';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import CharacterListPagination from '../../components/CharacterListPagination/CharacterListPagination';

const API_URL = 'https://rickandmortyapi.com/api/character/?page=';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pages: 1,
      currentPage: 1,
      characters: [],
      filteredCharacters: [],
      isLoaded: false,
      error: null
    };
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handlePaginationClicked = this.handlePaginationClicked.bind(this);
  }
  
  async fetchCharactersFromAPI(page = 1) {
    try {
      const url = API_URL + page;
      const response = await fetch(url).then(resp => resp.json())
      const pages = response.info.pages;
      const currentPage = response.info.next.split('=')[1] - 1 || pages;

      this.setState({
        pages: pages,
        currentPage: currentPage,
        characters: response.results,
        filteredCharacters: response.results,
        isLoaded: true
      });
    } catch (e) {
      this.setState({
        isLoaded: true,
        error: e
      });
    }
  }
  
  isSubstringCaseInsensitive(name, search) {
    return name.toLowerCase().includes(search.toLowerCase())
  }

  handlePaginationClicked(page) {
    this.setState({
      isLoaded: false
    }, () => this.fetchCharactersFromAPI(page));
  }

  handleSearchChanged(search) {
    const filteredCharacters = this.state.characters.filter(character => this.isSubstringCaseInsensitive(character.name, search));
    this.setState({
      filteredCharacters: filteredCharacters
    });
  }
  
  componentDidMount() {
    this.fetchCharactersFromAPI();  
  }

  render() {
    const { pages, currentPage, filteredCharacters, isLoaded, error } = this.state;

    if (error) {
      return <ErrorMessage error={ error }></ErrorMessage>
    } else if (!isLoaded) {
      return <LoadingSpinner></LoadingSpinner>
    }
      
    const paginationProps = {
      pages: pages,
      currentPage: currentPage,
      paginationClicked: this.handlePaginationClicked
    };
    
    const characterElements = filteredCharacters.map(character => {
      return <CharacterCard character={ character } key={character.id}></CharacterCard>
    });

    return (
      <div className="col-sm-12 col-lg-8 d-flex flex-column align-items-center">
        <CharacterListPagination { ...paginationProps }></CharacterListPagination>
        <SearchForm searchChanged={ this.handleSearchChanged }></SearchForm>
        <div className="w-100 d-flex flex-wrap justify-content-center justify-content-lg-start">
          { characterElements }
        </div>
      </div>
    );
  }
}

export default CharacterList;