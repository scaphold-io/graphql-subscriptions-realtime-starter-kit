import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import config from './../config';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App/App';

const networkInterface = createNetworkInterface(config.scapholdUrl);
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    if (localStorage.getItem('token')) {
      req.options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App messageBoardId="NzdkMTliMDYtNTkyZC00MWRlLThlOTctOWZjZDQ1YmU1ZGYxOjNlNzMzNWM1LWFjYWItNGVjOC1hZDFjLWFlYmE2NWNmMTIxNA==" />
  </ApolloProvider>,
  document.getElementById('root')
);
