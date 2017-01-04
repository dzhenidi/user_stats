import React from 'react';
import { BarChartUsers } from './bar_chart_users';
import { BarChartStacked } from './bar_chart_stacked';
import { PieChartUsers } from './pie_chart_users';
import * as Util from './util';


export default class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      data: null,
      showCharts: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
    let data = JSON.parse(file).results;
    this.setState({
      data: this.parseData(data)
    });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  handleCancel(e) {
    e.preventDefault();

  }

  parseState(users) {
    let stateStats = {};

    users.map( user => {
      switch (user.gender) {
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

  updateGenderCount(stats, user) {
    stats[user.gender]++;
    return stats;
  }

  updateGenderCount2(stats, user) {
    stats[user.gender].value++;
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

  updateAgeCount(stats, user) {
    const age = Util.getAge(user.dob);
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

  formatStacked(sorted, key) {
    let formatted = [];
    for (let prop in sorted) {
      if (sorted.hasOwnProperty(prop)) {
        let entry = {
          name: prop,
          female: key[prop].female,
          male: key[prop].male,
        };
        formatted.push(entry);
      }
    }
    return formatted.slice(0, 10);
  }

  parseData(users) {
    let genderStats    = {female: 0, male: 0};
    let genderStats2    = {
      female: {name: "female", value: 0},
      male: {name: "male", value: 0}
    };
    let firstNameStats = {"A-M": 0, "N-Z": 0};
    let lastNameStats  = {"A-M": 0, "N-Z": 0};
    let ageStats       = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0, "100+": 0};

    users.map( user => {
      genderStats    = this.updateGenderCount(genderStats, user);
      genderStats2   = this.updateGenderCount2(genderStats2, user);
      firstNameStats = this.updateInitialsCount(firstNameStats, user, "first");
      lastNameStats  = this.updateInitialsCount(lastNameStats, user, "last");
      ageStats       = this.updateAgeCount(ageStats, user);
    });
    const stateStats = this.parseState(users);

    const stateStatsTotals  = Util.sortData(stateStats, "total");
    const stateStatsMales   = Util.sortData(stateStats, "male");
    const stateStatsFemales = Util.sortData(stateStats, "female");
    const stateStatsTotalsWithGender = this.formatStacked(stateStatsTotals, stateStats);

    return {
      genderStats,
      genderStats2,
      firstNameStats,
      lastNameStats,
      stateStatsTotals,
      stateStatsMales,
      stateStatsFemales,
      ageStats,
      stateStatsTotalsWithGender
    };
  }

  charts() {
    return (
      <section className="charts">
        <BarChartStacked
          barChartData={this.state.data.stateStatsTotalsWithGender}
          title="Users by State and Gender"/>
        <PieChartUsers
          pieChartData={this.state.data.genderStats2}
          title="Users by Gender"/>
        <BarChartUsers
          barChartData={this.state.data.stateStatsTotals}
          title="Users by State"/>
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
          barChartData={this.state.data.stateStatsMales}
          title="Male Users by State"/>
        <BarChartUsers
          barChartData={this.state.data.stateStatsFemales}
          title="Female Users by State"/>
        <BarChartUsers
          barChartData={this.state.data.ageStats}
          title="Users by Age"/>
      </section>
    );
  }


  render(){
    return(
      <main>
        <h1>Welcome to User Statistics</h1>
        <form className="user-input">
          <div className="flexcontainer">
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
          <div className="flexcontainer">
            <button
              className="button submit"
              onClick={this.handleSubmit}>
              Get Charts
            </button>
            <button
              className="button cancel"
              onClick={this.handleCancel}
              >Cancel
            </button>
          </div>
        </form>
        <div className="charts">
          { this.state.data ? this.charts() : null }
        </div>
      </main>
    );
  }
}
