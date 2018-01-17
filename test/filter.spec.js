import React from 'react';
import { expect } from 'code';
import { mount, shallow } from 'enzyme';
import PizzaView from '.././src/components/PizzaView';

describe('Pizza View tests', () => {
  const pizzas = ['one pizza', 'another', 'one more']
  it('should show all Pizzas', () => {
    const wrapper = shallow(<PizzaView pizzaList={pizzas}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });
  it('should have a sort handler', () => {
    const wrapper = shallow(<PizzaView pizzaList={pizzas}/>);
    expect(wrapper.handleSortClick).to.be.defined;
  });
  it('should be able to sort a list', () => {
    const wrapper = mount(<PizzaView pizzaList={pizzas}/>);
    wrapper.instance().handleSortClick();
    expect(wrapper.instance().state.list[0]).to.be.equal('another');
  });
  it('should be able to reverse sort a list', () => {
    const wrapper = mount(<PizzaView pizzaList={pizzas}/>);
    wrapper.instance().handleSortClick();
    wrapper.instance().handleSortClick();
    expect(wrapper.instance().state.list[2]).to.be.equal('another');
  });
  it('should be able to query filter a list', () => {
    const wrapper = mount(<PizzaView pizzaList={pizzas}/>);
    let event = {
      target: {
        value: 'one'
      },
      preventDefault: () => {}
    }
    wrapper.instance().handleQueryChange(event);
    expect(wrapper.instance().state.list).to.have.length(2);
  });
  it('should be able to query without case sensitivity', () => {
    const wrapper = mount(<PizzaView pizzaList={pizzas}/>);
    let event = {
      target: {
        value: 'oNE'
      },
      preventDefault: () => {}
    }
    wrapper.instance().handleQueryChange(event);
    expect(wrapper.instance().state.list).to.have.length(2);
  });
});