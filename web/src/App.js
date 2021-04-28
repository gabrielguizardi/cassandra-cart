import 'tailwindcss/tailwind.css';
import Home from './pages/Home';
import Ticket from './pages/Ticket';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/ticket">
              <Ticket/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
