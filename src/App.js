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
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";

function App() {
 const [posts, setPosts] = useState ([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts =usePosts(posts, filter.sort, filter.query);
  let pagesArray = getPagesArray(totalPages);

  // console.log([pagesArray])
  const [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

   console.log(totalPages)
  useEffect(() => {
    fetchPosts()
  },[])

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
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
       {postError &&
       <h1>Произошла ошибка! ${postError}</h1>
       }
       {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
       }
       <div className="page__wrapper">
       {pagesArray.map(p=>
            <span
            onClick={()=> setPage(p)} 
            key={p} 
            className={page === p ? 'page page__current' : 'page'}
            >
              {p}
              </span>
        )
       }
       </div>
       
    </div> 
  );
}

export default App;
