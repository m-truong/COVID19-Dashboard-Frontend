import { useState, useEffect, useContext } from "react"
import { Route, Link, Switch } from "react-router-dom"
import DashboardPage from "./RoutePages/DashboardPage"
import VideosPage from "./RoutePages/VideosPage"
import axios from "axios"
import { Navbar } from "react-bootstrap"

function App() {


  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        expand="lg"
        style={{ background: "white" }}
        // rounded
        className="shadow p-3 mb-0  justify-content-between"
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
        <Link className="x-nav-link" to="/coviddashboard">COVID-19 Live Dashboard <i class="fas fa-globe-americas"></i></Link>
        <Link className="x-nav-link" to="/infovideos">More Information YouTube Videos <i class="fas fa-head-side-cough"></i></Link>
      </Navbar>
      <main>
        <Switch>
          <Route path="/coviddashboard" component={DashboardPage} />
          <Route path="/infovideos" component={VideosPage} />

          {/* <Route path="/product/:id" render={(routerProps) => { return <ShowPage routerProps={routerProps} /> }} /> */}
          <Route exact path="/" component={DashboardPage} />
        </Switch>
      </main>
      <footer className="x-row x-center">
        <Link className="" to="/"> COVID-19 Info Portal 🦠 </Link>
      </footer>
    </>
  );
}

export default App;