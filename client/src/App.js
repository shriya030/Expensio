// import React from "react";
// import Home from "./Home";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Signup from "./components/Auth/Signup";
// // import Login from "./components/Auth/Login";
// import { Container } from "react-bootstrap";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <Container
//         className="d-flex align-items-center justify-content-center"
//         style={{ minHeight: "100vh" }}
//       >
//         <Signup />
//       </Container>
//     </AuthProvider>
//     // <Router>
//     //   <Switch>
//     //     <Route path="/login" component={Login} />
//     //     <Route path="/signup" component={Signup} />
//     //     <Route exact path="/" component={Home} />
//     //   </Switch>
//     // </Router>
//   );
// }

// export default App;

import React from "react";
import Signup from "./components/Auth/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Auth/Dashboard";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import Home from "./Home";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {/* className="w-100" style={{ maxWidth: "400px" }} */}
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
