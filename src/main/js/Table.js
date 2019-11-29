import React from 'react';
import edit_icon from '../img/edit.svg';
import delete_icon from '../img/delete.svg';
import arrow_icon from '../img/arrow.svg';
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
            formErrors: {
                name: '',
                email: '',
                phoneNumber: ''
            },
            nameValid: false,
            emailValid: false,
            phoneNumberValid: false,
            formValid: true,
            isSorted: {
                name: false,
                email: false,
                phoneNumber: false
            },
            sort: {
                name: 'asc',
                email: 'asc',
                phoneNumber: 'asc'
            },
        };
        this.addParticipant = this.addParticipant.bind(this);
        this.sortItems = this.sortItems.bind(this);
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
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        }, () => {this.validateField(name, value)});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let phoneNumberValid = this.state.phoneNumberValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '' : ' is too short';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'phoneNumber':
                phoneNumberValid = value.match(/^(?=.*[0-9])[- +()0-9]+$"]/i);
                fieldValidationErrors.phoneNumber = phoneNumberValid ? '' : ' is invalid'
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            emailValid: emailValid,
            phoneNumberValid: phoneNumberValid}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.emailValid && this.state.phoneNumberValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error')
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

    sortItems(key) {
        this.setState({
            participants:this.state.participants.sort((a, b) => (
                this.state.sort[key] === "asc" ? a[key] < b[key] : a[key] > b[key]
            )),
            sort: {
                [key] : this.state.sort[key] === "asc" ? "desc" : "asc"
            },
            isSorted: {
                [key] : true
            }
        });
    }

    addParticipant(e) {
        e.preventDefault();

        if (this.state.formValid) {
        } else {
            let newParticipant = {
                id: chance.guid(),
                name: this.state.name,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber
            };

            let participants = this.state.participants;
            participants.push(newParticipant);
            this.setState(participants);

            this.setState({
                name: '',
                email: '',
                phoneNumber: ''
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="heading">List of participants</h1>
                <div>
                    <form onSubmit={this.addParticipant}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                                            <input type="text"
                                                   required
                                                   className="form-control"
                                                   name="name"
                                                   value={this.state.name}
                                                   placeholder="Full name"
                                                   onChange = {(event) => this.change(event)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                            <input type="text"
                                                   required
                                                   className="form-control"
                                                   name="email"
                                                   value={this.state.email}
                                                   placeholder="E-mail address"
                                                   onChange = {(event) => this.change(event)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.phoneNumber)}`}>
                                            <input type="text"
                                                   required
                                                   className="form-control"
                                                   name="phoneNumber"
                                                   value={this.state.phoneNumber}
                                                   placeholder="Phone number"
                                                   onChange = {(event) => this.change(event)}
                                            />
                                        </div>
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
                        <th onClick={() => this.sortItems('name')}>
                            <span>Name</span>
                            <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['name']} className={this.state.sort["name"] === "asc" ? "sortDown" : "sortUp"} />
                        </th>
                        <th onClick={() => this.sortItems('email')}>
                            <span>E-mail address</span>
                            <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['email']} className={this.state.sort["email"] === "asc" ? "sortDown" : "sortUp"} />
                        </th>
                        <th onClick={() => this.sortItems('phoneNumber')}>
                            <span>Phone number</span>
                            <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['phoneNumber']} className={this.state.sort["phoneNumber"] === "asc" ? "sortDown" : "sortUp"} />
                        </th>
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