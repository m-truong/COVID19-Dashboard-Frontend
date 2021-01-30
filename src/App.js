import { useState, useEffect, useContext } from "react"
import { Route, Link, Switch } from "react-router-dom"
import { MyContext } from "./Components/Context"
import { Navbar } from "react-bootstrap"
import VideosPage from "./RoutePages/VideosPage"
import RegisterPage from "./RoutePages/RegisterPage"
import LoginPage from "./RoutePages/LoginPage"
import WorldwideDashboardPage from "./RoutePages/WorldwideDashboardPage"
import StatesDashboardPage from "./RoutePages/StatesDashboardPage"
import ReactAudioPlayer from "react-audio-player"
import outbreak from "./Public/covid19_audio.mp3"
import covid19 from "./Public/covid19_animation2.mp4"
import axios from "axios"

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("")
  const [token, setToken] = useState("")

  const logOutHandler = (evt) => {
    setToken("")
    setUserLoggedIn("")
    localStorage.clear()
    window.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    };
    if (localStorage.getItem("userLoggedIn")) {
      setUserLoggedIn(localStorage.getItem('userLoggedIn'))
    };
  }, [userLoggedIn]);

  return (
    <>
      <MyContext.Provider value={{userData: [userLoggedIn, setUserLoggedIn], tokenData: [token, setToken]}}>
        <ReactAudioPlayer src={outbreak} autoPlay loop volume={0.2}/>
        <video autoPlay loop muted
        style={{
          filter: "opacity(90%) saturate(100%) contrast(100%)",
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}>
          <source src={covid19} type="video/mp4"></source>
        </video>
        <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="shadow p-3 mb-3 justify-content-between">
          <Navbar.Brand href="/">
            <img width="30" height="30" className="d-inline-block align-top" alt="COVID_19_img"
              src="https://images.theconversation.com/files/319386/original/file-20200309-167285-1p9yqjv.png?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
            /> COVID-19 Information Portal
          </Navbar.Brand>
          <Link className="" to="/">
            News Feed <i className="fas fa-syringe"></i>
          </Link>
          <Link className="" to="/world">
            World Dashboard <i className="fas fa-globe-americas"></i>
          </Link>
          <Link className="" to="/states">
            US Dashboard <i className="fas fa-flag-usa"></i>
          </Link>
          <Link className="" to="/videos">
            Informative Videos <i className="fas fa-viruses"></i>
          </Link>
          {
            userLoggedIn
              ? (
                <>
                  <span className="username">Welcome Back {userLoggedIn}! <i class="fas fa-user"></i></span>
                  <button href="/" onClick={logOutHandler}> Log Out </button>
                </>
              )
              : (
                <>
                  <Link className="" to="/loginpage">
                    Visitor Login <i class="fas fa-sign-in-alt"></i>
                  </Link>
                  <Link className="" to="/registerpage">
                    New Visitor Sign-up <i class="fas fa-registered"></i>
                  </Link>
                </>
              )
          }
        </Navbar>
        <main>
          <Switch>
            <Route exact path="/world" component={WorldwideDashboardPage} />
            <Route path="/states" component={StatesDashboardPage} />
            <Route path="/videos" component={VideosPage} />
            <Route path="/loginpage" component={LoginPage} />
            <Route path="/registerpage" component={RegisterPage} />
            {/* <Route path="/product/:id" render={(routerProps) => { return <ShowPage routerProps={routerProps} /> }} /> */}
            {/* <Route exact path="/" component={NewsFeedPage} /> */}
          </Switch>
        </main>
        <footer className="">
          <Link className="" to="/"> COVID-19 Information Portal 🦠 </Link>
        </footer>
      </MyContext.Provider>
    </>
  );
}

export default App;