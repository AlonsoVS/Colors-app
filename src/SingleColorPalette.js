import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                            key={color.name}
                            name={color.name}
                            background={color[format]}
                            showingFullPalette={false}
                        />
                    );
        const { paletteName, emoji, id } = this.props.palette;
        return(
                <div className='SingleColorPalette Palette'>
                    <Navbar level={ level } changeLevel={ this.changeLevel } handleChange={ this.changeFormat } showingAllColors={false} />
                    <div className='Palette-colors'>
                        {colorBoxes}
                        <div className='go-back ColorBox'>
                            <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
                        </div>
                    </div>
                    <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
                </div>
        );
    }
}

export default SingleColorPalette;