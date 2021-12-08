import { DatePicker as MuiDatePicker, LocalizationProvider } from "@mui/lab";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import classNames from "classnames";
import './style.scss';

export const DatePicker = (props) => {
  const {className, ...other} = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        {...other}
        renderInput={(params) => <TextField className={classNames(className, 'custom-date-picker')} {...params} />}
      />
    </LocalizationProvider>
  );
}
