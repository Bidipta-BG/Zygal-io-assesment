import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    let navigate = useNavigate()  

    const submitButton = async () => {
        // console.log(email, password)

        if (!email || !password) {
            alert("All field required");
            return;
        }

        let data = { username: email, password: password }
        // console.log(data)
        await fetch("http://localhost:4000/login", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        // localStorage.setItem("isLogin", 'true')
                        alert("Login Success. Click OK to continue")
                        navigate("/profile")

                    } else {
                        alert(response.message)
                    }
                }))
    }

    const signUp = async() => {
        navigate("/signup")
    }

    function submitAction(e) {
        e.preventDefault()
    }


  return (
    <div>
          <div className="row">

              <div className="w-50 mx-auto mt-5">
                  <h1>Login</h1>
                  <form onSubmit={submitAction}>
                      <div className="mb-3">
                          <label  className="form-label">Login Name</label>
                          <input type="email" className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                      </div>
                
                      <button onClick={submitButton} type="submit" className="btn btn-primary">Login</button>

                      <button onClick={signUp} type="submit" className="btn bg-warning ms-4">Sign Up</button>
                  </form>
              </div>

          </div>
    </div>
  )
}

export default Login