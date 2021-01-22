import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


class PaletteMetaForm extends Component {
    state = {
        open: false,
        newPaletteName: "",
      };

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", () =>
            this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
            )
        );
    };
    
    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };

    handlePaletteNameChange = (event) => {
        this.setState( { [event.target.name]: event.target.value });
    };

    render() {
        const { newPaletteName } = this.state;
    return (
            <Dialog
                open={this.state.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => this.props.handleSavePalette(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette. Make sure
                            it's unique!
                        </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            name="newPaletteName"
                            fullWidth
                            margin="normal" 
                            value={newPaletteName}
                            onChange={this.handlePaletteNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter a Palette Name", "Palette Name already used!"]}
                        /> 
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClose}
                            >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            >
                            Save
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;