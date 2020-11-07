import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import SinglePost from './components/SinglePost';
import Messages from './components/Messages';
import Earning from './components/Earning';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile/:userId" component={UserProfile} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/post/:postId" component={SinglePost} />
          <Route path="/messages" component={Messages} />
          <Route path="/earning" component={Earning} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
