import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import RequestForm from '../forms/RequestForm';
import Request from './Request'

export default function RequestList() {
    const [requests, setRequests] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentRequest, setCurrentRequest] = useState({});

    const requestHeader ={
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
    //Call API
    loadRequestList()
    }, [])
    
    const loadRequestList =()=> {
        Axios.get("request/index")
        .then((response)=> {
            console.log(response)
            setRequests(response.data.requests)
        })
        .catch((err)=> {
            console.log(err)
        })
   
    }

    const addRequest = (request) => {
        Axios.post("request/add", request, requestHeader)
        .then( res => {
            console.log("Request Added Successfully!!!");
            loadRequestList();
        })

        .catch(err=>{
            console.log("Error has been detected! FIX IT");
            console.log(err)
        })
    }

    const editView = (id) => {
        Axios.get(`request/edit?id=${id}`)
        .then((res) => {
            console.log(res.data.request);
            console.log("Loaded Request Information");
            let request = res.data.request;
            setIsEdit(true);
            setCurrentRequest(request);
        })

        .catch(err=>{
            console.log("Edit Error has been detected! FIX IT");
            console.log(err);
        })
    }

    const updatedRequest = (request) => {
        Axios.put("request/update", request, requestHeader)
        .then(res => {
            console.log("Updated Successfully");
            console.log(res);
            loadRequestList();
        })

        .catch(err=>{
            console.log("Update Error has been detected! FIX IT");
            console.log(err);
        })
    }

    const deleteRequest = (id) => {
        Axios.get(`request/delete?id=${id}`, requestHeader)
        .then(res => {
            console.log("Record Deleted");
            console.log(res);
            loadRequestList();
        })

        .catch(err=>{
            console.log("Delete Error has been detected! FIX IT");
            console.log(err);
        })
    }
    const allrequests = requests.map((request, index)=> (
        <tr key={index}>
            <Request {...request} editView={editView} deleteRequest={deleteRequest} />
        </tr>
    ))
  return (
    <div>
       <h1>Request List</h1> 
       <div>
        <table className='table table-striped'>
            <tbody>
            <tr>
                <th>Exhibition Name</th>
                <th>Reason Of Request</th>
                <th>Request CR</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {allrequests}
            </tbody>
        </table>

       </div>
       (!isEdit) ?
       <RequestForm addRequest = {addRequest}></RequestForm>
       
        </div>
  )
}
