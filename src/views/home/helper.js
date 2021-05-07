import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Tooltip } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import {
  mdiGenderFemale,
  mdiGenderMale,
  mdiHeartOutline,
  mdiSkullCrossbonesOutline,
  mdiHelp,
} from "@mdi/js";
import Icon from '@mdi/react';

export const useStyles = makeStyles(theme => ({
  root: {
    height: 750,
    width: '100%',
    position: 'relative',
  },
  circularProgress: {
    marginLeft: theme.spacing(1),
  },
  genderFilter: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const renderAvatar = (params) => {
  return (
    <Avatar  src={params.value} alt="avatar"/>
  );
};

const renderGender = (params) => {
  const value = params.value.toLowerCase();
  if (value === 'male') {
    return (
      <Tooltip title="Male">
          <Icon path={mdiGenderMale} size={1}/>
      </Tooltip>
    );
  } else if (value === 'female') {
    return (
      <Tooltip title="Female">
        <Icon path={mdiGenderFemale} size={1}/>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Unknown">
        <Icon path={mdiHelp} size={1}/>
      </Tooltip>
    );
  }
};

const renderStatus = (params) => {
  const value = params.value.toLowerCase();
  if (value === 'alive') {
    return (
      <Tooltip title="Alive">
        <Icon path={mdiHeartOutline} size={1}/>
      </Tooltip>
    );
  } else if (value === 'dead') {
    return (
      <Tooltip title="Dead">
        <Icon path={mdiSkullCrossbonesOutline} size={1}/>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Unknown">
        <Icon path={mdiHelp} size={1}/>
      </Tooltip>
    );
  }
};

export const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 150, sortable: false, hide: true },
  { field: 'avatar', headerName: 'AVATAR', width: 110, sortable: false, renderCell: renderAvatar },
  { field: 'name', headerName: 'NAME', width: 250, sortable: false, },
  { field: 'species', headerName: 'SPECIE', width: 200, sortable: false, },
  { field: 'gender', headerName: 'GENDER', width: 100, sortable: false, renderCell: renderGender },
  { field: 'status', headerName: 'LIVE', width: 100, sortable: false, renderCell: renderStatus },
  { field: 'created', headerName: 'CREATED', width: 120, sortable: false, },
  { field: 'location', headerName: 'LOCATION', width: 300, sortable: false, },
];

export const getCharacters = (data) => {
  const items = [];
  for (let index = 0; index < data.length; index++) {
    const { id, image, name, species, gender, location, status, created } = data[index];
    const item = {
      id,
      avatar: image,
      name,
      species,
      gender,
      location: location.name,
      status,
      created: moment(created).format('DD/MM/YYYY'),
    };
    items.push(item);
  }
  return items;
};
