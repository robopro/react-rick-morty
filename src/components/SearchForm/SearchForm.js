import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class SearchForm extends React.Component {
  state = {
    searchQuery: ''
  };

  onSearchChanged(event) {
    this.setState({
      searchQuery: event.target.value
    }, () => {
      this.props.searchChanged(this.state.searchQuery);
    });
  }

  render() {
    return (
      <Form inline>
        <FormControl 
          type="text" 
          placeholder="Search" 
          className="col-sm-12 col-md-9" 
          value={this.state.searchQuery} 
          onChange={ (event) => this.onSearchChanged(event) }
        />
        <Button 
          variant="info"
          className="col-sm-12 col-md-3" 
          value="" 
          onClick={ (event) => this.onSearchChanged(event) }
        >
          Clear
        </Button>
      </Form>
    );
  }
}

export default SearchForm;