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
// import PostForm from "./component/PostForm";

  

function App() {
 const [posts, setPosts] = useState ([
  {id: 1, title: 'аа', body: 'бб'},
  {id: 2, title: 'гг', body: 'аа'},
  {id: 3, title: 'вв', body: 'яя'},
  // {id: 3, title: 'ccJavascript 3', body: 'bbDescription'}
 ])

  const [selectedSort, setselectedSort] = useState('')
  const [searchQuery, setsearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    console.log('Отработала Функция сортед')
    if (selectedSort)
    {
        return [...posts].sort((a,b)=> a[selectedSort].localeCompare(b[selectedSort]))
    }
        return posts;
  },[selectedSort, posts])

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !==post.id))
  }
  
  const sortPosts = (sort) => {
    setselectedSort(sort);
  }
  
  return (
    <div className="App">
     <PostForm create={createPost}/>
     <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
            value={searchQuery}
            onChange={e => setsearchQuery(e.target.value)}
            placeholder="Поиск..."
        />
        <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Сортировка"
        options={[
          {value:'title' , name:'По названию'},
          {value:'body' , name:'По описанию'},
        ]}
        />
      </div>
     {posts.length 
     ? <PostList remove={removePost} posts={sortedPosts} title='Посты про JS'/>
     : <h1 style={{textAlign: "center"}}>
      Посты не найдены!
      </h1>
     }
         
    </div> 
  );
}

export default App;
