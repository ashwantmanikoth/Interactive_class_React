import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  console.log("testtt");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("1");
      // Now, send this code to your Express backend to exchange it for tokens
      exchangeCodeForToken(code);
    } else {
      // Handle error or redirect
      navigate("/");
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code) => {
    try {
      console.log("2");
      const response = await fetch("http://localhost:3001/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Failed to exchange code for tokens");

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("userName", data.userName);
      sessionStorage.setItem("userEmail", data.userEmail);
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("idToken", data.idToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);

      // Handle or store your tokens here securely (e.g., sessionStorage, localStorage, state management)
      // Redirect to dashboard or home
      navigate("/");
    } catch (error) {
      console.error("Error exchanging code:", error);
      navigate("/");
    }
  };

  return <div>Loading...</div>;
};

export default AuthCallback;