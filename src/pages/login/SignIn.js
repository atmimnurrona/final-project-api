import React, {useState} from "react";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "reactstrap";
import undraw_Access_account_re_8spm from "../../assets/images/undraw_Access_account_re_8spm.svg"
import "./login.css"
import {useHistory} from "react-router";

const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const history = useHistory();

    const onSubmit = () => {
        const isValid = validate();

        if (isValid) {
            const data = {
                username: username,
                password: password
            }
            history.push('/master/home')
            //axios
        }
    }
    //

    const validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (!username) {
            usernameError = "*please enter username"
        }
        if (!password) {
            passwordError = "*please enter password"
        }
        if (usernameError || passwordError) {
            setUsernameError(usernameError);
            setPasswordError(passwordError);
            return false;
        }

        return true;
    }

    const handleUsernameChange = (e) => {
        const inputValue = e.target.value;
        const isEmpty = inputValue === "";
        setUsername(inputValue)
        setUsernameError(isEmpty)
    }

    const handlePasswordChange = (e) => {
        const inputValue = e.target.value;
        const isEmpty = inputValue === "";
        setPassword(inputValue)
        setPasswordError(isEmpty)
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-5 pr-lg-5 mb-md-0">
                    <img src={undraw_Access_account_re_8spm} alt=""
                         className="img-fluid d-none d-md-block"/>
                </div>

                <div className="col-md-7 col-lg-6 ml-auto">
                    <h1 style={{color: "#e42256", fontSize: "55px"}}>Sign In</h1><br/>
                    <form>
                        <div className="row">

                            <div className="input-group col-lg-12 mb-4">
                                <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faUser}/>
                                        </span>
                                </div>
                                <input id="username"
                                       type="text"
                                       name="username"
                                       placeholder="Username"
                                       onChange={(e) => handleUsernameChange(e)}
                                       className="form-control bg-white border-left-0 border-md"/>
                            </div>
                            <div style={{
                                marginLeft: "20px",
                                marginTop: "-25px",
                                marginBottom: "20px",
                                color: "red"
                            }}>
                                {usernameError}
                            </div>

                            <div className="input-group col-lg-12 mb-4">
                                <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faKey}/>
                                        </span>
                                </div>
                                <input id="password"
                                       type="password"
                                       name="password"
                                       placeholder="Password"
                                       onChange={(e) => handlePasswordChange(e)}
                                       className="form-control bg-white border-left-0 border-md"/>
                            </div>
                            <div style={{
                                marginLeft: "20px",
                                marginTop: "-25px",
                                marginBottom: "20px",
                                color: "red"
                            }}>{passwordError}</div>

                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <Button
                                    style={{background: "#e42256"}}
                                    onClick={() => onSubmit()}
                                    block>
                                        <span className="font-weight-bold"
                                              style={{color: "#ffff"}}>SIGN IN</span>
                                </Button>
                            </div>

                            <div className="text-center w-100">
                                <p className="text-muted font-weight-bold">
                                    Forgot Password?
                                    <a href="#" className="text-primary ml-2">Click here</a>
                                </p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;