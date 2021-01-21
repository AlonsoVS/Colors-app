import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { IconButton, MenuItem, Snackbar, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
    state = {
        format : 'hex',
        open : false
    }

    handleFormatChange = (event) => {
        this.setState({ 
            format: event.target.value, open: true 
        }, (() => 
                this.props.handleChange(this.state.format))
            );
    }

    closeNackbar = () => {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { format } = this.state;
        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>ReactColorPicker</Link>
                </div>
                { showingAllColors && 
                <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider 
                            defaultValue={ level }
                            min={100} max={500}
                            onAfterChange={ changeLevel }
                            step={100}
                        />
                    </div>
                </div> }
                <div className={classes.selectContainer}>
                    <Select value={ format } onChange={ this.handleFormatChange }>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA- rgba(255, 255, 255, 1.5)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format Changed To { format.toUpperCase() }</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={ this.closeNackbar }
                    action={[
                        <IconButton 
                            onClick={ this.closeNackbar }
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}/>
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);