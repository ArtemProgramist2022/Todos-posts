import React, { } from 'react';
import { connect, Provider } from "react-redux";
import TodoListContainer from './components/TodoList';
import store from './redux/redux';
import { getPosts, addPost } from './reducer/post-reducer'
import { Route, Routes } from 'react-router-dom';
import FullPost from './components/FullPost';
import './style/App.css'

function App(props) {

  return (
    <div>
        <Routes>
          <Route exact path='/' element={<TodoListContainer
            getPosts={props.getPosts}
            addPost={props.addPost}
            getPhoto={props.getPhoto}
            />}/>

          <Route path='/:id' element={<FullPost todos={props.todos} />}/>
        </Routes>
    </div>
  );
}

let mapStateToProps = (state) => ({
  todos: state.todos.items,
})

const AppContainer = connect(mapStateToProps, {
  getPosts, addPost
})(App)


let MainApp = (props) => {
  return <Provider store={store} >
    <AppContainer state={store.getState()} />
  </Provider>
}

export default MainApp;
