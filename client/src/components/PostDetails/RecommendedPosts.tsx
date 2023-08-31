import React from "react";
import { Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";
import { PostType } from "../../types/PostType";

interface RecommendedPostsProps {
  recommendedPosts: PostType[];
  openPost: (_id: string) => void;
}

export const RecommendedPosts: React.FC<RecommendedPostsProps> = ({
  recommendedPosts,
  openPost,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography gutterBottom variant="h5">
        You might also like
      </Typography>
      <Divider />
      <div className={classes.recommendedPosts}>
        {recommendedPosts.map(
          ({ title, message, name, likes, selectedFile, _id }: PostType) => (
            <div
              style={{ margin: "20px", cursor: "pointer" }}
              onClick={() => openPost(_id)}
              key={_id}
            >
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {name}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {message}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {likes?.length}
              </Typography>
              <img src={selectedFile} width="200px" />
            </div>
          )
        )}
      </div>
    </div>
  );
};
