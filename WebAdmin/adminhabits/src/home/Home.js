import { useState } from "react";
import "../App.css";
import logo_app from "../image/logo_app.png";
import splash from "../image/splash.png";
function Home() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  const renderForm = () => (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit"  />
        </div>
      </form>
    </div>
  );
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  return (
    <div className="App">
      <div class="site-header">
        <div class="site-identity">
          <img src={logo_app} width="48" height="48" />
          <a className="logo" href="#">
            {"Manager Habits "}
          </a>
        </div>
        <nav class="site-navigation">
          <ul class="nav">
            <li>
              <a href="stepbystep">Manager User</a>
            </li>
            <li>
              <a href={"/stepbystep/PrivacyPolicy"}>Habits</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>

            <li>
              <a href="#">Contact us</a>
            </li>
            {/* <li>
              <a href={"/stepbystep/PrivacyPolicy"}>Privacy Policy</a>
            </li> */}
          </ul>
          {/* <button className="btn" type="button">
            Subscrice
          </button> */}
        </nav>
      </div>
      <div className="bg-body1">
        <img className="splash" src={splash} />
        <div className="bg-body">
          <div className="login-form">
            <div className="title">Sign In</div>
            {isSubmitted ? (
              <div>User is successfully logged in</div>
            ) : (
              renderForm()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
