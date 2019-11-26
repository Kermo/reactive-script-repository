import React from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';

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

    for (let i = 1; i <= 10; i++) {
      const name = 'Account' + i;
      const value = i;

      data.push({ name, value });
    }

    this.setState({ data });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ReactiveTable;
