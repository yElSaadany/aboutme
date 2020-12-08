import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 250,
    marginBottom: "50px",
  },
  title: {
    textAlign: "center",
  },
  text: {
    textAlign: "justify",
  },
  area: {
    height: 200,
  },
  actions: {
    marginTop: 10,
  },
});

export const PortfolioCard = (props) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!props.pathToImage) {
      setShowDetails(true);
    }
  }, []);

  const handleShowImage = (e) => {
    if (props.pathToImage) {
      setShowDetails((prev) => !prev);
    } else {
      setShowDetails(true);
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.area}>
        <h3 className={classes.title}>{props.title || "Untitled"}</h3>
        {!showDetails ? (
          <img
            onMouseEnter={handleShowImage}
            src={props.pathToImage}
            alt={props.imageAlt}
            className={classes.image}
          />
        ) : (
          <CardContent onMouseLeave={handleShowImage}>
            <p className={classes.text}>
              {props.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                  "Proin rutrum accumsan arcu et lobortis. In id nunc non " +
                  "arcu tristique aliquam. In fermentum vitae lacus eget maximus."}
            </p>
          </CardContent>
        )}
      </CardActionArea>

      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button size="small" color="primary">
          View Live
        </Button>
      </CardActions>
    </Card>
  );
};

const cardStyle = {
  width: "250px",
  border: "solid black 3px",
  height: "250px",
};
