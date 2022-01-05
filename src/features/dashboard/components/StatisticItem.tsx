import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

export interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  value: {
    fontWeight: 500,
  },
}));

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right" className={classes.value}>
          {value}
        </Typography>

        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
