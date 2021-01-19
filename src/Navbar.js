import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { IconButton, MenuItem, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {
        format : 'hex',
        open : false
    }

    handleFormatChange = (event) => {
        this.setState({ format: event.target.value, open: true }, (() => this.props.handleChange(this.state.format)));
    }

    closeNackbar = () => {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state;
        return(
            <header className="Navbar">
                <div className="logo">
                    <Link to='/'>ReactColorPicker</Link>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider defaultValue={ level } min={100} max={500} onAfterChange={ changeLevel } step={100}/>
                    </div>
                </div>
                <div className="select-container">
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
                        <IconButton onClick={ this.closeNackbar } color="inherit" key="close" aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    ]}/>
            </header>
        );
    }
}

export default Navbar;