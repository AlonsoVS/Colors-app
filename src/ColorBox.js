import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';

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
        return(
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div style={{ background }} className="ColorBox">
                    <div style={{ background }} class={`copy-overlay ${copied && "show"}`}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    {this.props.showLink && <Link to={`/palette/${paletteId}/${colorId}`} onclick={ e => e.stopPropagation() }>
                                                <span className="see-more">More</span>
                                            </Link>}
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;