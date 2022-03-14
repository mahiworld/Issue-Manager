import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './IssueDetails.css';
import UpdateIssue from './UpdateIssue';
import Popup from "./Popup";

const IssueDetails = ()=>{
	const [issues, setIssues] = useState([{}])
	const [isOpen, setIsOpen] = useState(false);
	const [idvalue, setIdvalue] = useState("")

	const options = {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        'Accept': "application/json"
                    }
    };

	useEffect(()=>{
	    fetch('/issues', options).then(response=> response.json()).then(data => setIssues(data))
	},[])


	const nevigate = useNavigate();
	const UpdateIssue=(props)=> {
		const id = props.currentTarget.getAttribute("id")
		// console.log(value1)
	    nevigate(`/updateissue/${id}`);
	}
   
	const Issues = (props) => {
		const id = props.currentTarget.getAttribute("id")
		
		setIdvalue(id)
        togglePopup();
  	}

	const togglePopup = (props) => {
    	setIsOpen(!isOpen);
  	}

	const DeleteIssue =(props)=>{
		const id = props.currentTarget.getAttribute("id")
		const options = {
                    method: 'DELETE',
                    body: JSON.stringify({
					id: id
			})
        };
        // console.log("delete")
        // console.log(idvalue)
		fetch(`/issue/${idvalue}`, options).then(response=>response.json)
										.then(message=>console.log(message))
		refreshPage();
	}

	function refreshPage() {
    	window.location.reload(false);
    }

	return(<div className="containerTable">
			<div  className="tableHeading">Logged Issues:</div>
			<hr/>
			<div className="headingContainer">
							<div  className="head">Issue Id</div>
			                <div  className="head">Project Name</div>
			                <div  className="head">Issue Title</div>
			                <div  className="head">Description</div>
			                <div  className="head">Priority</div>
			                <div  className="head">Last UpdatedOn</div>
			                <div  className="head">AddedOn</div>
			                <div  className="head"></div>
		                </div>
		                <hr/>
		        {issues.map(issue =>{
		            return (
						<div className="container" key= {issue.id} >
							<div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.id }</div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.projectName }</div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.title }  </div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.description }  </div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.priority }  </div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.lastUpdated }  </div>
			                <div  className="field" id= {issue.id} onClick={UpdateIssue}> { issue.added }  </div>
			         		<div className="field" id= {issue.id} onClick={Issues}> Delete Issue </div>     	
		                </div>
		            )
		        })}
		        {isOpen && <Popup handleClose={togglePopup} handleDelete = {DeleteIssue}/>}
		   </div>
	);
}

export default IssueDetails
