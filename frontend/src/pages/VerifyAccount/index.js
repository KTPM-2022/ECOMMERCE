import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const token = new URLSearchParams(search).get('token');
  useEffect(() => {
    axios.post('/api/auth/checktoken', { token }).catch((error) => navigate('/'));
  }, [token]);
  useEffect(() => {
    axios.post('/api/auth/verifyaccount', { token }).finally(() => {
      navigate('/');
    });
  });
  return <></>;
}

export default VerifyAccount;
