import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      projects: []
    };
  };

  componentDidMount(){
    axios.get('http://localhost:5000/api/projects')
      .then(response =>{
        console.log(this.state, "before");
        this.setState({projects: response.data})
        console.log(this.state, "after");
      })
      .catch(err =>{
        console.log(err);
      })
  }
  render() {
    console.log(this.state.projects, "this.state.projects")
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To-Do List for the Weekend</h1>
        </header>
        <div className="App-intro">
        <ul className="list">
          {this.state.projects.map(project =>{
            return(
              <li className="card" key={project.id}>
                <h3>{project.name}</h3>
                <p className="description">Description:{project.description}</p>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
