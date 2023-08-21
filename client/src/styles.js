import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  // this means run the styles in this only if the device is small or smaller
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse'
    }
  }
}));