import React from 'react';
import { BarChartUsers } from './bar_chart_users';
import * as Util from './util';


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
        break;
      }
    });
    return stateStats;
  }

// input: arg1: {state1: {total: 5, female: 3, male:2}, state2: {...}, ...},
//        arg2: "total", "female", or "male"
// output: in desc order by prop value
  sortData(stats, category){
    let statsArr = [];
    for (let prop in stats) {
      if (stats.hasOwnProperty(prop)) {
        let val = category === undefined ? stats[prop] : stats[prop][category];
        statsArr.push({
          'key': prop,
          'value': val
        });
      }
    }
    statsArr.sort((a, b) => {
      return b.value - a.value;
    });

    // let statsSortedKeys = statsArr.slice(0, 10).map( el => el.key);
    let statsSortedKeys = statsArr.map( el => el.key);
    let statsSorted = {};
    statsSortedKeys.forEach( prop => {
      let val = category === undefined ? stats[prop] : stats[prop][category];
      statsSorted[prop] = val;
    });
    return statsSorted;
  }

  updateGenderCount(stats, user) {
    stats[user.gender]++;
    return stats;
  }

  updateInitialsCount(stats, user, prop) {
    if (user.name[prop][0].toLowerCase() < "n") {
      stats["A-M"]++;
    } else {
      stats["N-Z"]++;
    }
    return stats;
  }

  getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  updateAgeCount(stats, user) {
    const age = this.getAge(user.dob);
    if (age <= 20) {
      stats["0-20"]++;
    } else if (age <= 40) {
      stats["21-40"]++;
    } else if (age <= 60) {
      stats["41-60"]++;
    } else if (age <= 80) {
      stats["61-80"]++;
    } else if (age <= 100) {
      stats["81-100"]++;
    } else {
      stats["100+"]++;
    }

    return stats;
  }

  parseData(users) {
    let stateStats = this.parseState(users);
    let genderStats = {female: 0, male: 0};
    let firstNameStats = {"A-M": 0, "N-Z": 0};
    let lastNameStats = {"A-M": 0, "N-Z": 0};
    let ageStats = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0, "100+": 0};

    users.map( user => {
      genderStats = this.updateGenderCount(genderStats, user);
      // genderStats[user.gender]++;
      firstNameStats = this.updateInitialsCount(firstNameStats, user, "first");
      // if (user.name.first[0].toLowerCase() < "n") {
      //   firstNameStats["A-M"]++;
      // } else {
      //   firstNameStats["N-Z"]++;
      // }
      lastNameStats = this.updateInitialsCount(lastNameStats, user, "last");
      // if (user.name.last[0].toLowerCase() < "n") {
      //   lastNameStats["A-M"]++;
      // } else {
      //   lastNameStats["N-Z"]++;
      // }
      ageStats = this.updateAgeCount(ageStats, user);
    });

    ageStats = this.sortData(ageStats);
    const stateStatsTotals = this.sortData(stateStats, "total");
    const stateStatsMales = this.sortData(stateStats, "male");
    const stateStatsFemales = this.sortData(stateStats, "female");
    return {
      genderStats,
      firstNameStats,
      lastNameStats,
      stateStatsTotals,
      stateStatsMales,
      stateStatsFemales,
      ageStats
    };
  }

  charts() {
    return (
      <section className="charts">
        <BarChartUsers
          barChartData={this.state.data.ageStats}
          title="Users by Age"/>
        <BarChartUsers
          barChartData={this.state.data.genderStats}
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
