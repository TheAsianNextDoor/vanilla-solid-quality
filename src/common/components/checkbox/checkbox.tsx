import MuiCheckbox from '@suid/material/Checkbox';
import FormControlLabel from '@suid/material/FormControlLabel';

export const Checkbox = (props) => {
  return <FormControlLabel labelPlacement="start" control={<MuiCheckbox {...props} />} label={props.label} />;
};
