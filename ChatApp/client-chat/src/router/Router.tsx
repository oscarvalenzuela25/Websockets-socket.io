import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import ChatRouter from './ChatRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <Route path="/" component={ChatRouter} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
