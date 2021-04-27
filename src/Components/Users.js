
import React, { Component } from 'react'
import axios from 'axios'


class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        //  console.log(this.state.list);
    }
    // employees data 
    // employees = [
    //     {
    //         name: 'pavan',
    //         gender: 'Male',
    //         degree: 'BE',
    //     },
    //     {
    //         name: 'sai',
    //         gender: 'Male',
    //         degree: 'MBA',
    //     },
    //     {
    //         name: 'hari',
    //         gender: 'Female',
    //         degree: 'BE',
    //     },
    // ];

    // get data 
    componentDidMount() {
        axios.get('http://localhost:3003/api/signup')
            .then(response => {
                this.setState({ list: response.data });
                console.log(response)
                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

// ============================


    handleDelete = (data) =>{
        console.log(data)
    
     alert('Confirm User Delete')
     window.location.reload();
     axios.post('http://localhost:3003/api/signup/delete' ,data)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
     


                }
   

   handleUpdate = () =>{
    // alert('Confirm User Update');

}




// ==============================

    render() {
        return (
            // table heading 
            <div className='User-table pt-5'>
                <h1>Users Page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>SI.NO</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>emailId</th>
                            <th>dateOfBirth</th>
                            <th>gender</th>
                            <th>password</th>
                            <th>Delete</th>
                            <th>Update</th>



                        </tr>
                    </thead>
                    {/* using map method pushing users data to table */}
                    <tbody>
                

                        {this.state.list && this.state.list.map((rowData, index) => (
                            <tr key={index}>

                                <td>{index + 1}</td>
                                <td>{rowData.firstName}</td>
                                <td>{rowData.lastName}</td>
                                <td>{rowData.emailId}</td>
                                <td>{rowData.dateOfBirth}</td>
                                <td>{rowData.gender}</td>
                                <td>{rowData.password}</td>

{/* ============================================= */}
                                <td><button onClick={() => this.handleDelete(rowData)}>Delete</button></td>
                                <td><button onClick={this.handleUpdate(rowData)}>Update</button></td>
{/* ================================================== */}


                            </tr>
                        )
                        )}
                    </tbody>
                </table>
      
            </div>
        )
    }
}

export default Users