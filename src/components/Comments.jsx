import React, { useState } from 'react';
import { connect } from 'react-redux';
import cl from './../style/Comments.module.css'

const Comments = (props) => {
    return (
        <div>
            {props.comments.map((comment, index) => {
                if (comment.postId.toString() === props.id.toString()) {
                    return (
                        <div className={cl.comments} key={index}>
                            <p><span className={cl.commentName}>Name</span>: {comment.name}</p>
                            <p><span className={cl.commentName}>Email</span>: {comment.email}</p>
                            <p><span className={cl.commentName}>Body</span>: {comment.body}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}

let mapStateToProps = state => ({
    comments: state.todos.comments,
})

const CommentsContainer = connect(mapStateToProps, {

})(Comments)

export default CommentsContainer