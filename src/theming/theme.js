// Defines theme to use with jss and material-ui components
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    button: {
      fontWeight: 400,
      textTransform: 'none'
    }
  },
  palette: {
    primary: blueGrey,
    accent: pink,
    error: {
      main: red[500]
    }
  }
});

export default muiTheme;
