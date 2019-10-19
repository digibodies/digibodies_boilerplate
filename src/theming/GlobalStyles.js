// Set some sane global defaults
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    '@global': {
      body: {
        'text-rendering': 'optimizelegibility',
        'font-family': '"Open Sans", Helvetica, Arial, sans-serif'
      },
      a: {
        color: theme.palette.primary[500],
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  };
});

export default function GlobalStyles() {
  useStyles();
  return null;
}
