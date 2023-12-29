import React, { useEffect, useMemo, useRef, useState } from "react";
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
import PostService from "./API/postService";
import Loader from "./component/UI/Loader/Loader";

// import PostForm from "./component/PostForm";

function App() {
 const [posts, setPosts] = useState ([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts =usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts()
  },[])

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout (async() => {
      const posts = await PostService.getAll();
      setPosts(posts)
      setIsPostsLoading(false);
    }, 1000)
    
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }
  
  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POST</button> */}
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
       {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
       }
    </div> 
  );
}

export default App;
