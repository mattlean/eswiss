import React from 'react';

class TestComponent extends React.Component {
  render () {
    const style = {color: this.props.color};
    return <div>
      <h1 style={ style }>
        { this.props.title }
      </h1>
      <small>Lorem Ipsum</small>
    </div>;
  }
}

export default TestComponent;
