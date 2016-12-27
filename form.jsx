import React from 'react';
import { BarChartUsers } from './bar_chart_users';
const INPUT = {"results":[{"gender":"female","name":{"title":"mrs","first":"encarnacion","last":"sanchez"},"location":{"street":"9301 calle mota","city":"gandía","state":"cantabria","postcode":54782},"email":"encarnacion.sanchez@example.com","login":{"username":"goldenladybug512","password":"carpente","salt":"n6O0hd8F","md5":"aa7a731e7a9ee6307d04c5c3f78477db","sha1":"8ac2ae6e96d09c4e5e596f18656b0a51f5e30204","sha256":"0336d713c1511d49e97db1b97702c91f300785f66907decf8e8a6f6ad27b76fc"},"dob":"1955-04-02 05:02:47","registered":"2006-12-20 19:29:16","phone":"920-194-240","cell":"682-302-396","id":{"name":"DNI","value":"77755451-E"},"picture":{"large":"https://randomuser.me/api/portraits/women/67.jpg","medium":"https://randomuser.me/api/portraits/med/women/67.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/67.jpg"},"nat":"ES"},{"gender":"male","name":{"title":"mr","first":"estácio","last":"campos"},"location":{"street":"3068 rua das flores ","city":"águas lindas de goiás","state":"espírito santo","postcode":63576},"email":"estácio.campos@example.com","login":{"username":"organicladybug836","password":"ventura","salt":"lBsBQ19P","md5":"fc06aa62e9737b6c87e80780a3533ce6","sha1":"1ff30f3174d49fb794f427b791a3dfc8538d5722","sha256":"3d66efd543dbd185acfb6a1027883c6b4ecc3e24262f8ea6656dfa393e194831"},"dob":"1974-03-27 08:18:25","registered":"2006-10-09 04:47:35","phone":"(17) 0570-3365","cell":"(28) 1742-9874","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/1.jpg","medium":"https://randomuser.me/api/portraits/med/men/1.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/1.jpg"},"nat":"BR"},{"gender":"female","name":{"title":"miss","first":"charlène","last":"rens"},"location":{"street":"5959 lange nieuwstraat","city":"montferland","state":"utrecht","postcode":84993},"email":"charlène.rens@example.com","login":{"username":"ticklishduck668","password":"seng","salt":"lD438E4b","md5":"7cfae35b8c963adc5f4ff2920f1e3631","sha1":"b3f277a12ccd33e9d1cc1479df88825bbc9c384f","sha256":"c8da037a291d0ec3cf9e7921d6470f53d15667411fd41b884363ac92547313e7"},"dob":"1956-09-22 22:18:11","registered":"2007-07-10 12:09:15","phone":"(727)-211-4946","cell":"(609)-709-4830","id":{"name":"BSN","value":"77105087"},"picture":{"large":"https://randomuser.me/api/portraits/women/66.jpg","medium":"https://randomuser.me/api/portraits/med/women/66.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/66.jpg"},"nat":"NL"}],"info":{"seed":"7a2c09dbfe75b46f","results":3,"page":1,"version":"1.1"}};
const dataBar = [
      {name: 'gender', female: 4000, male: 2400}
];

// function parseData(input) {
//   let users = JSON.parse(input).results; //array made up of users
//   let genderStats = {name: 'gender', female: 0, male: 0};
//   users.map( user => {
//     genderStats[user.gender]++
//   })
//   return genderStats;
// }

const UserDetail = ({details}, idx) => {
  let lis = [];
  let keyCounter = 0;
  for (let prop in details) {
    if (details.hasOwnProperty(prop)){
      lis.push( <li key={keyCounter}>{prop + ": " + details[prop] }</li> );
      keyCounter++;
    }
  }
  return (
    <div>
      {lis}
    </div>
  );
};

const UsersGrid = ({users}) => {
  if (users.length === 0) {
    return null;
  } else {
    let userUls = users.map( (user, i) => (
        <ul key={i} className="user-row">
          <h3>{user.name.first + ", " + user.name.last}</h3>
          <UserDetail details={user} key={i}/>
        </ul>
      )
    );
    return (
      <div>
        <h2>Users:</h2>
        {userUls}
      </div>
    );
  }
};

const getPercent = (value, total) => {
  const decimal = total > 0 ? value / total : 0;
  return decimal;
};

export default class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      data: this.parseData(INPUT),
    };
    this.handleInput = this.handleInput.bind(this);
    this.parseData = this.parseData.bind(this);
  }
  handleInput(e){
    let users = JSON.parse(e.target.value).results; //array made up of users
    this.setState({
      users
    });
  }

  parseState(users) {
    let stateStats = {};
    users.map( user => {
      switch (user.gender){
        case "female":
          if (stateStats[user.location.state]) {
            stateStats[user.location.state]["female"]++;
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
      return a.value - b.value;
    });
    let stateStatsTopTen = stateStatsArr.slice(0, 10).map( el => el.key);
    let stateStatsSelection = {};
    stateStatsTopTen.forEach( el => {
      stateStatsSelection[el] = getPercent(stateStats[el][category], total);
    });
    return stateStatsSelection;
  }

  parseData(input) {
    // let users = JSON.parse(input).results; //array made up of users
    let users = input.results; //array made up of users
    let stateStats = this.parseState(users);
    let genderCount = {female: 0, male: 0};
    let genderStats = {female: 0, male: 0};
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
    genderStats.female = getPercent(genderCount.female, total);
    genderStats.male = getPercent(genderCount.male, total);
    firstNameStats["A-M"] = getPercent(firstNameStats["A-M"], total);
    firstNameStats["N-Z"] = getPercent(firstNameStats["N-Z"], total);
    lastNameStats["A-M"] = getPercent(lastNameStats["A-M"], total);
    lastNameStats["N-Z"] = getPercent(lastNameStats["N-Z"], total);
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
      genderStats,
      firstNameStats,
      lastNameStats,
      stateStatsTotals,
      stateStatsMales,
      stateStatsFemales
    };
  }



  render(){

    return(
      <div>
        <form className="">
          <label>
            Paste JSON data here
            <input
              type="text"
              value={this.state.userData}
              onChange={this.handleInput}
              />
          </label>
        </form>
        <div className="userGrid">
          <BarChartUsers barChartData={this.state.data.genderStats}/>
          <BarChartUsers barChartData={this.state.data.firstNameStats}/>
          <BarChartUsers barChartData={this.state.data.lastNameStats}/>
          <BarChartUsers barChartData={this.state.data.stateStatsTotals}/>
          <BarChartUsers barChartData={this.state.data.stateStatsMales}/>
          <BarChartUsers barChartData={this.state.data.stateStatsFemales}/>
        </div>
      </div>
    );
  }
}

// { this.state.users.length > 0 ?
//   <BarChartUsers users={this.state.users} /> : null }
// <UsersGrid users={this.state.users} />
