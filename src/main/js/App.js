import React from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import Chance from "chance"

const chance = new Chance();

class ReactiveTable extends React.Component {
  state = {
    data: [],
    sort: {
      column: '',
      sort: 'desc',
    },
  };

  componentDidMount() {
    const data = [];

    for(let i = 0; i < 20; i++) {
        const id = chance.guid();
        const name = chance.name();
        const email = chance.email();
        const phoneNumber = chance.phone();

        data.push({id, name, email, phoneNumber})
    }

    this.setState({data})
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ReactiveTable;
