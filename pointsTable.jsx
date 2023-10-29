import React, { Component } from "react";

class PointsTable extends Component {
  state = {
    sortedTable: this.props.pointsTable,
    sortedBy: null,
  };

  handleSort = (field) => {
    let { sortedTable, sortedBy } = this.state;

    if (field !== sortedBy) {
      sortedTable.sort((a, b) => {
        if (field === "Team") {
          return a.team.localeCompare(b.team);
        } else if (field === "Played") {
          return b.played - a.played;
        }
        else if (field === "Won") {
          return b.won - a.won;
        }
        else if (field === "Lost") {
          return b.lost - a.lost;
        }
        else if (field === "Drawn") {
          return b.drawn - a.drawn;
        }
        else if (field === "Goals For") {
          return b.goalsFor - a.goalsFor;
        }
        else if (field === "Goals Against") {
          return b.goalAgainst - a.goalAgainst;
        }
        else if (field === "Points") {
          return b.points - a.points;
        }
        return 0;
      });
      sortedBy = field;
    }

    this.setState({ sortedTable, sortedBy });
  };

  render() {
    const { sortedTable } = this.state;

    return (
      <div className="container">
        <div className="row bg-dark text-white text-center">
          <div className="col-2" onClick={() => this.handleSort("Team")}>
            Team
          </div>
          <div className="col-1" onClick={() => this.handleSort("Played")}>
            Played
          </div>
          <div className="col-1" onClick={() => this.handleSort("Won")}>Won</div>
          <div className="col-1" onClick={() => this.handleSort("Lost")}>Lost</div>
          <div className="col-1" onClick={() => this.handleSort("Drawn")}>Drawn</div>
          <div className="col-2" onClick={() => this.handleSort("Goals For")}>Goals For</div>
          <div className="col-2" onClick={() => this.handleSort("Goals Against")}>Goals Against</div>
          <div className="col-2" onClick={() => this.handleSort("Points")}>Points</div>
        </div>
        {sortedTable.map((point) => {
          return (
            <div className="row border border-dark text-center">
              <div className="col-2">{point.team}</div>
              <div className="col-1">{point.played}</div>
              <div className="col-1">{point.won}</div>
              <div className="col-1">{point.lost}</div>
              <div className="col-1">{point.drawn}</div>
              <div className="col-2">{point.goalsFor}</div>
              <div className="col-2">{point.goalAgainst}</div>
              <div className="col-2">{point.points}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PointsTable;
