import React from 'react';
import ReactDOM from 'react-dom';

import TestComponent from './TestComponent';
import '../playground/style.css';

ReactDOM.render(
  <TestComponent title="Hello world!!! Yes! Hi! Ello. Yay!" color="lime" />,
  document.getElementById('app')
);
