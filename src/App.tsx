import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Otp from "./components/Otp";
import { auth } from "./config/firebase.config";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [result, setResult] = useState<ConfirmationResult | undefined>();

  const handleLogin = () => {
    if (!mobileNumber.trim() || mobileNumber.length < 10) return;

    setIsLoading(true);

    const appVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });

    signInWithPhoneNumber(auth, `+91 ${mobileNumber}`, appVerifier)
      .then((response) => {
        setResult(response);
        alert(`OTP sent to your mobile number: +91 ${mobileNumber}`);
        setIsOtpSent(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validateOtp = () => {
    if (!otp.trim() || otp.length < 6) return;

    setIsLoading(true);

    result
      ?.confirm(otp)
      .then((response) => {
        console.log(response);
        alert("OTP validation successful!");
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        alert("OTP validation failed!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsOtpSent(false);
    setMobileNumber("");
    setOtp("");
  };

  return isLoggedIn ? (
    <Home mobileNumber={mobileNumber} logout={logout} />
  ) : isOtpSent ? (
    <Otp
      mobileNumber={mobileNumber}
      otp={otp}
      isLoading={isLoading}
      setOtp={setOtp}
      validateOtp={validateOtp}
    />
  ) : (
    <Login
      mobileNumber={mobileNumber}
      isLoading={isLoading}
      setMobileNumber={setMobileNumber}
      handleLogin={handleLogin}
    />
  );
}

export default App;
