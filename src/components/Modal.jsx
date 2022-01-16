import React, { useState } from 'react';
import cl from './../style/Modal.module.css'

const Modal = (props) => {

    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    let [id, setId] = useState('');

    return (
        <div className={cl.modalWindow}>
            <div className={cl.modalBody}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', 'flexDirection': 'column' }}>
                    <form
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', 'flexDirection': 'column' }}
                        onSubmit={e => e.preventDefault()}>
                        <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
                        <input type='text' required value={body} onChange={(e) => setBody(e.target.value)} placeholder='body' />
                        <input type='text' required value={id} onChange={(e) => setId(e.target.value)} placeholder='id' />
                        <div>
                            <button
                                type='submit'
                                className='btn'
                                onClick={() => {
                                    if (!title || !body || !id) return false;
                                    props.addPost(id, title, body)
                                    setTitle('');
                                    setBody('');
                                    props.setIsModal(false)
                                }}>Add post</button>
                            <button
                                className='btn'
                                onClick={() => props.setIsModal(false)}>Close</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Modal