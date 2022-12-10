import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {


  const [msg, setMsg] = useState("")
  const [srchmsg, setSrchmsg] = useState("")
  const [allmsg, setAllmsg] = useState([])
 
  let navigate = useNavigate()

  async function saveMsg(){
    let obj = await localStorage.getItem("message")
    if(!obj) {
      let obj = {}
      obj[msg] = 1
      localStorage.setItem("message", JSON.stringify(obj))
    }else{
      obj = JSON.parse(obj)
      console.log(obj);
      obj[msg] = 1
      localStorage.setItem("message", JSON.stringify(obj))
    }
    alert("Data Saved Succesfull")
    setMsg("")
  }

  async function searchMsg() {
    let obj = await localStorage.getItem("message")
    if(!obj){
      alert("No message found")
    }
    obj = JSON.parse(obj)
    // console.log(srchmsg, obj)
    if (obj[srchmsg]){
      showMsg()
    }else{
      alert("Message Not found")
    }
  }

  async function showMsg(){
    let obj = await localStorage.getItem("message")
    obj = JSON.parse(obj)
    let array = Object.keys(obj)
    // console.log(array);
    setAllmsg(array)
  }

  function logOut(){
    navigate("/")
  }

  function clearLocalStorage() {
    localStorage.clear()
    setAllmsg([])
  }

  function submitAction(x) {
    x.preventDefault()
  }

  return (
    <div>

     

      <div className="row">
       
       <div>
        
       </div>

        <div className="w-50 mx-auto mt-3">
          <nav class="navbar navbar-light bg-light mb-5">
            <div class="container-fluid">
              <button onClick={clearLocalStorage} type="submit" className="btn bg-warning">Clear All Data</button>
              <button onClick={logOut} type="submit" className="btn bg-danger">Logout</button>
            </div>
          </nav>
          <form onSubmit={submitAction}>
            <div className="mt-4">
              <label className="form-label">Enter Your message here</label>
              <input type="text" className="form-control"
                value={msg} onChange={(e) => setMsg(e.target.value)} />
            </div>
            <div className="mt-1">
              <button onClick={saveMsg} type="submit" className="btn btn-primary">Submit Message</button>
            </div>
            <div className="mt-4">
              <label className="form-label">Search for Message</label>
              <input type="text" className="form-control"
                value={srchmsg} onChange={(e) => setSrchmsg(e.target.value)} />
            </div>
            <div className="mt-1">
              <button onClick={searchMsg} type="submit" className="btn btn-primary">Search Message</button>
            </div>
          </form>

          <div className="mt-5">
            <h1>Your Available Messages</h1>

            {allmsg.length ===0 ? <h5>No Message Available</h5> : allmsg.map(ele=>
              <div class="alert alert-success" role="alert">
                {ele}
              </div>
              )}
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile