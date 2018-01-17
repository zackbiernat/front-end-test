import React, { Component } from 'react';

export default class PizzaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      list: props.pizzaList,
      isLoading: true,
      isSorted: false
    }
    this.handleSortClick = this.handleSortClick.bind(this);
  }

  handleQueryChange (e) {
    e.preventDefault();
    this.setState({
      query: e.target.value,
      isSorted: false,
      isLoading: true
    });
    let filterList = this.props.pizzaList.filter(name => name.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1);
    this.setState({
      list: filterList,
      isLoading: false
    });
  }

  handleSortClick () {
    this.setState({
      isLoading: true
    });
    if (!this.state.isSorted) {
      let sortList = [...this.state.list].sort();
      this.setState({
        isLoading: false,
        isSorted: true,
        list: sortList
      })
    } else {
      let reverseList = [...this.state.list].reverse();
      this.setState({
        isLoading: false,
        isSorted: false,
        list: reverseList
      })
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading-message">
          Loading
        </div>
      )
    } else {
      return (
        <div className="pizza-view">
          <div className="pizza-list-header">
            Check out our delicious specialty pizzas!
          </div>

          <div className="search-container">
            <input onChange={e => this.handleQueryChange(e)} value={this.state.query} placeholder="Search by name" type="text" />
            <button onClick={this.handleSortClick}>{this.state.isSorted ? "Sort Z->A" : "Sort A->Z"}</button>
          </div>
          <ul>
            {this.state.list.map((name, key) => {
              return (
                <li className="pizza-name" key={key}>
                  {name}
                </li>
              )
            })}
          </ul>
        </div>
      );
    }
  }
}

