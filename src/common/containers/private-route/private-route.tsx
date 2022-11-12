import { Outlet, useNavigate } from '@solidjs/router';

export const PrivateRoute = () => {
  const navigate = useNavigate();

  const userID = localStorage.getItem('solid-quality') || true;
  if (!userID) navigate('/login', { replace: true });

  return <Outlet />;
};
