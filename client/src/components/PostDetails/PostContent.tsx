import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import moment from "moment";
import { PostType } from "../../types/PostType";

interface PostContentProps {
  post: PostType;
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <Fragment>
      <Typography variant="h3" component="h2">
        {post.title}
      </Typography>
      <Typography
        gutterBottom
        variant="h6"
        color="textSecondary"
        component="h2"
      >
        {post.tags.map((tag: string) => `#${tag} `)}
      </Typography>
      <Typography gutterBottom variant="body1" component="p">
        {post.message}
      </Typography>
      <Typography variant="h6">Created by: {post.name}</Typography>
      <Typography variant="body1">
        {moment(post.createdAt).fromNow()}
      </Typography>
      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="body1">
        <strong>Realtime Chat - coming soon!</strong>
      </Typography>
    </Fragment>
  );
};
