import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';

function ProgressAction(props) {
  return (
    <LinearProgress
      style={{
        borderRadius: 0,
        display: props.isRunning ? 'flex' : 'none',
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  isRunning: state.auth.isRunning,
});

export default connect(mapStateToProps)(ProgressAction);