import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { AssessmentRounded, PersonRounded } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import Widget from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from './dashboardSlice';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCity).slice(0, 3);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PersonRounded fontSize="large" />}
            value={statistics.maleCount}
            label="male"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PersonRounded fontSize="large" />}
            value={statistics.femaleCount}
            label="female"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<AssessmentRounded fontSize="large" />}
            value={statistics.highMarkCount}
            label="mark >= 8"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<AssessmentRounded fontSize="large" />}
            value={statistics.lowMarkCount}
            label="mark <= 5"
          />
        </Grid>
      </Grid>

      {/* Student Ranking */}
      <Box mt={4}>
        <Typography variant="h5">Student Ranking</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Students with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Students with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Student Ranking By City */}
      <Box mt={4}>
        <Typography variant="h5">Student Ranking By City</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((city) => (
              <Grid key={city.cityId} item xs={12} md={6} lg={4}>
                <Widget title={city.cityName}>
                  <StudentRankingList studentList={city.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
