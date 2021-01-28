import { useState, useEffect, useContext } from "react"
import { Route, Link, Switch } from "react-router-dom"
import { MyContext } from "./Components/Context"
import { Navbar } from "react-bootstrap"
import VideosPage from "./RoutePages/VideosPage"
import RegisterPage from "./RoutePages/RegisterPage"
import LoginPage from "./RoutePages/LoginPage"
import axios from "axios"
import WorldwideDashboardPage from "./RoutePages/WorldwideDashboardPage"
import StatesDashboardPage from "./RoutePages/StatesDashboardPage"

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("") // username // password: "",
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // debug
  console.log(userLoggedIn)

  const logOutHandler = (evt) => {
    setToken("")
    setUserLoggedIn("")
    localStorage.clear()
    window.location.href = "/";
  }

  useEffect(() => {
    // If localStorage contains a "token", "token" state is set to it's value.
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    };
    // If localStorage stores logged in "Customer" object, "currentCustomerLoggedIn" state is set to it's value. 
    if (localStorage.getItem("userLoggedIn")) {
      setUserLoggedIn(localStorage.getItem('userLoggedIn'))
    };
  }, [userLoggedIn]);

  return (
    <>
      <MyContext.Provider
        value={{
          userData: [userLoggedIn, setUserLoggedIn],
          tokenData: [token, setToken]
        }}>
        <Navbar
          bg="dark"
          variant="dark"
          sticky="top"
          expand="lg"
          style={{ background: "white" }}
          // rounded
          className="shadow p-3 mb-0 justify-content-between"
        >
          <Navbar.Brand href="/">
            <img
              src="https://images.theconversation.com/files/319386/original/file-20200309-167285-1p9yqjv.png?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="COVID_19_img"
            />
          </Navbar.Brand>
          <Link className="" to="/coviddashboard">COVID-19 Live Dashboard <i className="fas fa-globe-americas"></i></Link>
          <Link className="" to="/infovideos">More Information YouTube Videos <i className="fas fa-head-side-cough"></i></Link>
          {
            userLoggedIn
              ? (
                <>
                  <span>Welcome Back {userLoggedIn}! <i class="fas fa-user"></i></span>
                  <button href="/" onClick={logOutHandler}> Log Out </button>
                </>
              )
              : (
                <>
                  <Link className="" to="/loginpage">Visitor Login <i class="fas fa-sign-in-alt"></i></Link>
                  <Link className="" to="/registerpage">New Visitor Sign-up <i class="fas fa-registered"></i></Link>
                </>
              )
          }
        </Navbar>
        <main>
          <Switch>
            <Route path="/statesdashboard" component={StatesDashboardPage} />
            <Route path="/infovideos" component={VideosPage} />
            <Route path="/loginpage" component={LoginPage} />
            <Route path="/registerpage" component={RegisterPage} />
            {/* <Route path="/product/:id" render={(routerProps) => { return <ShowPage routerProps={routerProps} /> }} /> */}
            <Route exact path="/" component={WorldwideDashboardPage} />
          </Switch>
        </main>
        <footer className="">
          <Link className="" to="/"> COVID-19 Info Portal 🦠 </Link>
        </footer>
      </MyContext.Provider>
    </>
  );
}

export default App;