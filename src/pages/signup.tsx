// src/SignUp.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from './firebase';
import './signup.css'; // Import the CSS file

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
      });

      setAlertMessage(`Congrats! Account created successfully. Welcome ${name}`);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAlertMessage('User already exists');
      } else {
        setAlertMessage('Sorry, can\'t sign up');
      }
      setError(error.message);
      setShowAlert(true);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    if (alertMessage === `Congrats! Account created successfully. Welcome ${name}`) {
      history.push('/home');
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary"> {/* Use primary color */}
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light"> {/* Use light background */}
        <IonItem>
          <IonLabel position="stacked" color="primary">Name</IonLabel> {/* Use primary color */}
          <IonInput
            value={name}
            type="text"
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked" color="primary">Email</IonLabel> {/* Use primary color */}
          <IonInput
            value={email}
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked" color="primary">Password</IonLabel> {/* Use primary color */}
          <IonInput
            value={password}
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="button-group">
          <IonButton className="signup-button" color="secondary" onClick={handleSignUp}>Sign Up</IonButton> {/* Use secondary color */}
        </div>
        <div className="signup-text">
          Already have an account? <span onClick={handleLogin} style={{ color: 'blue' }}>Login</span> {/* Use blue color */}
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleAlertDismiss}
          header={'jefflags'}
          message={alertMessage}
          buttons={['OK']}
          cssClass="custom-alert" // Custom CSS class for alert
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
