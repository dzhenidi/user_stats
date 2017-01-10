import React from 'react';
import { BarChartUsers } from './bar_chart_users';
import { BarChartMonochrome } from './bar_chart_monochrome';
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

  updateGenderCountPie(stats, user) {
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

  updateInitialsCountPie(stats, user, prop) {
    if (user.name[prop][0].toLowerCase() < "n") {
      stats["A-M"].value++;
    } else {
      stats["N-Z"].value++;
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
  updateAgeCountPie(stats, user) {
    const age = Util.getAge(user.dob);
    if (age <= 20) {
      stats["0-20"].value++;
    } else if (age <= 40) {
      stats["21-40"].value++;
    } else if (age <= 60) {
      stats["41-60"].value++;
    } else if (age <= 80) {
      stats["61-80"].value++;
    } else if (age <= 100) {
      stats["81-100"].value++;
    } else {
      stats["100+"].value++;
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
    let numUsers;
    let genderStats = {female: 0, male: 0};
    let genderStatsPie = {
      female: {name: "female", value: 0},
      male: {name: "male", value: 0}
    };
    let firstNameStatsPie = {
      "A-M": {name: "A-M", value: 0},
      "N-Z": {name: "N-Z", value: 0}
    };
    let lastNameStatsPie = {
      "A-M": {name: "A-M", value: 0},
      "N-Z": {name: "N-Z", value: 0}
    };
    let ageStatsPie = {
      "0-20":   {name: "0-20",  value: 0},
      "21-40":  {name: "21-40", value: 0},
      "41-60":  {name: "41-60", value: 0},
      "61-80":  {name: "61-80", value: 0},
      "81-100": {name: "81-100", value: 0},
      "100+":   {name: "100+",  value: 0},
    };

    users.map( user => {
      genderStats    = this.updateGenderCount(genderStats, user);
      genderStatsPie = this.updateGenderCountPie(genderStatsPie, user);
      firstNameStatsPie = this.updateInitialsCountPie(firstNameStatsPie, user, "first");
      lastNameStatsPie  = this.updateInitialsCountPie(lastNameStatsPie, user, "last");
      ageStatsPie    = this.updateAgeCountPie(ageStatsPie, user);
      numUsers++;
    });
    const stateStats = this.parseState(users);

    const stateStatsTotals  = Util.sortData(stateStats, "total");
    const stateStatsMales   = Util.sortData(stateStats, "male");
    const stateStatsFemales = Util.sortDataWithName(stateStats, "female");
    const stateStatsTotalsWithGender = this.formatStacked(stateStatsTotals, stateStats);
    return {
      genderStats,
      genderStatsPie,
      firstNameStatsPie,
      lastNameStatsPie,
      stateStatsTotals,
      stateStatsMales,
      stateStatsFemales,
      ageStatsPie,
      stateStatsTotalsWithGender,
      numUsers
    };
  }

  charts() {
    return (
      <div className="charts-container">
        <section className="charts pie flexcontainer">
          <PieChartUsers
            pieChartData={this.state.data.genderStatsPie}
            title="Users by Gender"/>
          <PieChartUsers
            pieChartData={this.state.data.ageStatsPie}
            title="Users by Age"/>
          <PieChartUsers
            pieChartData={this.state.data.firstNameStatsPie}
            title="Users by First Name Initial"/>
          <PieChartUsers
            pieChartData={this.state.data.lastNameStatsPie}
            title="Users by Last Name Initial"/>
        </section>
        <section className="charts bar">
          <BarChartUsers
            barChartData={this.state.data.stateStatsTotals}
            title="Users by State"/>
          <BarChartUsers
            barChartData={this.state.data.stateStatsMales}
            title="Male Users by State"/>
          <BarChartMonochrome
            barChartData={this.state.data.stateStatsFemales}
            title="Female Users by State"
            numUsers={this.state.data.genderStats.female}/>
          <BarChartStacked
            barChartData={this.state.data.stateStatsTotalsWithGender}
            title="Users by State and Gender"/>
        </section>
      </div>
    );
  }



  render(){
    return(
      <main>
        <h1>User Statistics</h1>
        <form className="user-input">
          <h2>Paste or upload your JSON data to generate charts.</h2>
          <div className="flexcontainer">
            <div className="input-item">
              <label>
                Paste data:
                <input
                  type="text"
                  className="paste"
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

        </form>
        <div className="charts">
          { this.state.data ? this.charts() : null }
        </div>
      </main>
    );
  }
}
