import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import authSlice, { LoginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Authlogin() {
  const initialState = {
    email: "",
    Password: "",
    userName: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(LoginUser(formData)).then((data) => {
      if (data?.payload?.user) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data.payload.message,
          Description: "please sign up before trying again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p>
          {" "}
          Don't have an account?
          <Link
            className="font-medium text-primary hover-underline ml-2"
            to="/auth/register"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Log in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Authlogin;
