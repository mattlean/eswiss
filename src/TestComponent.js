import React from 'react';

class TestComponent extends React.Component {
  render () {
    const style = {color: this.props.color};
    return <p style={ style }>
      { this.props.text }
    </p>;
  }
}

export default TestComponent;
