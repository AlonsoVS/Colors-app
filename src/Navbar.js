import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { MenuItem } from '@material-ui/core';

class Navbar extends Component {
    state = {
        format : 'hex'
    }

    handleChange = (event) => {
        this.setState({ format: event.target.value }, (() => this.props.handleChange(this.state.format)));
    }

    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state;
        return(
            <header className="Navbar">
                <div className="logo">
                    <a href="#">ReactColorPicker</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider defaultValue={ level } min={100} max={500} onAfterChange={ changeLevel } step={100}/>
                    </div>
                </div>
                <div className="select-container">
                    <Select value={ format } onChange={ this.handleChange }>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA- rgba(255, 255, 255, 1.5)</MenuItem>
                    </Select>
                </div>
            </header>
        );
    }
}

export default Navbar;