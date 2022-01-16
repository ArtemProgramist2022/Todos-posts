import React, { useState } from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deletePost, updatePost, getComments } from '../reducer/post-reducer';
import Modal from './Modal';
import cl from './../style/TodoList.module.css'
import Preloader from './Preloader';

const TodoList = (props) => {

    let [isModal, setIsModal] = useState(false)

    return (
        <div className={cl.container}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <button
                    className='btn'
                    onClick={() => {
                        setIsModal(true)
                    }}>{props.isFetching ? <Preloader /> : 'Add post'}</button>

                {isModal && <Modal setIsModal={setIsModal} addPost={props.addPost} />}
                <button
                    className='btn'
                    onClick={() => {
                        props.getPosts(props.userId)
                    }}>{props.isFetching ? <Preloader /> : 'Get posts'}</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                {props.todos.length ? props.todos.map((todo, index) => {
                    return (
                        <TodoItem key={index} getComments={props.getComments}
                            updatePost={props.updatePost}
                            showAllPost={props.showAllPost}
                            deletePost={props.deletePost}
                            deleteProgress={props.deleteProgress}
                            urlOfPhoto={todo.url}
                            id={todo.id}
                            title={todo.title}
                            body={todo.body}
                            commentsShow={props.commentsShow}
                        />
                    )
                }) : <h1 style={{ textAlign: 'center', fontSize: '30px' }}>No posts</h1>}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    todos: state.todos.items,
    commentsShow: state.todos.commentsShow,
    userId: state.todos.getUserId,
    isFetching: state.todos.isFetching,
    deleteProgress: state.todos.deleteProgress
})

const TodoListContainer = connect(mapStateToProps, {
    deletePost, updatePost, getComments
})(TodoList)

export default TodoListContainer;