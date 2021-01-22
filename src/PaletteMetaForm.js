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
        stage: "form",
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

    savePalette = (emoji) => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        };
        this.props.handleSavePalette(newPalette);
    };

    showEmojiPicker = () => {
        this.setState({ stage: "emoji" });
    };

    render() {
        const { newPaletteName, stage } = this.state;
        const { hideForm } = this.props;
    return (
            <div>
                <Dialog open={stage === "emoji"} onClose={hideForm} >
                    <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                    <Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
                </Dialog>
                <Dialog
                    open={stage === "form"}
                    aria-labelledby="form-dialog-title"
                    onClose={hideForm}
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
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
            </div>
        );
    }
}

export default PaletteMetaForm;