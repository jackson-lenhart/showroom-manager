import React from 'react';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLookingFor: false
    };

    this.toggleLookingFor = this.toggleLookingFor.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);

    this.customer = props.customer;
    this.salesperson = props.salesperson;
  }

  toggleLookingFor() {
    this.setState(prevState => ({
      showLookingFor: !prevState.showLookingFor
    }));
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    const salespersonData = JSON.parse(e.dataTransfer.getData('salesperson'));
    this.props.customerHelped(this.customer, salespersonData);
  }

  render() {
    const style = {
      customer: {
        position: 'relative',
        border: '1px solid',
        padding: '10px',
        height: '100px'
      },
      salesperson: {
        position: 'absolute',
        top: '10px',
        right: '10px'
      },
      lookingFor: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
      },
      arrow: {
        cursor: 'pointer'
      },
      hidden: {
        display: 'block',
        paddingLeft: '10px',
        paddingTop: '5px'
      }
    };

    const customer = this.customer;
    const showLookingFor = this.state.showLookingFor;
    const salesperson = this.salesperson;

    return (
      <div
        style={style.customer}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div>
          <h3>{customer.name}</h3>
          <p>{customer.notes}</p>
          {
            salesperson ? (
              <p style={style.salesperson}>{salesperson.name}</p>
            ) : ''
          }
          {
            customer.lookingFor ? (
              <div style={style.lookingFor}>
                <span style={style.arrow} onClick={this.toggleLookingFor}>
                  {
                    showLookingFor ? '▼' : '►'
                  }
                </span>
                <span>Looking for</span>
                {
                  showLookingFor ? (
                    <span style={style.hidden}>{customer.lookingFor}</span>
                  ) : ''
                }
              </div>
            ) : ''
          }
        </div>
      </div>
    );
  }
}

export default Customer;
