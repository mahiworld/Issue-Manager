import React,{useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Form.css';

const UpdateIssue =()=>{
   const {id} = useParams()
	// console.log(id)
	const [issue, setIssue] = useState({
		    projectName:"",
            title : "",
            description : "",
            priority : ""

	})

	const options = {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        'Accept': "application/json"
                    }
        };

	useEffect(()=>{
	    fetch(`/issue/${id}`, options).then(response=> response.json())
	    					.then(issue => setIssue(issue))
	},[id])
	

	function handleChange(event){
	  	const value = event.target.value;
	  	setIssue({
	  		...issue,
	  		[event.target.name]: value
	  	})
	}

 	function onFormSubmit(e, props){
        e.preventDefault()


        var formData = {}
       
        formData ['projectName'] = issue.projectName;
        formData ['title'] = issue.title;
        formData ['description'] = issue.description;
        formData ['priority'] = issue.priority;
  
        // console.log(formData)

        const options = {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-type": "application/json"
                    }
        };
        // console.log(options)
        
        fetch(`/issue/${id}`, options).then(response=>response.json)
                                      .then(message=>console.log(message))
       	IssueUpdated();
        refreshPage();
    }

    const nevigate = useNavigate();
	function IssueUpdated(){
	    	nevigate(`/`);
	}
    function refreshPage() {
        window.location.reload(false);
    }


    return(

            <div>
              <form onSubmit={onFormSubmit} className = "form">
              <div className="heading">Log An Issue:</div>
                <div className="fieldContainer">
                    <label htmlFor="projectName">Project Name:</label>
                    <input id="projectName" name="projectName" defaultValue={issue.projectName} placeholder="Project Name" type="text" value={issue.projectName} onChange={handleChange} />
                </div>
                
                <div className="fieldContainer">
                    <label htmlFor="title">Issue Title:</label>
                    <input id="title" name="title" defaultValue={issue.title} placeholder="Issue Title" type="text" value={issue.title} onChange={handleChange} />
                </div>

                <div className="fieldContainer">
                    <label htmlFor="description">Description:</label>
                    <textarea rows="4" cols="49" id="description" name="description" defaultValue={issue.description} type="text" value={issue.description} onChange={handleChange} ></textarea>
                </div>

                <div className="fieldContainer">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" name="priority" defaultValue={issue.priority} value={issue.priority} onChange={handleChange}>
                        <option value="null">Choose Priority</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                    </select>
                </div>
              <button className="btn" type="submit">Update Issue</button>
              </form>
            </div>
    )
}

export default UpdateIssue