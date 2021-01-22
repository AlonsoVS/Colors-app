import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
    picker: {
        width: "100% !important",
        marginTop: "2rem",
    },
    container: {
        width: "100%",
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem",
    },
    colorNameInput: {
        width: "100%",
        height: "70px",
    },
};

class ColorPickerForm extends Component {
    state = {
        currentColor: 'purple',
        newColorName: '',
    };

    addNewColor = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
          }
        this.props.addColor(newColor);
    };

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
          this.props.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );

        ValidatorForm.addValidationRule("isColorUnique", () =>
          this.props.colors.every(
            ({ color }) => color !== this.state.currentColor
          )
        );
    };

    handleNewColorNameChange = (event) => {
        this.setState({ newColorName: event.target.value });
    };

    updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
    };

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return(
            <div className={classes.container}>
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={newColor => this.updateCurrentColor(newColor)}
                />
                <ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
                    <TextValidator 
                        className={classes.colorNameInput}
                        margin="normal"
                        name="newColorName" 
                        onChange={this.handleNewColorNameChange}
                        placeholder="Color Name"
                        validators={["required", "isColorUnique", "isColorNameUnique"]}
                        value={newColorName}
                        variant="filled"
                        errorMessages={[
                            "Insert a color name", 
                            "Color already used!", 
                            "Color name must be unique"]}
                    />
                    <Button
                        className={classes.addColor}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={paletteIsFull}
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                    >
                        {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);