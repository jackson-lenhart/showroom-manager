import React from "react";
import { render } from "react-dom";
import shortid from "shortid";
import deepCopy from "deep-copy";

import AddSalespersonForm from "./add-salesperson-form";
import AddCustomerForm from "./add-customer-form";
import Available from "./available";
import WithClient from "./with-client";
import Unavailable from "./unavailable";
import Waiting from "./waiting";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      available: [],
      withClient: [],
      unavailable: [],
      waiting: []
    };

    this.addSalesperson = this.addSalesperson.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.removeSalesperson = this.removeSalesperson.bind(this);
    this.moveSalesperson = this.moveSalesperson.bind(this);
    this.moveToUnavailable = this.moveToUnavailable.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/calendars")
      .then(res => res.json())
      .then(calendars =>
        this.setState({
          available: calendars
        })
      ).catch(err => console.error(err));
  }

  addSalesperson(name) {
    this.setState(prevState => ({
      available: prevState.available.concat({ name, id: shortid.generate() })
    }));
  }

  removeSalesperson(id, from) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id)
    }));
  }

  moveSalesperson(id, from, to) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      [to]: prevState[to].concat(prevState[from].find(x => x.id === id))
    }));
  }

  moveToUnavailable(id, from, reason) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      unavailable: prevState.unavailable
        .concat(Object.assign(prevState[from].find(x => x.id === id), { reason }))
    }));
  }

  addCustomer({ name, salesperson, description }) {
    this.setState(prevState => ({
      waiting: prevState.waiting.concat({
        name,
        salesperson,
        description,
        id: shortid.generate()
      })
    }));
  }

  removeCustomer(id) {
    this.setState(prevState => ({
      waiting: prevState.waiting.filter(x => x.id !== id)
    }));
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const style = {
      item: {
        padding: "10px"
      },
      table: {
        padding: "20px"
      },
      header: {
        textAlign: "center"
      },
      row: {
        display: "flex"
      },
      column: {
        flex: "50%"
      }
    };

    return (
      <div>
        <h1 style={style.header}>Showroom Manager</h1>
        <div style={style.row}>
          <div style={style.column}>
            <h2 style={style.header}>Salespeople</h2>
            <AddSalespersonForm
              addSalesperson={this.addSalesperson}
              handleInput={this.handleInput}
            />
            <Available
              available={this.state.available}
              moveSalesperson={this.moveSalesperson}
              removeSalesperson={this.removeSalesperson}
              moveToUnavailable={this.moveToUnavailable}
              handleInput={this.handleInput}
              style={style}
            />
            <WithClient
              withClient={this.state.withClient}
              moveSalesperson={this.moveSalesperson}
              removeSalesperson={this.removeSalesperson}
              moveToUnavailable={this.moveToUnavailable}
              handleInput={this.handleInput}
              style={style}
            />
            <Unavailable
              unavailable={this.state.unavailable}
              handleInput={this.handleInput}
              moveSalesperson={this.moveSalesperson}
              removeSalesperson={this.removeSalesperson}
              style={style}
            />
          </div>
          <div style={style.column}>
            <h2 style={style.header}>Customers</h2>
            <AddCustomerForm
              handleInput={this.handleInput}
              addCustomer={this.addCustomer}
            />
            <Waiting
              waiting={this.state.waiting}
              handleInput={this.handleInput}
              removeCustomer={this.removeCustomer}
              style={style}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);