import React, { useMemo, useRef, useState } from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import './Styles/app.css';
import PostItem from "./component/PostItem";
import PostList from "./component/PostList";
import MyButton from "./component/UI/button/MyButton";
import MyInput from "./component/UI/input/MyInput";
import PostForm from "./component/PostForm";
import MySelect from "./component/UI/select/MySelect";
import PostFilter from "./component/PostFilter";
import MyModal from "./component/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";

// import PostForm from "./component/PostForm";

  

function App() {
 const [posts, setPosts] = useState ([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts =usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
  }

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }
  
  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POST</button>
      <MyButton style={{marginTop: 30}}onClick={() => setModal(true)}> 
          Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}> 
        <PostForm create={createPost}/> 
      </MyModal>
     <hr style={{margin: '15px 0'}}/>
      <PostFilter 
      filter={filter}
       setFilter={setFilter}
       />
     <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
    </div> 
  );
}

export default App;
