import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ListGroup from './ListGroup';

test('Empty ListGroup snapshot', () => {
  const component = shallow(<ListGroup />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('ListGroup with listGroupItems.length == 1 snapshot', () => {
  const component = shallow(<ListGroup listGroupItems={['Item 1']} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});


test('ListGroup with listGroupItems.length > 1 snapshot', () => {
  const component = shallow(<ListGroup listGroupItems={['Item 1', 'Item 2']} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
