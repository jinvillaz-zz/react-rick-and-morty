import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, FormControl, InputLabel, InputAdornment, MenuItem, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { COLUMNS, useStyles, getCharacters } from './helper';
import { Loader } from '../../components/loader';
import Api from '../../services/rickandmorty-api';


const LIMIT = 20;

export const HomeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const query = Object.fromEntries(new URLSearchParams(useLocation().search));
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(query.page ? parseInt(query.page, 10) : 0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(query.gender || '');
  const [name, setName] = useState(query.name || '');
  const handleChangePage = (params) => {
    setPage(params.page);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
    setPage(0);
  };

  const handleChangeFilter = (event) => {
    setName(event.target.value);
    setPage(0);
  };

  const selectCharacter = (event) => {
    history.push(`/character/${event.selectionModel[0]}`);
  };

  useEffect(() => {
    let active = true;
    (() => {
      const params = [];
      if (page > 0) {
        params.push(`page=${page}`);
      }
      if (gender.length > 0) {
        params.push(`gender=${gender}`);
      }
      if (name.length > 0 ) {
        params.push(`name=${name}`);
      }
      let search = `?${params.join('&')}`;
      if (search.length === 1) {
        search = null;
      }
      history.replace({ search });
    })();
    (async () => {
      setLoading(true);
      const { characters, size } = await Api.getCharacters(page, gender, name);
      if (!active) {
        return;
      }
      setTotal(size);
      setCharacters(getCharacters(characters));
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, gender, name, history]);

  if (total <= 0 ) {
    return (<Loader/>);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.genderFilter}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select labelId="gender-label"
                id="gender"
                value={gender}
                onChange={handleChangeGender}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.margin}
        id="search"
        label="Filter by name"
        value={name}
        onChange={handleChangeFilter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
          ),
        }}
      />
      <DataGrid rows={characters}
                columns={COLUMNS}
                pageSize={LIMIT}
                rowCount={total}
                pagination
                paginationMode="server"
                onPageChange={handleChangePage}
                loading={loading}
                onSelectionModelChange={selectCharacter}
                page={page}
                disableColumnMenu/>
    </div>
  );
};
