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
    height: 155,
  },
  actions: {
    marginTop: 10,
  },
  image: {
    textAlign: "center",
    width: "100%",
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
      <h3 className={classes.title}>{props.title || "Untitled"}</h3>
      <CardActionArea className={classes.area}>
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
        {props.firstButton && (
          <Button
            onClick={props.handleFirstButton}
            size="small"
            color="primary"
          >
            {props.firstButton}
          </Button>
        )}
        {props.secondButton && (
          <Button
            onClick={props.handleSecondButton}
            size="small"
            color="primary"
          >
            {props.secondButton}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
