import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {

    state = {
        shades: this.gatherShades(this.props.palette, this.props.colorId),
        format: "hex"
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
    
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }

    changeFormat = (value) => {
        this.setState({ format: value });
    }
    
    render() {
        const { level, format } = this.state;
        const colorBoxes = this.state.shades.map( color => 
                        <ColorBox 
                            key={color.id}
                            name={color.name}
                            background={color[format]}
                            showLink={false}
                        />
                    );
        const { paletteName, emoji } = this.props.palette;
        return(
                <div className='Palette'>
                    <Navbar level={ level } changeLevel={ this.changeLevel } handleChange={ this.changeFormat } showingAllColors={false} />
                    <div className='Palette-colors'>{colorBoxes}</div>
                    <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
                </div>
        );
    }
}

export default SingleColorPalette;