import React, { Fragment } from "react";
import { Typography, CardContent } from "@material-ui/core";
import useStyles from "./styles";

interface TextBodyProps {
  post: any;
}

export const TextBody: React.FC<TextBodyProps> = ({ post }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag: string) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
    </Fragment>
  );
};
