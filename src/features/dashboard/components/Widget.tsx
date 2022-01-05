import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

export interface WidgetProps {
  title: String;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <Box mt={1}>{children}</Box>
    </Paper>
  );
}
