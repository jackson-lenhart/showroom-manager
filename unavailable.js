import React from "react";

import Salesperson from "./salesperson";

class Unavailable extends React.Component {
  render() {
    const style = {
      item: {
        padding: "10px"
      },
      unavailable: {
        padding: "20px"
      }
    };

    let unavailable;
    this.props.unavailable.length === 0 ?
      unavailable = (
        <p>None unavailable.</p>
      ) : unavailable = this.props.unavailable.map(x =>
        <div key={x.id} style={style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            move={this.props.move}
            removeFromQueue={this.props.removeFromQueue}
            from={"unavailable"}
            to={"available"}
            msg={"Mark As Available"}
          />
        </div>
      );

    return (
      <div style={style.unavailable}>
        <h1>Unavailable</h1>
        {unavailable}
      </div>
    );
  }
}

export default Unavailable;
