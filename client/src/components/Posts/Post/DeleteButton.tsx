import React from "react";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

interface DeleteButtonProps {
  handleDeleteButtonClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  handleDeleteButtonClick,
}) => {
  return (
    <Button size="small" color="primary" onClick={handleDeleteButtonClick}>
      <Delete fontSize="small" />
      Delete
    </Button>
  );
};
