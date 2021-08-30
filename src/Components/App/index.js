import './App.css';
import AuthorsList from '../AuthorsList';
import BooksList from '../BooksList';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route path="/books">
          <BooksList/>
          </Route>
          <Route path="/authors">
            <AuthorsList />
          </Route>
          <Route path="/">
            <AuthorsList />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
