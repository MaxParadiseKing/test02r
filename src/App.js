import React, { useRef, useState } from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import './Styles/app.css';
import PostItem from "./component/PostItem";
import PostList from "./component/PostList";
import MyButton from "./component/UI/button/MyButton";
import MyInput from "./component/UI/input/MyInput";
// import PostForm from "./component/PostForm";



function App() {
 const [posts, setPosts] = useState ([
  {id: 1, title: 'Javascript', body: 'Description'},
  {id: 2, title: 'Javascript 2', body: 'Description'},
  {id: 3, title: 'Javascript 3', body: 'Description'},
 ])

 const [post, setPost] = useState ( {title: '', body: ''})
 

 const addNewPost=(e)=> {
  e.preventDefault()
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: '', body: ''})
 }

  return (
    <div className="App">
      <form>
        {/* Управляемый компанент */}
        <MyInput 
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
        type ="Text" 
        placeholder="Название поста"/>
        {/* Не упроавляемый компанент */}
        <MyInput 
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
        type ="Text" 
        placeholder="Описание поста"/>
        <MyButton onClick={addNewPost}> Создать пост </MyButton>
      </form>
         <PostList posts={posts} title='Посты про JS'/>
    </div> 
  );
}

export default App;
