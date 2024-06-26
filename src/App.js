import React from "react";
import "./App.css";
import { useStateValue } from "./Components/Siderbar/StateProvider";
import Login from "./Components/Siderbar/Login";
import Chat from  "./Components/Siderbar/Chat";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Siderbar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    
    <div className="App">
      <Router>
        {!user ? (
          <Login />
           /*<h1> Login</h1> */
        ): (
          <>
        
        {/* Header */}
      <Header />
      
      <div className="app_body">
        
        <Sidebar />
        {/* Sidebar */}
      
        {/*React-Router -> chat Screen */}

        <Switch>
          <Chat />
          <Route path="/channel/:channelid">
            
          <h1> chat screen</h1>
          </Route>"
          <Route path="/">
          <h1> welcome</h1>
          
          </Route>
        </Switch>


      </div>
      </>
      
    )}

      </Router>
    

    </div>
  );
}

export default App;
