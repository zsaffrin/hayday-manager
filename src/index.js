import React from 'react';
import { render } from 'react-dom';

import fire from './firebase';
import App from './components/App';

render(<App />, document.getElementById('app'));
