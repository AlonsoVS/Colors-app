import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './styles/MiniPaletteStyles';
import Delete from '@material-ui/icons/Delete';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, openDialog, id } = props;
    const miniColorBoxes = colors.map(color => 
                                <div 
                                    className={classes.miniColor}
                                    style={{ backgroundColor: color.color }}
                                    key={color.name}
                                />)
    
    function handleDelete(event) {
        event.stopPropagation();
        openDialog(id);
    };
    
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <Delete className={classes.deleteIcon} onClick={handleDelete} />
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);