import React from 'react';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TimePicker = (props) => {
    const { name, label, value, onChange } = props;

    const convertToDefaultPara = (name, value) => ({
        target: {
            name, value,
        }
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                disableToolbar={false}
                // variant="inline"
                inputVariant="outlined"
                clearLabel="Clear"
                clearable={true}
                label={label}
                name={name}
                value={value}
                onChange={time => onChange(convertToDefaultPara(name, time))}
            />
        </MuiPickersUtilsProvider>
    )
}

export default TimePicker;
