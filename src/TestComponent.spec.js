import React from 'react';
import TestComponent from './TestComponent';
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<TestComponent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
