import React from 'react';
import edit_icon from '../img/edit.svg';
import delete_icon from '../img/delete.svg';
import arrow_icon from '../img/arrow.svg';
import './Table.css';
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
                phoneNumber: '',
            },
            editFormErrors: {
                name: '',
                email: '',
                phoneNumber: '',
            },
            nameValid: false,
            emailValid: false,
            phoneNumberValid: false,
            editNameValid: false,
            editEmailValid: false,
            editPhoneNumberValid: false,
            formValid: true,
            editFromValid: true,
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
            editing: false,
            editId: '',
            editName: '',
            editEmail: '',
            editPhoneNumber: ''
        };

        this.addParticipant = this.addParticipant.bind(this);
        this.editParticipant = this.editParticipant.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        let editFieldValidationErrors = this.state.editFormErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let phoneNumberValid = this.state.phoneNumberValid;
        let editNameValid = this.state.editNameValid;
        let editEmailValid = this.state.editEmailValid;
        let editPhoneNumberValid = this.state.editPhoneNumberValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '' : 'name is too short';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'email adress is invalid';
                break;
            case 'phoneNumber':
                phoneNumberValid = value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/);
                fieldValidationErrors.phoneNumber = phoneNumberValid ? '' : 'phone number is invalid';
                break;
            case 'editName':
                editNameValid = value.length >= 6;
                editFieldValidationErrors.name = editNameValid ? '' : 'name is too short';
                break;
            case 'editEmail':
                editEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                editFieldValidationErrors.email = editEmailValid ? '' : 'email adress is invalid';
                break;
            case 'editPhoneNumber':
                editPhoneNumberValid = value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/);
                editFieldValidationErrors.phoneNumber = editPhoneNumberValid ? '' : 'phone number is invalid';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            editFormErrors: editFieldValidationErrors,
            nameValid: nameValid,
            editNameValid: editNameValid,
            emailValid: emailValid,
            editEmailValid: editEmailValid,
            phoneNumberValid: phoneNumberValid,
            editPhoneNumberValid: editPhoneNumberValid}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.emailValid && this.state.phoneNumberValid});
        this.setState({editFormValid: this.state.editNameValid && this.state.editEmailValid && this.state.editPhoneNumberValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error')
    }

    handleCancel(e) {
        e.preventDefault();

        let editFormErrors = this.state.editFormErrors;
        editFormErrors.name = editFormErrors.email = editFormErrors.phoneNumber = '';

        this.setState({editing: false});
        this.setState({editFormErrors: editFormErrors});
        this.setState({
            editNameValid: true,
            editEmailValid: true,
            editPhoneNumberValid: true});
    }

    deleteRow(item) {
        let participants = this.state.participants;
        let index = participants.findIndex(({id}) => id === item.id);
        participants.splice(index, 1);
        this.setState(participants);
    }

    editRow(item) {
        this.setState({editing: true});
        this.setState({
            editId: item.id,
            editName: item.name,
            editEmail: item.email,
            editPhoneNumber: item.phoneNumber
        })
    }


    updateParticipant(e) {
        e.preventDefault();

        if (!this.state.editFormValid) {
            //
        } else {
            let participants = this.state.participants;
            let index = participants.findIndex(({id}) => id === this.state.editId);

            participants[index] = {
                name: this.state.editName,
                email: this.state.editEmail,
                phoneNumber: this.state.editPhoneNumber
            };

            this.setState(participants);

            this.setState({editing: false});
        }
    }

    sortItems(key) {
        this.setState({
            participants:this.state.participants.sort((a, b) => (
                this.state.sort[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
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

        if (!this.state.formValid) {
            //
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

    editParticipant() {
        return (
            <form class="form">
                <div>
                    <input type="text" name="editName" className="form-control"
                            onChange = {(e) => this.change(e)}
                            value = {this.state.editName} />
                    <div>
                        <span className="error-msg">{this.state.editFormErrors.name}</span>
                    </div>
                </div>
                <div>
                    <input type="text" name="editEmail" className="form-control"
                           onChange = {(e) => this.change(e)}
                           value = {this.state.editEmail} />
                    <div>
                        <span className="error-msg">{this.state.editFormErrors.email}</span>
                    </div>
                </div>
                <div>
                    <input type="text" name="editPhoneNumber" className="form-control"
                           onChange = {(e) => this.change(e)}
                           value = {this.state.editPhoneNumber} />
                    <div>
                        <span className="error-msg">{this.state.editFormErrors.phoneNumber}</span>
                    </div>
                </div>
                <button type="button" className = "btn-save" onClick={(e) => {this.updateParticipant(e)}}>Save</button>
                <button type="button" className = "btn-cancel"
                        onClick={(e) => {this.handleCancel(e)}}>Cancel</button>
            </form>
        )
    }

    render() {
        return (
            <div>
                <h1 className="heading">List of participants</h1>
                <div>
                    <div className="form-main">
                        <form onSubmit={this.addParticipant} className="form">
                            <div className={this.errorClass(this.state.formErrors.name)}>
                                <input type="text"
                                       required
                                       className="form-control"
                                       name="name"
                                       value={this.state.name}
                                       placeholder="Full name"
                                       onChange = {(event) => this.change(event)}
                                />
                                <div>
                                    <span className="error-msg">{this.state.formErrors.name}</span>
                                </div>
                            </div>
                            <div className={this.errorClass(this.state.formErrors.email)}>
                                <input type="text"
                                       required
                                       className="form-control"
                                       name="email"
                                       value={this.state.email}
                                       placeholder="E-mail address"
                                       onChange = {(event) => this.change(event)}
                                />
                                <div>
                                    <span className="error-msg">{this.state.formErrors.email}</span>
                                </div>
                            </div>
                            <div className={this.errorClass(this.state.formErrors.phoneNumber)}>
                                <input type="text"
                                       required
                                       className="form-control"
                                       name="phoneNumber"
                                       value={this.state.phoneNumber}
                                       placeholder="Phone number"
                                       onChange = {(event) => this.change(event)}
                                />
                                <div>
                                    <span className="error-msg">{this.state.formErrors.phoneNumber}</span>
                                </div>
                            </div>
                            <button className="btn-add" type="submit">Add new</button>
                        </form>
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => this.sortItems('name')}>
                            <div className="header-item">
                                <span>Name</span>
                                <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['name']} className={this.state.sort["name"] === "asc" ? "sortDown" : "sortUp"} />
                            </div>
                        </th>
                        <th onClick={() => this.sortItems('email')}>
                            <div className="header-item">
                                <span>E-mail address</span>
                                <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['email']} className={this.state.sort["email"] === "asc" ? "sortDown" : "sortUp"} />
                            </div>
                        </th>
                        <th onClick={() => this.sortItems('phoneNumber')}>
                            <div className="header-item">
                                <span>Phone number</span>
                                <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['phoneNumber']} className={this.state.sort["phoneNumber"] === "asc" ? "sortDown" : "sortUp"} />
                            </div>
                        </th>
                        <th width="100"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.participants.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <div className="item">
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="item">
                                        <span>{item.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="item">
                                        <span>{item.phoneNumber}</span>
                                    </div>
                                </td>
                                <td>
                                    <span>
                                        <img src={delete_icon} alt="delete" className="actionIcon" onClick={() => this.deleteRow(item)}/>
                                    </span>
                                    <span>
                                        <img src={edit_icon} alt="edit" className="actionIcon" onClick={() => this.editRow(item)}/>
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div hidden={!this.state.editing}>
                    {
                        this.editParticipant()
                    }
                </div>
            </div>
        );
    }
}

export default Table;