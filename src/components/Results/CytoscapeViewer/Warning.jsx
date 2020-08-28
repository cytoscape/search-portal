import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import cytoLogo from '../../../assets/images/cytoscape-logo.svg';
import { withStyles } from '@material-ui/core/styles';
import MessageSnackbar from '../../AppShell/MessageSnackbar.jsx';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import './style.css';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});

const Warning = (props) => {
  const { classes } = props;

  const [open, setOpen] = useState(false);
  const [state, setState] = useState('dormant');
  const [message, setMessage] = useState(null);

  const handleClick = () => {
    props.handleImportNetwork();
  };

  if (
    props.network.uuid &&
    props.network.uuid.length > 0 &&
    props.cyrest.available
  ) {
    //Snackbar
    const isLoadingNetwork = props.cyrest.isLoadingNetwork;
    const lastResponse = props.cyrest.lastResponse;

    let cycleId = 0;

    if (state === 'dormant' && isLoadingNetwork) {
      setMessage('Opening network in Cytoscape Desktop . . .');
      setState('openLoading');
      if (!open) {
        setOpen(true);
      }
    }
    if (
      (state === 'openLoading' || state === 'closeLoading') &&
      lastResponse != null
    ) {
      setState('openResult');
      if (lastResponse.type === 'IMPORT_NETWORK_SUCCEEDED') {
        setMessage('Network opened in Cytoscape Desktop!');
      } else {
        setMessage('Network failed to open in Cytoscape Desktop');
      }
      if (!open) {
        setOpen(true);
      }
    }
    if (state === 'openResult' && !open) {
      setOpen(true);
    }
    if (state === 'openResult' && open) {
      const currentId = cycleId;
      setTimeout(() => {
        if (state === 'openResult' && currentId === cycleId) {
          setState('dormant');
          cycleId++;
          setOpen(false);
        }
      }, 6000);
    }

    const handleClose = (event, reason) => {
      if (state === 'openLoading') {
        setState('closeLoading');
      } else if (state === 'openResult') {
        setState('dormant');
        cycleId++;
      }
      setOpen(false);
    };

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Tooltip title='Open in cytoscape' placement='bottom'>
            <IconButton
              aria-haspopup='true'
              color='default'
              onClick={handleClick}
            >
              <img alt='Cytoscape logo' src={cytoLogo} />
              <Typography variant='subtitle2' color='textSecondary'>
                Network is too big for interactive view. <br />
                Click to open in Cytoscape Desktop.
              </Typography>
            </IconButton>
          </Tooltip>
        </div>
        <MessageSnackbar
          open={open}
          setOpen={setOpen}
          message={message}
          setMessage={setMessage}
          autoHideDuration={null}
          horizontal={'right'}
          vertical={'bottom'}
          handleClose={handleClose}
        />
      </React.Fragment>
    );
  } else {
    return (
      <div className={classes.container}>
        <Typography variant='subtitle2' color='textSecondary' align='center'>
          Network is too big for interactive view. <br />
          Please open Cytoscape Desktop to view.
        </Typography>
      </div>
    );
  }
};

export default withStyles(styles)(Warning);
