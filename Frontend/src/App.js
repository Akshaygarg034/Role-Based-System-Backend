import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import Admin from './components/Admin';
import SuperAdmin from './components/SuperAdmin';
import Usernotes from './components/Usernotes';
import Main from './components/Main';


function App() {
  const [alert, changeAlert] = useState(null);
  const [islogin, setIsLogin] = useState(false);

  let showAlert = (msg, type) => {
    changeAlert({
      msg: msg,
      type: type
    })

    setTimeout(() => {
      changeAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar islogin = {islogin} setIsLogin = {setIsLogin}/>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Main/>
              </Route>
              <Route exact path="/student">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/superadmin">
                <SuperAdmin />
              </Route>
              <Route exact path="/notes/:id">
                <Usernotes/>
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}  setIsLogin = {setIsLogin}/>
              </Route>
              <Route exact path="/signup" showAlert={showAlert}>
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
