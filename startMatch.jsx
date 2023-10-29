import React, { Component } from "react";
class StartMatch extends Component {
  state = {
    team1Goal: 0,
    team2Goal: 0,
  };

  handleMatchOver = () => {
    const { selectedTeams, onMatchOver } = this.props;
    const { team1Score, team2Score,team1Goal, team2Goal } = this.state;
    const team1 = selectedTeams[0];
    const team2 = selectedTeams[1];
    onMatchOver(team1, team2, parseInt(team1Goal), parseInt(team2Goal));
  }
  handleGoalScored = (index) => {
    const { team1Goal, team2Goal } = this.state;

    if (index === 0) {
      this.setState({ team1Goal: team1Goal + 1 });
    } else if (index === 1) {
      this.setState({ team2Goal: team2Goal + 1 });
    }
  };

  // handleMatchOver = () => {
  //   const { selectedTeams, onMatchOver } = this.props;
  //   const { team1Goal, team2Goal } = this.state;

  //   // Call the onMatchOver prop with the match details
  //   onMatchOver(selectedTeams[0], selectedTeams[1], team1Goal, team2Goal);
  // };

  render() {
    const { selectedTeams } = this.props;
    const { team1Goal, team2Goal } = this.state;

    return (
      <div className="container">
        <h2>Welcome to the exciting match</h2>
        <h2>
          {team1Goal}-{team2Goal}
        </h2>
        <div className="row">
          {selectedTeams.map((team, index) => (
            <div className="col-6" key={index}>
              <h4>{team}</h4>
              <button
                className="btn btn-warning"
                onClick={() => this.handleGoalScored(index)}
              >
                Goal Scored
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn btn-warning btn-sm m-4"
          onClick={this.handleMatchOver}
        >
          Match Over
        </button>
      </div>
    );
  }
}
export default StartMatch;
