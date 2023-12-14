import React, { useRef, useState } from "react";
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
  {id: 1, title: 'Javascript', body: 'Description'},
  {id: 2, title: 'Javascript 2', body: 'Description'},
  {id: 3, title: 'Javascript 3', body: 'Description'},
 ])

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
      <div>
        <MySelect
        defaultValue="Сортировка"
        options={[
          {value:'title' , name:'По названию'},
          {value:'body' , name:'По описанию'},
        ]}
        />
      </div>
     {posts.length 
     ? <PostList remove={removePost} posts={posts} title='Посты про JS'/>
     : <h1 style={{textAlign: "center"}}>
      Посты не найдены!
      </h1>
     }
         
    </div> 
  );
}

export default App;
