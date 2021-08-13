import React, { useState, useEffect } from 'react'
import './App.css';
import Firebase from './Firebase';
import Status from './components/Status';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError();
    setPasswordError();
  }

  const handleLogin = () => {

    clearErrors()
    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userInfo => {
        setUser(userInfo.user);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setPasswordError(err.message);
            break;
          case "auth/user-disabled":
            setPasswordError(err.message);
            break;
          case "auth/user-no-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            setPasswordError(err.message);
        }

      });
  };
  const handleSignup = () => {
    clearErrors()
    Firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userInfo => {
        setUser(userInfo.user)
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            setPasswordError(err.message);
        }
      });
  };


  const handleLogout = () => {
    Firebase.auth().signOut();
  };

  const authListener = () => {
    Firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();

  }, []);

  return (
    <>
      <div className="App">
        {user ? (
          <Home handleLogout={handleLogout} />

        ) : (
          <Status
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError} />

        )}
      </div>
    </>
  );
};

export default App;
