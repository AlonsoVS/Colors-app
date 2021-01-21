import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';
import PaletteFooter from './PaletteFooter';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%",
    }
};

class Palette extends Component {
    state = {
        level: 300,
        format: 'hex'
    }

    changeLevel = (level) => {
        this.setState({ level });
    }

    changeFormat = (value) => {
        this.setState({ format: value });
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => 
                                                <ColorBox 
                                                    background={ color[format] }
                                                    name={ color.name }
                                                    key={ color.id }
                                                    paletteId={ id }
                                                    colorId={ color.id }
                                                />);
        return(
            <div className={classes.Palette}>
                <Navbar 
                    level={ level }
                    changeLevel={ this.changeLevel }
                    handleChange={ this.changeFormat }
                    showingAllColors={true}
                />
                <div className={classes.colors}>{ colorBoxes }</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);