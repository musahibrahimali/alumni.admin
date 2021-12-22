import React from 'react';
import {FormGroup, FormControlLabel, Switch} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {LightModeOutlined, DarkModeOutlined} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {darkTheme, lightTheme} from "../../../provider/provider";

const IOSSwitchStyles = makeStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            // color: theme.palette.grey[500],
            '& + $track': {
                backgroundColor: '#818181',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#000000',
            border: `6px solid ${theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white}`,
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        // backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    iconColor: {
        color: theme.palette.grey[50],
    },
    darkIconColor: {
        color: theme.palette.grey[200],
    },
    checked: {},
    focusVisible: {},
}));

const IOSSwitch = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const classes = IOSSwitchStyles();
    /* switch between dark and light mode */
    const handleTheme = () => {
        if(theme){
            dispatch(darkTheme(false));
        }else{
            dispatch(lightTheme(true));
        }
    }
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            onChange={handleTheme}
        />
    );
}

const ToggleButton = () => {
    /* data layer */
    const theme = useSelector((state) => state.theme.theme);
    const styles = IOSSwitchStyles();

    return (
        <FormGroup>
            <FormControlLabel
                label={
                    theme ?
                        <LightModeOutlined className={theme ? styles.iconColor : styles.iconColor} /> :
                        <DarkModeOutlined className={theme ? styles.darkIconColor : styles.darkIconColor }  />
                }
                control={
                    <IOSSwitch
                        checked={theme}
                        name="theme" />
                }
            />
        </FormGroup>
    );
}

export default ToggleButton;