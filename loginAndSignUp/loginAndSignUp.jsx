import React, { useState } from "react";
import Style from "./loginAndSignUp.module.css";
import { Button } from "../components/componentsindex.js";
import { registerUser } from "../API/api.config.js"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../API/manageUser.js";

const loginAndSignUp = ({ pageName }) => {
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")

  const dispatch = useDispatch();
  const router  = useRouter();
  // const { userRegister } = useSelector((state) => state.authSlice);
  const handleLogin = () => {
    console.log("login");
  };

  const handleSignUp = () => {
    const newUser = {
      name:username,
      email: email,
      password:password,
      passwordConfirm: confirmPassword,
    };
    // registerUser(newUser, dispatch, router);

    const action = registerAction(newUser);
    dispatch(action);
  }

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        
        {
          pageName === "SignUp" ? (
            <>
              <div className={Style.user_box_input}>
                <div className={Style.user_box_input_box}>
                  <label htmlFor="Username">Name</label>
                  <input type="Username" placeholder="Your name" onChange={(e)=> setUsername(e.target.value)}
                  />
                </div>

                <div className={Style.user_box_input_box}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" placeholder="example@emample.com" onChange={(e)=> setEmail(e.target.value)}/>
                </div>

                <div className={Style.user_box_input_box}>
                  <label
                    htmlFor="password"
                    className={Style.user_box_input_box_label}
                  >
                    <p>Password</p>
                  </label>
                  <input type="password" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <div className={Style.user_box_input_box}>
                  <label
                    htmlFor="confirm password"
                    className={Style.user_box_input_box_label}
                  >
                    <p>Confirm Password</p>
                  </label>
                  <input type="password" placeholder="Enter your confirm password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
                </div>
              </div>
              <Button
                btnName="Continue"
                classStyle={Style.button}
                handleClick={() => handleSignUp()}
              />
            </>
          ) : (
            <>
              <div className={Style.user_box_input}>
                <div className={Style.user_box_input_box}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" placeholder="example@emample.com" />
                </div>

                <div className={Style.user_box_input_box}>
                  <label
                    htmlFor="password"
                    className={Style.user_box_input_box_label}
                  >
                    <p>Password</p>
                    <p>
                      <a href="#">Forget password ?</a>
                    </p>
                  </label>
                  <input type="password" placeholder="Enter your password" />
                </div>
              </div>
              <Button
                btnName="Continue"
                classStyle={Style.button}
                handleClick={handleLogin()}
              />
            </>
          )
        }
        
      </div>
    </div>
  );
};

export default loginAndSignUp;
