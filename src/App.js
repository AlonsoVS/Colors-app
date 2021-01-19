import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';

function App() {
  function findPallette(id) {
    return seedColors.find(palette => palette.id === id);
  }
  
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>PALETTES MAIN</h1>}/>
      <Route exact path="/palette/:id" render={ routeProps => <Palette palette={ generatePalette(findPallette(routeProps.match.params.id)) }/>}/>
    </Switch>
  );
}

export default App;
