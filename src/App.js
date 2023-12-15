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
// import PostForm from "./component/PostForm";

  

function App() {
 const [posts, setPosts] = useState ([
  {id: 1, title: 'аа', body: 'бб'},
  {id: 2, title: 'гг', body: 'аа'},
  {id: 3, title: 'вв', body: 'яя'},
  // {id: 3, title: 'ccJavascript 3', body: 'bbDescription'}
 ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    console.log('Отработала Функция сортед')
    if (filter.sort)
    {
        return [...posts].sort((a,b)=> a[filter.sort].localeCompare(b[filter.sort]))
    }
        return posts;
  },[filter.sort, posts])

  const sortedAndSearchedPosts = useMemo (() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  },[filter.query, sortedPosts])

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }
  
  return (
    <div className="App">
     <PostForm create={createPost}/>
     <hr style={{margin: '15px 0'}}/>
      <PostFilter 
      filter={filter}
       setFilter={setFilter}
       />
     {sortedAndSearchedPosts.length   
     ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
     : <h1 style={{textAlign: "center"}}>
      Посты не найдены!
      </h1>
     }
         
    </div> 
  );
}

export default App;
