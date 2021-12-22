import React from 'react';
import { Button } from "@mui/material";

const ActionButton = (props) => {
    const { children, onClick } = props;

    return (
        <div className="bg-gray-200">
            <Button onClick={onClick}>
                {children}
            </Button>
        </div>
    );
};

export default ActionButton;