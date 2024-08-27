import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AuthLayout from '../layout/AuthLayout';
import noAuth from '../hocs/noAuth';

const AuthRouter = () => {
  return (
    <Switch>
      <AuthLayout>
        <Route exact path="/auth/login" component={noAuth(LoginPage)} />
        <Route exact path="/auth/register" component={noAuth(RegisterPage)} />
      </AuthLayout>
    </Switch>
  );
};

export default AuthRouter;
