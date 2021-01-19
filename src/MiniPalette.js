import { withStyles } from '@material-ui/styles';
import React from 'react';

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "pink",
        "& h1": {
            color: "white"
        }
    }
};

function MiniPalette(props) {
    const { classes } = props;
    console.log(classes);
    return (
        <div className={classes.main}>
                <h1>Mini Palette</h1>
            <section className={classes.secondary}>
                <h1>Pink Text</h1>
            </section>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);