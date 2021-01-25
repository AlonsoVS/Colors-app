import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { Cancel, Close, Delete } from '@material-ui/icons';
import { blue, red } from '@material-ui/core/colors';

class PaletteList extends Component {
    state = {
        openDeleteDialog: false,
        deletingId: ""
    };

    goToPalette = (id) => {
        this.props.history.push(`/palette/${id}`);
    };

    openDialog = (id) => {
        this.setState({ openDeleteDialog: true, deletingId: id });
    };

    closeDialog = () => {
        this.setState({ openDeleteDialog: false, deletingId: "" });
    };

    handleDelete = () => {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog()
    };

    render() {
        const { palettes, classes, deletePalette } = this.props;
        const { openDeleteDialog, deletingId } = this.state;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => 
                                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                            <MiniPalette 
                                                        openDialog={this.openDialog}
                                                        {...palette}
                                                        handleClick={() => this.goToPalette(palette.id)}
                                                        key={palette.id}
                                                    />
                                        </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby='delete-dialog-title'
                    onClose={this.closeDialog}
                >
                    <DialogTitle id='delete-dialog-title'>Delete this Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <Check/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete"/>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <Close/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel"/>
                        </ListItem>
                    </List>
                </Dialog>                    
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);