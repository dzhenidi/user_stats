import React from 'react';
import { BarChartUsers } from './bar_chart_users';


export default class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      data: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.parseData = this.parseData.bind(this);
  }

  handleInput(e) {
    this.processFile(e.target.value);
  }

  handleUpload(e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.processFile(fileReader.result);
    };
    if (file) {
      fileReader.readAsText(file);
    }
  }

  processFile(file) {
    let data = JSON.parse(file).results; //array made up of users
    this.setState({
      data: this.parseData(data)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  parseState(users) {
    let stateStats = {};
    users.map( user => {
      switch (user.gender){
        case "female":
          if (stateStats[user.location.state]) {
            stateStats[user.location.state]["female"]++;
            stateStats[user.location.state]["total"]++;
          } else {
            stateStats[user.location.state] = {
              total: 1,
              female: 1,
              male: 0
            };
          }
          break;
        case "male":
          if (stateStats[user.location.state]) {
            stateStats[user.location.state]["male"]++;
            stateStats[user.location.state]["total"]++;
          } else {
            stateStats[user.location.state] = {
              total: 1,
              female: 0,
              male: 1
            };
          }
      }
    });
    return stateStats;
  }

  sortData(stateStats, category, total){
    let stateStatsArr = [];
    for (let state in stateStats) {
      if (stateStats.hasOwnProperty(state)) {
        stateStatsArr.push({
          'key': state,
          'value': stateStats[state][category]
        });
      }
    }
    stateStatsArr.sort((a, b) => {
      return b.value - a.value;
    });

    let stateStatsTopTen = stateStatsArr.slice(0, 10).map( el => el.key);
    let stateStatsSelection = {};
    stateStatsTopTen.forEach( el => {
      // stateStatsSelection[el] = getPercent(stateStats[el][category], total);
      stateStatsSelection[el] = stateStats[el][category];
    });
    return stateStatsSelection;
  }

  parseData(users) {
    // let users = JSON.parse(input).results; //array made up of users
    let stateStats = this.parseState(users);
    let genderCount = {female: 0, male: 0};
    // let genderStats = {female: 0, male: 0};
    let firstNameStats = {"A-M": 0, "N-Z": 0};
    let lastNameStats = {"A-M": 0, "N-Z": 0};
    // let stateStats = {};
    let total = 0;
    users.map( user => {
      genderCount[user.gender]++;
      if (user.name.first[0].toLowerCase() < "n") {
        firstNameStats["A-M"]++;
      } else {
        firstNameStats["N-Z"]++;
      }
      if (user.name.last[0].toLowerCase() < "n") {
        lastNameStats["A-M"]++;
      } else {
        lastNameStats["N-Z"]++;
      }
      // if (stateStats[user.location.state]) {
      //   stateStats[user.location.state]++;
      // } else {
      //   stateStats[user.location.state] = 1;
      // }
      total ++;
    });
    // genderStats.female = getPercent(genderCount.female, total);
    // genderStats.male = getPercent(genderCount.male, total);
    // firstNameStats["A-M"] = getPercent(firstNameStats["A-M"], total);
    // firstNameStats["N-Z"] = getPercent(firstNameStats["N-Z"], total);
    // lastNameStats["A-M"] = getPercent(lastNameStats["A-M"], total);
    // lastNameStats["N-Z"] = getPercent(lastNameStats["N-Z"], total);
    // let stateStatsArr = [];
    // for (let state in stateStats) {
    //   if (stateStats.hasOwnProperty(state)) {
    //     stateStatsArr.push({
    //       'key': state,
    //       'value': stateStats[state]
    //     });
    //   }
    // }
    // stateStatsArr.sort((a, b) => {
    //   return a.value - b.value;
    // });
    // let stateStatsTopTen = stateStatsArr.slice(0, 10).map( el => el.key);
    // let stateStatsSelection = {};
    // stateStatsTopTen.forEach( el => {
    //   stateStatsSelection[el] = getPercent(stateStats[el], total);
    // });
    const stateStatsTotals = this.sortData(stateStats, "total", total);
    const stateStatsMales = this.sortData(stateStats, "male", genderCount.male);
    const stateStatsFemales = this.sortData(stateStats, "female", genderCount.female);
    return {
      genderCount,
      firstNameStats,
      lastNameStats,
      stateStatsTotals,
      stateStatsMales,
      stateStatsFemales
    };
  }
  charts() {
    return (
      <section className="charts">
        <BarChartUsers
          barChartData={this.state.data.genderCount}
          title="Users by Gender"/>
        <BarChartUsers
          barChartData={this.state.data.firstNameStats}
          title="Users by First Name Initial"/>
        <BarChartUsers
          barChartData={this.state.data.lastNameStats}
          title="Users by Last Name Initial"/>
        <BarChartUsers
          barChartData={this.state.data.stateStatsTotals}
          title="Users by State"/>
        <BarChartUsers
          barChartData={this.state.data.stateStatsMales}
          title="Male Users by State"/>
        <BarChartUsers
          barChartData={this.state.data.stateStatsFemales}
          title="Female Users by State"/>
      </section>
    );
  }


  render(){
    return(
      <main>
        <h1>Welcome to User Statistics</h1>
        <form className="user-input">
          <div className="input-fields group">
            <div className="input-item">
              <label>
                Paste data:
                <input
                  type="text"
                  className="paste"
                  value={this.state.userData}
                  onChange={this.handleInput}
                  />
              </label>
            </div>

            <div className="input-item">
              <label>
                Upload file:
                <input
                  type="file"
                  className="upload"
                  onChange={this.handleUpload}
                  />
              </label>
            </div>
          </div>
          <input
            className="submit"
            type="submit"
            onClick={this.handleSubmit}
          />
        </form>
        <div className="charts">
          { this.state.data ? this.charts() : null }
        </div>
      </main>
    );
  }
}
