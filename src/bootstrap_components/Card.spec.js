import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Card from './Card';

test('Empty Card snapshot', () => {
  const component = shallow(<Card />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Card with header snapshot', () => {
  const component = shallow(<Card header="Header Text" />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Card with footer snapshot', () => {
  const component = shallow(<Card footer="Footer Text" />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
