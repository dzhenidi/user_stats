export const FILLS_GRADIENT_BLUE = ["#00264d", "#003366", "#004080", "#004d99", "#0059b3", "#0066cc", "#0073e6", "#0080ff", "#1a8cff", "#3399ff"];
export const FILLS = ["#92c5eb", "#bf739c", "#f4e053", "#3ea3cb", "#8b6baf", "#f598a4", "#b7da9b", "#63c29d", "#eda44c", "#f27173"];

export const toPercent = (decimal, fixed=0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};

export const getPercent = (total, value) => {
  const decimal = total > 0 ? value / total : 0;
  return toPercent(decimal, 1);
};

export const getPercentWhole = (total, value) => {
  const decimal = total > 0 ? value / total : 0;
  return toPercent(decimal);
};

// reduces data to sum of values { A: 36, B: 27, C: 99 }
export const getUserCount = data => {
  let accum = 0;
  for (let pair in data) {
    if (data.hasOwnProperty(pair)) {
      accum += data[pair];
    }
  }
  return accum;
};

export const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
};

// input: arg1: {state1: {total: 5, female: 3, male:2}, state2: {...}, ...},
//        arg2: "total", "female", or "male"
// output: in desc order by prop value
  export const sortData = (stats, category) => {
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

    let statsSortedKeys = statsArr.map( el => el.key);
    let statsSorted = {};
    statsSortedKeys.forEach( prop => {
      let val = category === undefined ? stats[prop] : stats[prop][category];
      statsSorted[prop] = val;
    });
    return statsSorted;
  };


// turn into decimal:
// const getPercent = (value, total) => {
//   const decimal = total > 0 ? value / total : 0;
//   return decimal;
// };
