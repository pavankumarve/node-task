import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'


const Home = () => {
    return(
        <div>
            <h1>Home Page</h1>
            <Link className='a-link primary' to='/SignUpPage' >SignUp</Link> 
            <Link className='a-link primary' to='/UsersPage' >Users</Link> 
            

        </div>
    )
}

export default Home