import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


class PaletteMetaForm extends Component {
    state = {
        open: this.props.open,
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

    handlePaletteNameChange = (event) => {
        this.setState( { [event.target.name]: event.target.value });
    };

    render() {
        const { newPaletteName, open } = this.state;
        const { hideForm, handleSavePalette } = this.props;
    return (
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
                onClose={hideForm}
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}>
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
                    <Picker />
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={hideForm}
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