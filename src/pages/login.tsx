import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import "./login.css"; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setWelcomeMessage(`Welcome ${userData.name}`);
        setShowAlert(true);
        // Redirect to home page after showing the alert
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      } else {
        setShowAlert(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="primary">
        <div className="form-container">
          <IonItem className={`animated-placeholder ${email && "ion-focused"}`}>
            <IonLabel position="floating" color="secondary">Email</IonLabel>
            <IonInput
              value={email}
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              color="light"
            />
          </IonItem>
          <IonItem className={`animated-placeholder ${password && "ion-focused"}`}>
            <IonLabel position="floating" color="secondary">Password</IonLabel>
            <IonInput
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              color="light"
            />
          </IonItem>
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <IonButton className="login-button" onClick={handleLogin} color="secondary">
              Login
            </IonButton>
          </div>
          <div className="signup-text">
            Don't have an account? <span onClick={handleSignup} style={{ cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
          </div>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"jefflags"}
          message={welcomeMessage || "User does not exist"}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
