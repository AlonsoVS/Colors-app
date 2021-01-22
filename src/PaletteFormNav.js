import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: "flex",
        height: "64px",
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
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
    navBtns: {

    },
});

class PaletteFormNav extends Component {
    render() {
        const { classes, open, palettes, handleSavePalette } = this.props;
        return(
            <div className={classes.root}>
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
                        Create a Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                        <PaletteMetaForm palettes={palettes} handleSavePalette={handleSavePalette} />
                        <Link to="/">
                            <Button
                            variant="contained"
                            color="secondary"
                            >
                            Go Back
                            </Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);