import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import { Home } from './components/containers/home/home';
import {Products} from './components/containers/products/products';
import { apiDrinks } from './config/services';
import { Route, Switch } from 'react-router-dom'
import './App.css';


export const App = () => {

  const client = new ApolloClient({
    uri: apiDrinks
  });

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/products" component={Products}/>
      </Switch>
    </ApolloProvider>

  );
}

export default App;
