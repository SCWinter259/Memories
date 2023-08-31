import React from "react";
import { Button } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import useStyles from "./styles";

interface EditButtonProps {
  handleEditButtonClick: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({
  handleEditButtonClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.overlay2}>
      <Button
        style={{ color: "white" }}
        size="small"
        onClick={handleEditButtonClick}
      >
        <MoreHoriz fontSize="medium" />
      </Button>
    </div>
  );
};
