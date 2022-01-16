import axios from 'axios'

export const postsAPI = {
    getPosts(userId) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    },
    getPhoto() {
        return axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos`)
    },
    addPost(id, title, body) {
        return axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify({
                id, title, body, userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    },
    updatePost(id, title, body) {
        return axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            body: JSON.stringify({
                id, title, body,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    },
    deletePost(id) {
        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    },
    getComments(id) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    } 
}