import React, { Component } from 'react';

class SideBarComponent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="sidebar">
                <a className="active" href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
          </div>
        );
    }
}

export default SideBarComponent;