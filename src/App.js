import React from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="tableBody">
                    <Table />
                </div>
            </div>
        )
    }
}

export default App;