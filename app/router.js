import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './views/Layout';
import Gallery from './views/Gallery/Gallery';
import CompositionView from './views/CompositionView';

export default function Root() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
          <IndexRoute component={Gallery} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/gallery/composition/:id" component={CompositionView} />
      </Route>
    </Router>
  );
}
