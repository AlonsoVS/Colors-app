import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import Delete from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
    handleDelete = (event) => {
        event.stopPropagation();
        this.props.openDialog(this.props.id);
    };

    goToPalette = () => {
        this.props.handleClick(this.props.id);
    };
    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const miniColorBoxes = colors.map(color => 
                                    <div 
                                        className={classes.miniColor}
                                        style={{ backgroundColor: color.color }}
                                        key={color.name}
                                    />);
        return (
            <div className={classes.root} onClick={this.goToPalette}>
                <Delete className={classes.deleteIcon} onClick={this.handleDelete} />
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);