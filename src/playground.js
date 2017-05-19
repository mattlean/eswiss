import React from 'react';
import ReactDOM from 'react-dom';

import ParentTestComponent from './ParentTestComponent';
import '../playground/style.css';

ReactDOM.render(
  <ParentTestComponent color="lime" />,
  document.getElementById('app')
);
