import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        height: "90%"
    },
    goBack: {
        background: "black",
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(225, 225, 225, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            color: "white",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none",
        }
    }
}

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
        const { classes } = this.props;
        return(
                <div className={classes.Palette}>
                    <Navbar level={ level } changeLevel={ this.changeLevel } handleChange={ this.changeFormat } showingAllColors={false} />
                    <div className={classes.colors}>
                        {colorBoxes}
                        <div className={classes.goBack}>
                            <Link to={`/palette/${id}`} >Go Back</Link>
                        </div>
                    </div>
                    <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
                </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);