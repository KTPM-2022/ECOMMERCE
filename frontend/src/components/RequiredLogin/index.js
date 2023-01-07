import { useSelector } from 'react-redux';

function RequiredLogin({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (user) return <>{children}</>;
  else
    return (
      <div className="grid wide" style={{ marginTop: '156px', marginBottom: '40px' }}>
        Please login to see details
      </div>
    );
}

export default RequiredLogin;
