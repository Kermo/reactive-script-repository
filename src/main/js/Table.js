import React from 'react';
import edit_icon from '../img/edit.svg';
import delete_icon from '../img/delete.svg';
import '../css/Table.css';
import Chance from 'chance';

const chance = new Chance();

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            name: '',
            email: '',
            phoneNumber: '',
            sort: {
                name: 'asc',
                email: 'asc',
                phone: 'asc'
            },
        };
        this.addParticipant = this.addParticipant.bind(this);
    }


    componentDidMount() {
        const participants = [];

        // Create randomized participant data
        for (let i = 0; i < 20; i++) {
            const id = chance.guid();
            const name = chance.name();
            const email = chance.email();
            const phoneNumber = chance.phone();

            participants.push({ id, name, email, phoneNumber });
        }

        this.setState({ participants });
    }

    change(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    deleteRow(item) {
        let participants = this.state.participants;
        let index = participants.findIndex(({id}) => id === item.id);
        participants.splice(index, 1);
        this.setState(participants);
    }

    editRow(item) {
        //
    }

    addParticipant(e) {
        e.preventDefault();

        let newParticipant = {
            id : chance.guid(),
            name : this.state.name,
            email : this.state.email,
            phoneNumber : this.state.phoneNumber
        };

        let participants = this.state.participants;
        participants.push(newParticipant);
        this.setState(participants)

        this.setState( {
            name : '',
            email : '',
            phoneNumber: ''
        });
    }

    render() {
        return (
            <div>
                <h1>List of participants</h1>
                <div>
                    <form onSubmit={this.addParticipant}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                               className="form-control"
                                               name="name"
                                               value={this.state.name}
                                               placeholder="Enter Name"
                                               onChange = {(event) => this.change(event)}
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                               className="form-control"
                                               name="email"
                                               value={this.state.email}
                                               placeholder="Enter Email"
                                               onChange = {(event) => this.change(event)}
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                               className="form-control"
                                               name="phoneNumber"
                                               value={this.state.phoneNumber}
                                               placeholder="Enter Phone"
                                               onChange = {(event) => this.change(event)}
                                        />
                                    </td>
                                    <td>
                                        <button type="submit">Add new</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail address</th>
                        <th>Phone number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.participants.map((item, index) => {
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