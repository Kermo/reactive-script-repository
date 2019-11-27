import React from 'react';
import edit_icon from '../img/edit.svg';
import delete_icon from '../img/delete.svg';
import '../css/Table.css';
import Chance from 'chance';

const chance = new Chance();

class Table extends React.Component {
    state = {
        data: [],
        sort: {
            column: '',
            sort: 'desc',
        },
    };

    componentDidMount() {
        const data = [];

        // Create randomized participant data
        for (let i = 0; i < 20; i++) {
            const id = chance.guid();
            const name = chance.name();
            const email = chance.email();
            const phoneNumber = chance.phone();

            data.push({ id, name, email, phoneNumber });
        }

        this.setState({ data });
    }

    deleteRow(item) {
        let participants = this.state.data;
        let index = participants.findIndex(({id}) => id === item.id);
        participants.splice(index, 1);
        this.setState(participants);
    }

    editRow(item) {
        //
    }

    render() {
        return (
            <div>
                <h1>List of participants</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail address</th>
                        <th>Phone number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <span>
                                        <img src={edit_icon} alt="edit" className="actionIcon" onClick={() => this.editRow(item)}/>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <img src={delete_icon} alt="delete" className="actionIcon" onClick={() => this.deleteRow(item)}/>
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;