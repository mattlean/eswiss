import React from 'react';
import TestComponent from './TestComponent';
import renderer from 'react-test-renderer';

test('Empty TestComponent snapshot', () => {
  const component = renderer.create(<TestComponent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TestComponent with text snapshot', () => {
  const component = renderer.create(<TestComponent text="Blah blah blah!!" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TestComponent with text & color snapshot', () => {
  const component = renderer.create(<TestComponent text="Bob Ross is awesome" color="rebeccapurple" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
