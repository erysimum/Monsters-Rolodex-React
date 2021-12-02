import React from 'react';
import './App.css';
import { CardList } from './component/card-list/card-list.component.jsx';
import { SearchBox } from './component/search-box/search-box.component.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    console.log('this', this); // this is App
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   fetch(`https://jsonplaceholder.typicode.com/users`)
  //     .then((resp) => resp.json())
  //     //resp--> Response object
  //     //resp.json()-->promise
  //     .then((promiseResultArray) => this.setState({ monsters: promiseResultArray }));
  // }

  componentDidMount() {
    const getUsers = async () => {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/users`);
      //resp -->Response object
      const promiseResultArray = await resp.json();

      this.setState({ monsters: promiseResultArray });
    };
    getUsers();
  }

  handleChange(e) {
    this.setState({ searchField: e.target.value });
  }

  render() {
    const { monsters, searchField } = this.state;

    const filteredMonsters = monsters.filter((monster) => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder='search for monster' handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}
export default App;
