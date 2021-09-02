import "./App.css";
import { Main, Login } from "./Resources/Pages";
import { Footer, Header } from "./Resources/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {

  return (
    <RecoilRoot>
      <div className="root-view">
        <Header className="header"></Header>
        <Router className="body">
          <Switch>
            <Route path="/">
              <Login />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
          </Switch>
        </Router>
        <Footer className="footer"></Footer>
      </div>
    </RecoilRoot>
  );
}

export default App;
