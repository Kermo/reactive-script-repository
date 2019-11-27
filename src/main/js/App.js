import React from "react";
import Header from "./Header";
import Table from "./Table";
import "../css/App.css";

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