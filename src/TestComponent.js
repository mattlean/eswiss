import React from 'react';

class TestComponent extends React.Component {
  render () {
    const style = {color: this.props.color};
    return <p style={ style }>
      { this.props.text }
      <span>i am ninja</span>
    </p>;
  }
}

export default TestComponent;
