import React from 'react';
import { FormButtonStyles } from './FormButtonStyles';
import {Button} from "@mui/material";

function FormButton(props) {

    const { text, size, color, variant, onClick, ...other } = props;

    const classes = FormButtonStyles();

    return (
        <Button
            classes={{ root: classes.root, label: classes.label }}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
        >
            {text}
        </Button>
    )
}

export default FormButton;
