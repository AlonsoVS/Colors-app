import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

class PaletteFormNav extends Component {
    state = {
        newPaletteName: ""
    };

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", () =>
          this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
          )
        );
    };

    handlePaletteNameChange = (event) => {
        this.setState( { [event.target.name]: event.target.value });
      };

    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;
        return(
            <div>
                <CssBaseline />
                <AppBar
                color="default"
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={() => this.props.handleSavePalette(newPaletteName)}>
                    <TextValidator
                        label="Palette Name"
                        name="newPaletteName" 
                        value={newPaletteName}
                        onChange={this.handlePaletteNameChange}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter a Palette Name", "Palette Name already used!"]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        >
                        Save Palette
                    </Button>
                    <Link to="/">
                        <Button
                        variant="contained"
                        color="secondary"
                        >
                        Go Back
                        </Button>
                    </Link>
                    </ValidatorForm>
                </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default PaletteFormNav;