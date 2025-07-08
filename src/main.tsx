import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplify_outputs.json'; // Ensure this path is correct

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
