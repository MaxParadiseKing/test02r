import { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState ( {title: '', body: ''})

    const addNewPost=(e)=> {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
              create(newPost)
              setPost({title: '', body: ''})
       }
       
    return (
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
    );
}

export default PostForm;



