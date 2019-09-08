import React from "react";

export default class LaneHeader extends React.Component {
  render() {
  	const { lane } = this.props;
    return (
      <div>
        <b>{lane.id}</b> ({lane.cards.length}/
        {lane.total_count})
      </div>
    );
  }
}
