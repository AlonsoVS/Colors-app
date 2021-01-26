import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import styles from './styles/ColorBoxStyles';
import classNames from 'classnames';


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
                         className={classNames(classes.copyOverlay, {
                             [classes.showCopyOverlay]: copied,
                         })}/>
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
                    {showingFullPalette && <Link to={`/palette/${paletteId}/${colorId}`} onClick={ e => e.stopPropagation() }>
                                                <span className={classes.seeMoreButton}>More</span>
                                            </Link>}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);