import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home';
import New from './pages/NewVehicle/New';

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new" exact render={props => <New {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
