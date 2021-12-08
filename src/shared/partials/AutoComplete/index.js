import { Autocomplete as MuiAutocomplete } from "@mui/lab";
import TextField from '@mui/material/TextField';
import classNames from "classnames";
import './style.scss';

export const AutoComplete = (props) => {
  const { label, ...other } = props;
  return (
    <MuiAutocomplete
      {...other}
      renderInput={(params) => (
        <TextField
          className={classNames('custom-autocomplete')}
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
