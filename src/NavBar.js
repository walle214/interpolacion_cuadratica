import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
    
        return <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    <img src="favicon.ico" width="30" height="30" className="d-inline-block align-top" alt="" />
                    <p className="ml-2" style={{display:'inline'}}>Interpolacion Cuadratica</p>
                </a>
            </nav>
        </div >
    }
}