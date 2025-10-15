import { Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export const EditMenu = (props) => {
  return (
    <div>
      <Button
        startIcon={<Add />}
        variant="contained"
        sx={{ my: 1, mr: 1 }}
        onClick={props.addPost}
      >
        Add
      </Button>
      <Button
        startIcon={<Delete />}
        variant="contained"
        disabled={!props.selection.length}
        sx={{ my: 1, mr: 1 }}
        onClick={() => props.removePosts(props.selection)}
      >
        Remove
      </Button>
    </div>
  );
};