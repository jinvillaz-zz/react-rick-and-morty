import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardReturn } from '@material-ui/icons';
import {
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  mdiGenderFemale,
  mdiGenderMale,
  mdiHeartOutline,
  mdiSkullCrossbonesOutline,
  mdiHelp,
} from "@mdi/js";
import Icon from '@mdi/react';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import { Loader } from '../../components/loader';
import Api from '../../services/rickandmorty-api';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '86.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

export const CharacterView = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [character, setCharacter ] = useState(null);

  const getGender = (data) => {
    const value = data.toLowerCase();
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

  const getStatus = (data) => {
    const value = data.toLowerCase();
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

  const handleReturn = () => {
    history.push('/');
  };

  useEffect(() => {
    let active = true;

    (async () => {
      const character = await Api.getCharacter(id);
      if (!active) {
        return;
      }
      setCharacter(character);
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (!character) {
    return (<Loader/>);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {getGender(character.gender)}
          </Avatar>
        }
        action={
          <Tooltip title="Go to list of character">
            <IconButton aria-label="go to list of character" onClick={handleReturn}>
              <KeyboardReturn/>
            </IconButton>
          </Tooltip>
        }
        title={character.name}
      />
      <CardMedia
        className={classes.media}
        image={character.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" component="p">
          Is Alive {getStatus(character.status)} <br/>
          Specie {character.species} <br/>
          Location - {character.location.name} <br/>
          Created at  {moment(character.created).format('DD/MM/YYYY')} <br/>
          Appears in {character.episode.length} episodes
        </Typography>
      </CardContent>
    </Card>
  )
};
