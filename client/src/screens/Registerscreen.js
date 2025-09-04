import React , {useState}from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

function Registerscreen() {

// States for Inputs
const [name,setname]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')
const [cpassword,setcpassword]=useState('')


// States for Response
const [loading, setloading] = useState(false)
const [error, seterror] = useState()
const [success, setsuccess] = useState()

// Register Function
 async function register(){
if(password===cpassword){
    // Object Getting Values from Inputs
    const user ={
        name,
        email,
        password,
        cpassword
    }
    // Sending Data to MongoDB
    try {
        setloading(true)
        const result = (await axios.post('http://localhost:5000/api/users/register',user)).data
        setloading(false)
        setsuccess(true)
        
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
    } catch (error) {
        setloading(false)
        seterror(true)
        console.log(error)
    }
}
else{
    alert("Passwords Not Match!")
}


}







  return (
    <div>

{/* If States are true only then components will show */}
 {/* {loading && (<Loader/>)}
 {error && (<Error/>)}
 {success && (<Success message={"Registration Completed"}/>)} */}

<div className='row justify-content-center mt-5'> 

<div className='col-md-5'>

<div className='bs border'>
    <h1 className='text-center'>Register</h1>
    <input   type='text' className='form-control' placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
    <input   type='text' className='form-control' placeholder='Email'  value={email} onChange={(e)=>{setemail(e.target.value)}}/>
    <input   type='text' className='form-control' placeholder='Password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
    <input   type='text' className='form-control' placeholder='Confirm Password'  value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
    <button className='btn btn-dark mt-3' onClick={register}>Register</button>
</div>

</div>

</div>

    </div>
  )
}

export default Registerscreen