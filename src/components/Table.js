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
            scripts: [],
            name: '',
            url: '',
            description: '',
            isSorted: {
                name: false,
                url: false,
            },
            sort: {
                name: 'asc',
                url: 'asc',
            },
            editing: false,
        };

        this.addScript = this.addScript.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.sortItems = this.sortItems.bind(this);
    }


    componentDidMount() {
        const scripts = [];

        // Create randomized participant data
        for (let i = 0; i < 20; i++) {
            const id = chance.guid();
            const name = chance.file();
            const url = chance.url();

            scripts.push({ id, name, url });
        }

        this.setState({ scripts });
    }

    change(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        });
    }

    handleCancel(e) {
        e.preventDefault();
    }

    deleteRow(item) {
        let scripts = this.state.scripts;
        let index = scripts.findIndex(({id}) => id === item.id);
        scripts.splice(index, 1);
        this.setState(scripts);
    }

    editRow(item) {
        this.setState({editing: true});
    }


    updateParticipant(e) {
    }

    sortItems(key) {
        this.setState({
            scripts:this.state.scripts.sort((a, b) => (
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

    addScript(e) {
        e.preventDefault();

        let newScript = {
            id: chance.guid(),
            name: this.state.name,
            url: this.state.url,
        };

        let scripts = this.state.scripts;
        scripts.push(newScript);
        this.setState(scripts);

        this.setState({
            name: '',
            url: '',
        });
}

    render() {
        return (
            <div>
                <h1 className="heading">Script Repository</h1>
                <div>
                    <div className="form-main">
                        <form onSubmit={this.addScript} className="form">
                            <div>
                                <input type="text"
                                       required
                                       className="form-control"
                                       name="name"
                                       value={this.state.name}
                                       placeholder="Script name"
                                       onChange = {(event) => this.change(event)}
                                />
                            </div>
                            <div>
                                <input type="text"
                                       required
                                       className="form-control"
                                       name="email"
                                       value={this.state.url}
                                       placeholder="Script URL"
                                       onChange = {(event) => this.change(event)}
                                />
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
                                <span>Script Name</span>
                                <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['name']} className={this.state.sort["name"] === "asc" ? "sortDown" : "sortUp"} />
                            </div>
                        </th>
                        <th onClick={() => this.sortItems('email')}>
                            <div className="header-item">
                                <span>Script URL</span>
                                <img src={arrow_icon} alt="sort" hidden={!this.state.isSorted['email']} className={this.state.sort["url"] === "asc" ? "sortDown" : "sortUp"} />
                            </div>
                        </th>
                        <th width="100"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.scripts.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <div className="item">
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="item">
                                        <span>{item.url}</span>
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

                </div>
            </div>
        );
    }
}

export default Table;