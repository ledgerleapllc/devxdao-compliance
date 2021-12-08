import { FormControlLabel, Radio as MuiRadio } from '@mui/material';
import './style.scss';

export const Radio = (props) => {
  return (
    <FormControlLabel className="custom-radio" {...props} control={<MuiRadio size="small" />} />
  );
}
