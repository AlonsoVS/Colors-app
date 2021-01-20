import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s",
        }
    },

    copyText: {
        color: props => chroma(props.background).luminance() > 0.07 ? "rgba(0, 0, 0, 0.6)" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.07 ? "white" : "black"
    },
    seeMoreButton: {
        color: props => chroma(props.background).luminance() > 0.07 ? "rgba(0, 0, 0, 0.6)" : "white",
        background: "rgba(225, 225, 225, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
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
        opacity: "0"
    }
}

class ColorBox extends Component {
    state = { 
        copied: false 
    }

    static defaultProps = { showingFullPalette: true }
    
    handleCopy = () => {
        this.setState({ copied: true }, (() => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        }))
    }

    render() {
        const { name, background, colorId, paletteId, showingFullPalette, classes } = this.props;
        const copied = this.state.copied;
        return(
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div style={{ background }} class={`copy-overlay ${copied && "show"}`}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && <Link to={`/palette/${paletteId}/${colorId}`} onclick={ e => e.stopPropagation() }>
                                                <span className={classes.seeMoreButton}>More</span>
                                            </Link>}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);