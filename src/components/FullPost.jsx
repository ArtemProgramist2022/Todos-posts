import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cl from './../style/FullItem.module.css'

const FullPost = (props) => {

    const { id } = useParams();

    return (
        <div className={cl.fullPostItem}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <NavLink to='/' className='link'>Back</NavLink>
            </div>

            <div style={{width: '100%'}}>
                {props.todos.map((todo, index) => {
                    if (todo.id.toString() === id) {
                        return (
                            <div className={'postItem'} style={{margin: '5px 0'}} key={index}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img className='userPostPhoto' src={todo.url} alt='userPhoto' />
                                    <h1>{todo.title}</h1>
                                </div>
                                <p>{todo.body}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FullPost;