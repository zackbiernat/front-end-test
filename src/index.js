import React from 'react';
import ReactDOM from 'react-dom';
require('isomorphic-fetch');
//require('es6-promise').polyfill();
import PizzaView from './components/PizzaView';

const pizzaGetter = () => {
  return fetch('/pizza.json').then((response) => response.json());
}
pizzaGetter().then(result => {
  ReactDOM.render(
    <PizzaView pizzaList={result['pizzas']}/>
    ,
    document.getElementsByClassName('content')[0]
  );
})



// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors
