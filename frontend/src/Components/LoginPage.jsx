import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import Cookies from "js-cookie";
export default function LoginPage() {
  //States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (jwtToken) {
      Cookies.remove("jwt-authorization");
    }
  }, []);

  //Handlers
  const handleCookie = (jwtToken) => {
    Cookies.set("jwt-authorization", jwtToken);
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };

  const handleLogin = async () => {
    await axios
      .post("http://localhost:3000/login", {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        setPostResponse(response.data.message);
        if (response.data.message === "User authenticated") {
          handleCookie(response.data.token);
          navigate("/private");
        }
      });
  };

  //Render
  return (
    <FormComponent
      goToPage={"register"}
      currentPage={"login"}
      handleOnChange={handleOnChange}
      handleSubmit={handleSubmit}
      formData={formData}
      postResponse={postResponse}
    />
  );
}
