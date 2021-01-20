import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';
import chroma from 'chroma-js';

class ColorBox extends Component {
    state = { 
        copied: false 
    }

    static defaultProps = { showLink: true }
    
    handleCopy = () => {
        this.setState({ copied: true }, (() => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        }))
    }

    render() {
        const { name, background, colorId, paletteId } = this.props;
        const copied = this.state.copied;
        const isDarckColor = chroma(background).luminance() <= 0.07;
        const isLightColor = chroma(background).luminance() > 0.07;
        return(
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div style={{ background }} className="ColorBox">
                    <div style={{ background }} class={`copy-overlay ${copied && "show"}`}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p className={isLightColor && "dark-text"}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarckColor && "light-text"}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                    </div>
                    {this.props.showLink && <Link to={`/palette/${paletteId}/${colorId}`} onclick={ e => e.stopPropagation() }>
                                                <span className={`see-more ${isLightColor && "dark-text"}`}>More</span>
                                            </Link>}
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;