import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';

function App() {
  function findPallette(id) {
    return seedColors.find(palette => palette.id === id);
  }
  
  return (
    <Switch>
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />}/>
      <Route exact path="/palette/:id" render={ routeProps => <Palette palette={ generatePalette(findPallette(routeProps.match.params.id)) }/>}/>
    </Switch>
  );
}

export default App;
