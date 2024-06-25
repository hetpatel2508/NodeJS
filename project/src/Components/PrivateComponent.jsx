import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function PrivateComponent() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  useEffect(() => {
    if (!auth) {
      navigate('/signup');
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
}

export default PrivateComponent;
