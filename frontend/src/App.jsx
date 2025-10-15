import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import faker from "@faker-js/faker";
import { useEffect } from "react";
import { TopMenu } from "./components/TopMenu";
import { EditMenu } from "./components/EditMenu";
import { columns } from "./constants/columns";
import { api } from "./services/api"

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
