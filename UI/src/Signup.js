import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    const submit = async () => {
        console.log(email, password);
        if (!email || !password) {
            alert("All field required");
            return;
        }

        let data = { username: email, password: password }
        console.log(data)
        await fetch("http://localhost:4000/createUser", {
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
                        // localStorage.setItem("userId", JSON.stringify(response.id))
                        alert("User Created Successfully. Please enter this credential to Login")
                        navigate("/")

                    } else {
                        alert(response.message)
                    }
                }))
    }



    function submitAction(x) {
        x.preventDefault()
    }

  return (
    <div>
          <div className="row">

              <div className="w-50 mx-auto mt-5">
                  <h1>SignUp</h1>
                  <form onSubmit={submitAction}>
                      <div className="mt-4">
                          <label className="form-label">User Name</label>
                          <input type="email" className="form-control"
                              value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="mt-4">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control"
                              value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="mt-4">
                          <button onClick={submit} type="submit" className="btn btn-primary">Submit</button>
                      </div>
                  </form>
              </div>

          </div>
    </div>
  )
}

export default Signup