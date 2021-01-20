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
    },
    boxContent: {
        position: "absolute",
        textAlign: "center",
        width: "fit-content",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)",
    },
    showCopyOverlay: {
        position: "absolute",
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.0)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(225, 225, 225, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100",
        }
    },
    showCopyMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
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
                    <div style={{ background }} 
                         class={`${classes.copyOverlay} ${copied && classes.showCopyOverlay}`}/>
                    <div className={`${classes.copyMessage} ${copied && classes.showCopyMessage}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
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