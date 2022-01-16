import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { clearComments } from '../reducer/post-reducer';
import cl from './../style/TodoItem.module.css'
import CommentsContainer from './Comments'

const TodoItem = ({ commentsShow, urlOfPhoto, deletePost, deleteProgress, getComments, updatePost, id, title, body }) => {

    let [editMode, setEditMode] = useState(false)
    let [editModeBody, setEditModeBody] = useState(false)
    let [valueTitle, setValueTitle] = useState(title)
    let [valueBody, setValueBody] = useState(body)
    let [isComment, setIsComment] = useState(false)

    useEffect(() => {
        setValueTitle(title)
    }, [title])

    return (
        <div style={{ padding: '5px', width: '100%' }}>
            <div className={`postItem`} key={id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <NavLink to={'/' + id.toString()}>
                        <img className='userPostPhoto' src={urlOfPhoto} alt='userPhoto' />
                    </NavLink>

                    {!editMode
                        ? <h1 onClick={() => setEditMode(true)}>{title}</h1>
                        : <div><input onBlur={() => {
                            setEditMode(false)
                            updatePost(id, valueTitle, body)
                        }} type='text' autoFocus value={valueTitle} onChange={(e) => { setValueTitle(e.target.value) }} /></div>}
                </div>

                {!editModeBody
                    ? <p onClick={() => setEditModeBody(true)}>{body}</p>
                    : <div><input onBlur={() => {
                        setEditModeBody(false)
                        updatePost(id, title, valueBody)
                    }} type='text' autoFocus value={valueBody} onChange={(e) => setValueBody(e.target.value)} />
                    </div>}

                <div style={{paddingTop: '10px'}}>
                    <button disabled={deleteProgress.some(postId => postId === id)} className='btn' onClick={() => deletePost(id)}>Delete</button>
                    <NavLink to={`/` + id.toString()} className='link'>Show</NavLink>

                    {!isComment
                        ? <button className='btn' onClick={() => {
                            if (!commentsShow.includes(id)) {
                                getComments(id)
                            }
                            setIsComment(true)
                        }}>Show comments</button>
                        : <button className='btn' onClick={() => {
                            setIsComment(false)
                            clearComments(id)
                        }}>Hide comments</button>}
                </div>
                {isComment && <CommentsContainer id={id} />}
            </div>
        </div>
    )
}

export default TodoItem;