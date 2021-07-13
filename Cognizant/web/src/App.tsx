import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Button from './component/Button';
import SolvePage from './component/SolvePage';
import './css/App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className='App-Header'>
        <h3 className='App-Header-title'>Cognizant Challenge</h3>
        <div>
          {location.pathname === '/top3' ? <Link to='/'>
            <Button variant='secondary'>SOLVE</Button>
          </Link> : <Link to='top3'>
            <Button variant='tertiary'>TOP 3</Button>
          </Link>}
        </div>
      </div>
      <div className='App-Content'>
        <Switch>
          <Route exact path='/' component={SolvePage} />
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
