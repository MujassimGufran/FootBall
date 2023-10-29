import React, { Component } from "react";
import NewMatch from "./newMatch";
import StartMatch from "./startMatch";
import PointsTable from "./pointsTable";
import AllMatches from "./allMatches";
class MainComponent extends Component {
  state = {
   matches: [],
   teams: ["France","England","Brazil","Germany","Argentina"],
   pointsTable:[
     {team: "France", played : 0, won : 0, lost : 0, drawn : 0, goalsFor : 0, goalAgainst : 0, points : 0,},
     {team: "England", played : 0, won : 0, lost : 0, drawn : 0, goalsFor : 0, goalAgainst : 0, points : 0,},
     {team: "Brazil", played : 0, won : 0, lost : 0, drawn : 0, goalsFor : 0, goalAgainst : 0, points : 0,},
     {team: "Germany", played : 0, won : 0, lost : 0, drawn : 0, goalsFor : 0, goalAgainst : 0, points : 0,},
     {team: "Argentina", played : 0, won : 0, lost : 0, drawn : 0, goalsFor : 0, goalAgainst : 0, points : 0,},
     ],
   view: 0,
   matchStarted: false,
   selectedTeams: [],
  };

  handleMatchOver = (team1, team2, team1Score, team2Score) => {
    const { matches, pointsTable } = this.state;
  console.log(team1, team2, team1Score, team2Score);
    // Determine the winning team or if it's a draw
    let winner;
    let points = 0;
    if (team1Score > team2Score) {
      winner = team1;
      points = points + 3;
    } else if (team1Score < team2Score) {
      winner = team2;
      points = points + 3;
    } else {
      winner = "Drawn";
      points = points + 1;
    }    
  
    // Create the match object
    const match = {
      team1: team1,
      team2: team2,
      score: team1Score+"-"+team2Score,
      result: winner,
    };
  
    // Update the matches array
    const updatedMatches = [...matches, match];
  
    // Update the points table
    const updatedPointsTable = pointsTable.map((point) => {
      if (point.team === team1) {
        return {
          ...point,
          played: point.played + 1,
          goalsFor: point.goalsFor + team1Score,
          goalAgainst: point.goalAgainst + team2Score,
          points: winner === team1 ? point.points + 3 : winner === "Drawn" ? point.points + 1 : point.points,
          // points: winner === "Drawn" ? point.points + 1 : point.points,

          won: winner === team1 ? point.won + 1 : point.won,
          lost: team1Score < team2Score ? point.lost + 1 : point.lost,
          drawn: winner == "Drawn" ? point.drawn + 1 : point.drawn,
        };
      } else if (point.team === team2) {
        return {
          ...point,
          played: point.played + 1,
          goalsFor: point.goalsFor + team2Score,
          goalAgainst: point.goalAgainst + team1Score,
          points: winner === team2 ? point.points + 3 : winner === "Drawn" ? point.points + 1 : point.points,
          // points: winner === team2 ? point.points + 3 : point.points,
          // points: winner === "Drawn" ? point.points + 1 : point.points,

          won: winner === team2 ? point.won + 1 : point.won,
          lost:  team2Score < team1Score ? point.lost + 1 : point.lost,
          drawn: winner == "Drawn" ? point.drawn + 1 : point.drawn,
        };
      } else {
        return point;
      }
    });
  
    // Update the state
    this.setState({
      matches: updatedMatches,
      pointsTable: updatedPointsTable,
      matchStarted: false,
      selectedTeams: [],
    });
  };


handleNewMatch = ()=>{
    let s1 = {...this.state};
    s1.view = 1;
    this.setState(s1);
}
handleStartMatch = () => {
  const { selectedTeams } = this.state;
  if (selectedTeams.length !== 2) {
    alert("Please select both Team 1 and Team 2");
    return;
  }

  if (selectedTeams[0] === selectedTeams[1]) {
    alert("Select different teams");
    return;
  }

  let s1 = { ...this.state };
  s1.matchStarted = true;
  s1.view = 0;
  this.setState(s1);
};

  

handleSelectTeams = (team1, team2) => {
const selectedTeams = [team1, team2];
this.setState({ selectedTeams });
};

handlePointsTable = ()=> {
    let s1 = {...this.state};
    s1.view = 2;
    this.setState(s1);
}

handleAllMatch = ()=> {
    let s1 = {...this.state};
    s1.view = 3;
    this.setState(s1);
}

render() {
    const { matches, teams, view, matchStarted, selectedTeams, pointsTable } = this.state;
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand m-2" href="#">
                Football Tournament
            </a>
            <div className="" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Number of Matches
                            <span className="badge badge-pill bg-primary ">
                                {matches.length}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
 { matchStarted ? "" :
        (
        <React.Fragment>
        <button className="btn btn-primary m-3" onClick={this.handleAllMatch}>All Matches</button>
        <button className="btn btn-primary m-3" onClick={this.handlePointsTable}>Points Table</button>
        <button className="btn btn-primary m-3" onClick={this.handleNewMatch}>New Match</button>
        </React.Fragment>
        )
    }
        {
            view == 1 
            ?
            <NewMatch 
            NewMatch teams={teams}
            onStartMatch={this.handleStartMatch}
            onSelectTeams={this.handleSelectTeams}
            /> 
            :
            view == 2
            ?
            <PointsTable 
            pointsTable = {pointsTable}
            />
            :
            view == 3
            ?
            <AllMatches 
            AllMatches = {matches}
            />
            : ""}
            {matchStarted ? (
          <div className="container text-center">
            <StartMatch 
            selectedTeams={selectedTeams}
            onMatchOver={this.handleMatchOver}
            />
          </div>
        ) : ""}
      </div>
    );
  }  
  
}

export default MainComponent;

