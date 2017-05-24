import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Breadcrumb from './Breadcrumb';

test('Empty Breadcrumb snapshot', () => {
  const component = shallow(<Breadcrumb />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('ListGroup with listGroupItems.length == 1 snapshot', () => {
  const component = shallow(<Breadcrumb breadcrumbItems={['Item 1']} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});


test('ListGroup with listGroupItems.length > 1 snapshot', () => {
  const component = shallow(<Breadcrumb breadcrumbItems={['Item 1', 'Item 2']} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
