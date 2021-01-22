import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

const drawerWidth = 400;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      height: "calc(100vh - 64px)",
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });  

class NewPaletteForm extends Component {
    static defaultProps = {
      maxColors: 20
    };

    state = {
        open: false,
        currentColor: 'purple',
        newColorName: '',
        colors: this.props.palettes[0].colors,
        newPaletteName: ""
      };

      componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
          this.state.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );

        ValidatorForm.addValidationRule("isColorUnique", () =>
          this.state.colors.every(
            ({ color }) => color !== this.state.currentColor
          )
        );
      };
      
      updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
      };
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      handleSavePalette = (newPaletteName) => {
        const newPalette = {
          paletteName: newPaletteName,
          id: newPaletteName.toLowerCase().replace(/ /g, "-"),
          emoji: "",
          colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.history.push("/");
      };

      addNewColor = () => {
        const newColor = {
          color: this.state.currentColor,
          name: this.state.newColorName
        }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: ""});
      };

      handleNewColorNameChange = (event) => {
        this.setState({ newColorName: event.target.value });
      };

      removeColor = (colorName) => {
        this.setState({
          colors: this.state.colors.filter(color => color.name !== colorName)
        });
      };

      onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
          colors: arrayMove(colors, oldIndex, newIndex)
        }));
      };

      clearColors = () => {
        this.setState({ colors: [] });
      };

      addRandomColor = () => {
        const allColors = this.props.palettes.map(palette => palette.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({ colors: [ ...this.state.colors, randomColor] });
      };
    
      render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors, currentColor, newColorName } = this.state;
        const paletteIsFull = maxColors === colors.length;
        return (
          <div className={classes.root}>
            <PaletteFormNav 
              open={open}
              classes={classes}
              palettes={palettes}
              handleSavePalette={this.handleSavePalette}
              handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon/>
                </IconButton>
              </div>
              <Divider />
              <Typography variant='h4'>Design Your Palette</Typography>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.clearColors}
                  >
                    Clear Palette
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={paletteIsFull}
                  onClick={this.addRandomColor}
                  >
                    Random Color
                </Button>
              </div>
              <ChromePicker
                  color={currentColor}
                  onChangeComplete={newColor => this.updateCurrentColor(newColor)}
              />
              <ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
                <TextValidator 
                  value={newColorName}
                  name="newColorName" 
                  onChange={this.handleNewColorNameChange}
                  validators={["required", "isColorUnique", "isColorNameUnique"]}
                  errorMessages={[
                    "Insert a color name", 
                    "Color already used!", 
                    "Color name must be unique"]}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={paletteIsFull}
                  style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                  >
                    {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
              </Button>
              </ValidatorForm>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <DraggableColorList
                colors={colors}
                removeColor={this.removeColor}
                axis="xy"
                onSortEnd={this.onSortEnd}
              />
            </main>
          </div>
        );
      }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);