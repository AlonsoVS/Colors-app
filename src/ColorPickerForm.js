import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

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
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return(
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={newColor => this.updateCurrentColor(newColor)}
                />
                <ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
                    <TextValidator 
                    value={newColorName}
                    name="newColorName" 
                    onChange={this.handleNewColorNameChange}
                    validators={["required", "isColorUnique", "isColorNameUnique"]}
                    errorMessages={[
                        "Insert a color name", 
                        "Color already used!", 
                        "Color name must be unique"]}
                    />
                    <Button
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

export default ColorPickerForm;