import React, { Component } from 'react';
import axios from 'axios';

class Actions extends Component {
    constructor(props){
        super(props);
        this.state = {
            actions:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/actions')
            .then(response =>{
                this.setState({actions:response.data});
            })
            .catch(err =>{
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                Hello
                <ul>
                    {this.state.actions.map(action =>{
                        return(
                            <li key={action.id}>
                            <h5>{action.description}</h5>
                            <p>{action.notes}</p>
                            <p>{action.completed}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Actions;