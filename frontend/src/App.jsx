import {
  AppBar,
  Box,
  Container,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search, Delete } from "@mui/icons-material";
import axios from "axios";
import faker from "@faker-js/faker";
import { useEffect } from "react";

const api = {
  async addPost(post) {
    const response = await axios.post("/api/create-post", post);

    return response.data;
  },
  async removePost(id) {
    const response = await axios.delete(`/api/remove-post?id=${id}`);

    return response.data;
  },
  async search(query) {
    const response = await axios.get(`/api/search?query=${query}`);

    return response.data;
  },
  async getAllPosts() {
    const response = await axios.get("/api/posts");

    return response.data;
  },
};

//set datagrid  column view
const columns = [
  {
    field: "title",
    headerName: "Name",
    flex: 4,
    minWidth: 100,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 2,
    minWidth: 80,
  },
  {
    field: "author",
    headerName: "Author",
    flex: 1,
    minWidth: 10,
  },
  {
    field: "content",
    headerName: "ArticleBody",
    flex: 1,
    minWidth: 250,
  },
  {
    field: "date",
    headerName: "Publish Date",
    flex: 1,
    minWidth: 80,
  },
];

const TopMenu = (props) => {
  return (
    <Box sx={{ flexGrow: 100, mb: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 100 }}></div>
          <span>React-Node-Elastic-Search</span>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const EditMenu = (props) => {
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


const App = () => {
  
  //use state has been declared to handle chanes
  const [posts, setPosts] = useState([]); //intially zero post 
  const [selection, setSelection] = useState([]); //initially none is selected
  const [query, setQuery] = useState(""); // initially empty query

  const addPost = async () => {

    //faker liberary used to generate random fake data, 
    // in case of enterprise project it data will be supplied by user

    const newPost = {
      title: faker.lorem.lines(1),
      type: faker.commerce.department(),
      content: faker.lorem.paragraphs(3),
      author: faker.name.findName(),
      date: faker.date.betweens({
        from: "2020-01-01T00:00:00.000Z",
        to: "2030-01-01T00:00:00.000Z",
      }),
    };
    const response = await api.addPost(newPost);
    setPosts([...posts, { ...newPost, id: response._id }]);
  };

  const removePosts = async (removedIds) => {
    setPosts(posts.filter((post) => !removedIds.includes(post.id)));
    await Promise.all(removedIds.map((id) => api.removePost(id)));
  };

  const search = async () => {
    const response = await api.search(query);

    setSelection(
      response.hits.hits.map((hit) => {
        return hit._id;
      })
    );
  };

  useEffect(() => {
    api.getAllPosts().then((response) => {
      setPosts(
        response.hits.hits.map((hit) => ({
          id: hit._id,
          ...hit._source,
        }))
      );
    });
  }, []);

  return (
    <>
      <TopMenu />
      <Container maxWidth="md">
        <TextField
          placeholder="Search"
          fullWidth
          value={query}
          onInput={(event) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ pr: 1.5 }} position="start">
                <IconButton onClick={search}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <EditMenu
          selection={selection}
          addPost={addPost}
          removePosts={removePosts}
        />
        <div style={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={posts}
            columns={columns}
            pageSize={10}
            checkboxSelection
            onSelectionModelChange={(model) => setSelection(model)}
            selectionModel={selection}
          />
        </div>
      </Container>
    </>
  );
};

export default App;
