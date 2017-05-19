import React from 'react';
import ParentTestComponent from './ParentTestComponent';
import renderer from 'react-test-renderer';

test('ParentTestComponent snapshot', () => {
  const component = renderer.create(<ParentTestComponent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});