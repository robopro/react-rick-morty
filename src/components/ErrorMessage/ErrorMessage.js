import React from 'react';

class ErrorMessage extends React.Component {
  render() {
    return (
      <div>Error: { this.props.error.message }</div>
    );
  }
}

export default ErrorMessage;