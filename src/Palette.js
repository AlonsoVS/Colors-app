import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

export default class Palette extends Component {
    state = {
        level: 300
    }

    changeLevel = (level) => {
        this.setState({ level });
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => <ColorBox background={color.hex} name={color.name} />);
        return(
            <div className="Palette">
                <div className="slider">
                    <Slider defaultValue={level} min={100} max={500} onAfterChange={this.changeLevel} step={100}/>
                </div>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        );
    }
}