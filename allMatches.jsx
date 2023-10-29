import React, { Component } from "react";

class AllMatches extends Component {
  render() {
    const { AllMatches } = this.props;
console.log(AllMatches);
    return (
      <div className="container text-center">
        {AllMatches.length === 0 ? (
          <h4>There are no matches</h4>
        ) : (
          <div className="container">
            <h4>Results of the matches so far</h4>
            <div className="row bg-dark text-white text-center">
              <div className="col-3">Team 1</div>
              <div className="col-3">Team 2</div>
              <div className="col-3">Score</div>
              <div className="col-3">Result</div>
            </div>
            {AllMatches.map((match) => (
              <div className="row border border-dark text-center">
                <div className="col-3">{match.team1}</div>
                <div className="col-3">{match.team2}</div>
                <div className="col-3">{match.score}</div>
                <div className="col-3">{match.result == "Drawn" ? "Match " + match.result : match.result + " Won"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AllMatches;
