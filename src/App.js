
import './App.css';
import SignUp from './Components/SignUp';
import Home from './Components/Home'
import Users from './Components/Users'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path='/' exact component={Home} />
          <Route path='/home' component={Home} />
        <Route path='/SignUpPage' component={SignUp}/>
        <Route path='/UsersPage' component={Users}/>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
