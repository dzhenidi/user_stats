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

export const UsersGrid = ({users}) => {
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
