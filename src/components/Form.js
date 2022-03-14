import React from 'react';
import './Form.css';
import IssueDetails from "./IssueDetails";

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            projectName:"",
            title : "",
            description : "",
            priority : ""
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(e, props){
        e.preventDefault()

        var formData = {}
        
        formData ['projectName'] = this.state.projectName;
        formData ['title'] = this.state.title;
        formData ['description'] = this.state.description;
        formData ['priority'] = this.state.priority;

        // console.log(formData)

        const options = {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-type": "application/json"
                    }
        };
        // console.log(options)
        
        fetch('/issue', options).then(response=>response.json)
                                      .then(message=>console.log(message))
        this.refreshPage()
    }
    refreshPage() {
        window.location.reload(false);
    }
        
    render(){
        return(

            <div>
              <form onSubmit={this.onFormSubmit} className = "form">
              <div className="heading">Log An Issue:</div>
                <div className="fieldContainer">
                    <label htmlFor="projectName">Project Name:</label>
                    <input id="projectName" name="projectName" placeholder="Project Name" type="text" onChange={(e) => {this.setState({projectName: e.target.value})}} />
                </div>
                
                <div className="fieldContainer">
                    <label htmlFor="title">Issue Title:</label>
                    <input id="title" name="title" placeholder="Issue Title" type="text" onChange={(e) => {this.setState({title: e.target.value})}} />
                </div>

                <div className="fieldContainer">
                    <label htmlFor="description">Description:</label>
                    <textarea rows="4" cols="49" id="description" name="description" type="text" onChange={(e) => {this.setState({description: e.target.value})}} ></textarea>
                </div>

                <div className="fieldContainer">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" name="priority" onChange={(e) => {this.setState({priority: e.target.value})}}>
                        <option value="null">Choose Priority</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                    </select>
                </div>
              <button className="btn" type="submit">Submit Issue</button>
              </form>
              <IssueDetails/>
            </div>
        )
    }
}

export default Form