import React from 'react';
import ReactDOM from 'react-dom';

import Breadcrumb from './bootstrap_components/Breadcrumb';
import Card from './bootstrap_components/Card';
import ListGroup from './bootstrap_components/ListGroup';

const App = () => <div className="container">
  <div>
    <h1>Breadcrumb</h1>
    <Breadcrumb breadcrumbItems={['abc', 'def', 'ghi']} />
  </div>
  <div>
    <h1>Card</h1>
    <Card content="Poor old tree. I like to beat the brush. You can spend all day playing with mountains. Isn't it great to do something you can't fail at? If you do too much it's going to lose its effectiveness. You could sit here for weeks with your one hair brush trying to do that - or you could do it with one stroke with an almighty brush." header="Hello world!" />
  </div>
  <div>
    <h1>List Group</h1>
    <ListGroup listGroupItems={['123', '456', '789']} />
  </div>
</div>;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
