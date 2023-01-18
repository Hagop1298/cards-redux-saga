import './App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from "./redux/action"
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DirectionsRunIcon from "@material-ui/icons/DirectionsRunIcon";}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  // control: {
  //   padding: theme.spacing(2)
  // },
}))


function App() {
  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState("")

  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index)
  };
  const gridClasses = gridStyles()
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")
  const updateSearch = () => {
    setQuery(search)
    setSearch("")
  }

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query })
  }, [query])

  const { recipes } = useSelector((state) => state.data)
  // console.log(recipes, "kjaghkadfjhsdfkjhsdfkjhsdfjkgh");



  return (
    <div className="App">
      <h2>Recipe App </h2>
      <form className='search-box'>
        <TextField
          style={{ marginRight: "9px" }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          style={{ width: "50px", height: "37px" }}
          variant="contained"
          color='primary'
          onClick={updateSearch}
        >
          Search
        </Button>

      </form>
      <Grid className={gridClasses.root} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {recipes && recipes.hits && recipes.hits.map((item, index) => (
              <Grid key={index} item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.recipe.label}
                    subheader={
                      <span>
                        {/* <DirectionsRunIcon /> */}
                        {item.recipe.calories}
                      </span>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.recipe.image}
                    alt="Paella dish"
                    title={item.recipe.calories}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">

                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton

                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={index === cardValue && expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph variant='h4'>Ingredients:</Typography>
                      {item.recipe.ingredients.map((item) => (

                        <Typography paragraph>{item.text}</Typography>
                      ))}
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
