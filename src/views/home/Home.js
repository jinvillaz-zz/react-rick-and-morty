import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, FormControl, InputLabel, InputAdornment, MenuItem, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { COLUMNS, useStyles, getCharacters } from './helper';
import Api from '../../services/rickandmorty-api';


const LIMIT = 20;

export const HomeView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');

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
  }, [page, gender, name]);

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
