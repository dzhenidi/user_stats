export const FILLS_GRADIENT_BLUE = ["#00264d", "#003366", "#004080", "#004d99", "#0059b3", "#0066cc", "#0073e6", "#0080ff", "#1a8cff", "#3399ff"];
export const FILLS = ["#92c5eb", "#bf739c", "#f4e053", "#3ea3cb", "#8b6baf", "#f598a4", "#b7da9b", "#63c29d", "#eda44c", "#f27173"];

export const toPercent = (decimal, fixed=0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};

export const getPercent = (total, value) => {
  const decimal = total > 0 ? value / total : 0;
  return toPercent(decimal, 2);
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


// turn into decimal:
// const getPercent = (value, total) => {
//   const decimal = total > 0 ? value / total : 0;
//   return decimal;
// };
