import React, { Component } from "react";

class NewMatch extends Component {
  state = {
    selectedTeam1: null,
    selectedTeam2: null,
  };

  chooseTeam1 = (index) => {
    const { teams } = this.props;
    const { selectedTeam2 } = this.state;
    const selectedTeam = teams[index];

    this.setState({ selectedTeam1: selectedTeam, selectedTeam2: null });
  };

  chooseTeam2 = (index) => {
    const { teams, onSelectTeams } = this.props;
    const { selectedTeam1 } = this.state;
    const selectedTeam = teams[index];

    this.setState({ selectedTeam2: selectedTeam }, () => {
      onSelectTeams(selectedTeam1, selectedTeam); // Call onSelectTeams with selected teams
    });
  };

  render() {
    const { teams, onStartMatch } = this.props;
    const { selectedTeam1, selectedTeam2 } = this.state;

    return (
      <div className="container text-center">
        <h4>{selectedTeam1 ? "Team 1: " + selectedTeam1 : "Choose Team 1"}</h4>
        {teams.map((team, index) => (
          <button
            className="btn btn-warning m-3"
            onClick={() => this.chooseTeam1(index)}
            key={index}
          >
            {team}
          </button>
        ))}
        <h4>{selectedTeam2 ? "Team 2: " + selectedTeam2 : "Choose Team 2"}</h4>
        {teams.map((team, index) => (
          <button
            className="btn btn-warning m-3"
            onClick={() => this.chooseTeam2(index)}
            key={index}
          >
            {team}
          </button>
        ))}
        <br />
        <button className="btn btn-dark text-white mt-3" onClick={onStartMatch}>
          Start Match
        </button>
      </div>
    );
  }
}

export default NewMatch;
