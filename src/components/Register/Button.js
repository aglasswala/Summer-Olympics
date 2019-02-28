import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  input: {
    display: 'none',
  },
});

function TextButtons(props) {
  const { classes } = props;
  return (
    
      <Button color="secondary" className={classes.button} >
        Register
      </Button>
    
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);
