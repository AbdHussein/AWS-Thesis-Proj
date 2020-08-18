import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/landing/landing';
import Map from './components/mainMap/map';
import Provider from './components/provider/provider';
import Dashboard from './components/dashboard/dashboard';
import ViewPost from './components/dashboard/posts/viewPost';
import signIn from './components/Auth/SignIn';
import signUp from './components/Auth/SignUp';
import Feeds from './components/landing/feeds';
import FavProviders from './components/provider/favProvider';
import WishList from './components/provider/wishList';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/map' component={Map} />
          <Route path='/provider' component={Provider} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/post' component={ViewPost} />
          <Route path='/signIn' component={signIn} />
          <Route path='/signUp' component={signUp} />
          <Route path='/wishlist' component={WishList} />
          <Route path='/feeds' component={Feeds} />
          <Route path='/favprovider' component={FavProviders} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
