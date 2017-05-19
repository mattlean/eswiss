import React from 'react';
import ParentTestComponent from './ParentTestComponent';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Empty ParentTestComponent snapshot', () => {
  const component = shallow(<ParentTestComponent />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
