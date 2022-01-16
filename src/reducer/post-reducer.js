import { postsAPI } from "../api/api";

let initialState = {
    items: [],
    comments: [],
    commentsShow: [],
    getUserId: 1,
    isFetching: false,
    deleteProgress: []
}

const GET_POSTS = 'GET_POSTS'
const DELETE_POST = 'DELETE_POST'
const ADD_POST = 'ADD_POST'
const UPDATE_TITLE_POST = 'UPDATE_TITLE_POST'
const GET_COMMENTS = 'GET_COMMENTS';
const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
const GET_PHOTO = 'GET_PHOTO'
const TOGGLE_FETCHING_PROGRESS = 'TOGGLE_FETCHING_PROGRESS'
const DELETE_PROGRESS = 'DELETE_PROGRESS'

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS: {
            return { ...state, items: [...action.posts, ...state.items], getUserId: state.getUserId + 1 }
        }
        case DELETE_POST: {
            return { ...state, items: state.items.filter(item => item.id !== action.postId) }
        }
        case DELETE_PROGRESS: {
            return {
                ...state, deleteProgress: action.isDelete
                    ? [...state.deleteProgress, action.postId]
                    : state.deleteProgress.filter(id => id === action.postId)
            }
        }
        case ADD_POST: {
            return { ...state, items: [action.post, ...state.items] }
        }
        case UPDATE_TITLE_POST: {
            return {
                ...state, items: state.items.map(item => {
                    if (item.id === action.id) {
                        item.title = action.title
                        item.body = action.body
                    }
                    return item;
                })
            }
        }
        case GET_COMMENTS: {
            return { ...state, comments: [...state.comments, ...action.comments], commentsShow: [...state.commentsShow, action.id] }
        }
        case CLEAR_COMMENTS: {
            return { ...state, comments: [] }
        }
        case GET_PHOTO: {
            return {
                ...state, items: state.items.map(item => {
                    action.data.some(dataItem => {
                        if (item.url) return true;
                        if (item.id.toString() === dataItem.id.toString()) {
                            item.url = dataItem.thumbnailUrl
                            return true;
                        }
                    })
                    return item;
                })
            }
        }
        case TOGGLE_FETCHING_PROGRESS: {
            return { ...state, isFetching: action.isFetching }
        }
        default: return state;
    }
}

export const getPostsSuccess = (posts, dataId) => ({
    type: GET_POSTS,
    posts, dataId
})

export const getPosts = (userId) => async (dispatch) => {
    dispatch(toggleFetchingProgress(true))
    const res = await postsAPI.getPosts(userId)
    const resPhoto = await postsAPI.getPhoto()
    dispatch(getPostsSuccess(res.data))
    dispatch(getPhotoSuccess([...resPhoto.data]))
    dispatch(toggleFetchingProgress(false))
}

export const deleteProgress = (isDelete, postId) => ({
    type: DELETE_PROGRESS,
    postId, isDelete
})

export const deletePostSuccess = (postId) => ({
    type: DELETE_POST,
    postId
})

export const deletePost = (id) => async (dispatch) => {
    dispatch(deleteProgress(true, id))
    const res = await postsAPI.deletePost(id)
    dispatch(deletePostSuccess(id))
    dispatch(deleteProgress(false, id))
}

export const addPostSuccess = (post, id) => {
    return {
        type: ADD_POST,
        post, id
    }
}

export const addPost = (id, title, body) => async (dispatch) => {
    dispatch(toggleFetchingProgress(true))
    const res = await postsAPI.addPost(id, title, body)
    dispatch(addPostSuccess(JSON.parse(res.data.body), id))
    dispatch(toggleFetchingProgress(false))
}

export const updatePostSuccess = (resBody) => {
    let id = resBody.id
    let title = resBody.title
    let body = resBody.body
    return {
        type: UPDATE_TITLE_POST,
        title, id, body
    }
}

export const updatePost = (id, title, body) => async (dispatch) => {
    const res = await postsAPI.updatePost(id, title, body)
    dispatch(updatePostSuccess(JSON.parse(res.data.body)))
}

export const getCommentsSuccess = (comments, id) => {
    return {
        type: GET_COMMENTS,
        comments, id
    }
}

export const getComments = (id) => async (dispatch) => {
    const res = await postsAPI.getComments(id)
    dispatch(getCommentsSuccess(res.data, id))
}

export const clearComments = (id) => ({
    type: CLEAR_COMMENTS,
    id
})

export const getPhotoSuccess = (data) => ({
    type: GET_PHOTO,
    data
})

export const toggleFetchingProgress = (isFetching) => ({
    type: TOGGLE_FETCHING_PROGRESS,
    isFetching
})

export default postReducer