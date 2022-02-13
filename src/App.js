import "./App.css";
import { Main, Login, Users, Posts, Applications, ReferralCodes } from "./Resources/Pages";
import { Footer, Header } from "./Resources/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./RecoilResources/Atoms";
import * as _ from 'lodash';
function App() {
  const [currentUser] = useRecoilState(userState);
  console.log(currentUser, "user");

  let renderLogInRoutes = function () {
    return (
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    );
  };

  let renderLoggedInRoutes = function () {
    return (
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/applications">
          <Applications />
        </Route>
        <Route path="/referralCodes">
          <ReferralCodes />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    );
  };

  return (
    <div className="root-view">
      <Header className="header"></Header>
      <Router className="body">
        {_.isEmpty(currentUser) ? renderLogInRoutes() : renderLoggedInRoutes()}
      </Router>
      <Footer className="footer"></Footer>
    </div>
  );
}

export default App;
