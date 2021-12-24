import React from 'react';
import { Button } from "@mui/material";

const ActionButton = (props) => {
    const { children, onClick, classes } = props;

    return (
        <div className={classes}>
            <Button onClick={onClick}>
                {children}
            </Button>
        </div>
    );
};

export default ActionButton;