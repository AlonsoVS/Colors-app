import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { useState, useEffect } from 'react';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [state, setState] = useState({palettes: savedPalettes || seedColors});

  useEffect(syncLocalStorage);

  function findPallette(id) {
    return state.palettes.find(palette => palette.id === id);
  };
  
  function savePalette(newPalette) {
    setState({ palettes: [ ...state.palettes, newPalette ]});
  };

  function syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(state.palettes));
  };

  return (
    <Switch>
      <Route 
        exact path="/palette/new" 
        render={routeProps => 
          <NewPaletteForm 
              savePalette={savePalette}
              palettes={state.palettes}
              {...routeProps}
          />
        }
      />
      <Route exact path="/" render={routeProps => <PaletteList palettes={state.palettes} {...routeProps} />}/>
      <Route 
          exact path="/palette/:id" 
          render={ 
            routeProps => <Palette palette={ generatePalette(findPallette(routeProps.match.params.id))}/>
          }
        />
      <Route 
          exact path="/palette/:paletteId/:colorId" 
          render={ routeProps => 
            <SingleColorPalette 
                  colorId={ routeProps.match.params.colorId }
                  palette={ generatePalette(findPallette(routeProps.match.params.paletteId)) }
            />
          }
        />
    </Switch>
  );
}

export default App;
