import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Page from './Page';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [state, setState] = useState({palettes: savedPalettes || seedColors});

  useEffect(syncLocalStorage);

  function deletePalette(id) {
    setState({palettes: state.palettes.filter(palette => palette.id !== id)});
  };

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
    <Route 
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={300}>
            <Switch location={location}>
                  <Route 
                    exact path="/palette/new" 
                    render={routeProps => 
                      <Page>
                        <NewPaletteForm 
                            savePalette={savePalette}
                            palettes={state.palettes}
                            {...routeProps}
                        />
                      </Page>
                    }
                  />
                  <Route
                      exact path="/"
                      render={
                        routeProps => 
                          <Page>
                            <PaletteList
                              deletePalette={deletePalette}
                              palettes={state.palettes}
                              {...routeProps}
                            />
                          </Page>
                      }
                  />
                  <Route 
                      exact path="/palette/:id" 
                      render={ 
                        routeProps => 
                        <div className='page'>
                          <Palette 
                            palette={ generatePalette(findPallette(routeProps.match.params.id))}
                          />
                        </div>
                      }
                  />
                  <Route 
                      exact path="/palette/:paletteId/:colorId" 
                      render={ routeProps => 
                        <div className='page'>
                          <SingleColorPalette 
                                colorId={ routeProps.match.params.colorId }
                                palette={ generatePalette(findPallette(routeProps.match.params.paletteId)) }
                          />
                        </div>
                      }
                  />
                </Switch>
              </CSSTransition>
          </TransitionGroup>
    )}/>
  );
}

export default App;
