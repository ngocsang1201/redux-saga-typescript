import { Box, Button, CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions, selectLogging } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: 24,
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLogging);

  const handleLogin = () => {
    dispatch(authActions.login());
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            onClick={handleLogin}
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
