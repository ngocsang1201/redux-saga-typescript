import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParam } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
  filter: ListParam;
  cityList: City[];
  onChange?: (newFilter: ListParam) => void;
  onSearchChange?: (newFilter: ListParam) => void;
}

export function StudentFilters(props: StudentFiltersProps) {
  const { filter, cityList, onChange, onSearchChange } = props;

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParam = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    if (!onChange) return;

    const newFilter: ListParam = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value as string;
    const [_sort, _order] = value.split('.');

    const newFilter: ListParam = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParam = {
      ...filter,
      _page: 1,
      name_like: '',
      city: undefined,
      _sort: undefined,
      _order: undefined,
    };

    onChange(newFilter);

    if (searchRef.current) searchRef.current.value = '';
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              label="Search by name"
              id="searchByName"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="searchByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="Filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name: asc</MenuItem>
              <MenuItem value="name.desc">Name: desc</MenuItem>
              <MenuItem value="mark.asc">Mark: asc</MenuItem>
              <MenuItem value="mark.asc">Mark: desc</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
