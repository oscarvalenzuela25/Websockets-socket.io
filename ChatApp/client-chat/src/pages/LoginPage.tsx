import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

type Form = {
  email: string;
  password: string;
  rememberme: boolean;
};

const LoginPage = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    rememberme: false,
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleRememberme = () => {
    setForm(prevState => ({
      ...prevState,
      rememberme: !prevState.rememberme,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.rememberme) {
      localStorage.setItem('email', form.email);
    } else {
      localStorage.removeItem('email');
    }
    const { email, password } = form;
    const response = await login(email, password);
    if (response) {
      Swal.fire('Success', 'Login success', 'success');
      history.replace('/');
    } else {
      Swal.fire('Error', 'Login failed', 'error');
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setForm(prevState => ({
        ...prevState,
        email,
        rememberme: true,
      }));
    }
  }, []);

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChangeForm}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChangeForm}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={toggleRememberme}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!form.email || !form.password}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
