import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Alert from '../components/Alert';

type AlertState = {
  type: 'success' | 'error';
  message: string;
} | null;

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gradient-bg-animated p-6">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="mt-4">
        {isRegistering ? (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} setAlert={setAlert} setIsRegistering={setIsRegistering} />
        ) : (
          <LoginForm setAlert={setAlert} setIsRegistering={setIsRegistering} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
