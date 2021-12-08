import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Button } from '@shared/partials';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { login } from '@stores/auth/actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EMAIL_PATTERN } from '@shared/core/patterns';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      EMAIL_PATTERN,
      "Email is invalid"
    ),
  password: yup
    .string()
    .required('Password is required')
});

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const {
    formState,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    setLoading(true);
    dispatch(
      login(
        data, 
        () => {
          setLoading(false);
          history.push('/app');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <div className="relative h-screen">
      <div className="relative z-40 flex flex-col container mx-auto pt-8 pb-16 h-full">
        <header data-aos="fade-up" data-aos-duration="800">
          <Logo className="main-logo text-primary" />
        </header>
        <div className="flex-1 min-h-0 flex-center">
          <div data-aos="fade-up" data-aos-duration="800" className="w-500px">
            <form className="w-full items-center flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center capitalize text-primary pb-12.5">Sign in</h2>
              <div className="form-control w-full mb-4">
                <input placeholder="Email Address" {...register('email')} />
                {formState.errors?.email && (
                  <p className="form-error">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full mb-4">
                <input type="password" placeholder="Password" {...register('password')} />
                {formState.errors?.password && (
                  <p className="form-error">
                    {formState.errors.password?.message}
                  </p>
                )}
              </div>
              <Button isLoading={loading} disabled={!formState.isValid || loading} className="!w-1" color="primary" type="submit">Sign In</Button>
            </form>
          </div>
        </div>
      </div>
      <img className="z-30 absolute bottom-0" src="/images/bg-login.svg" alt="" />
    </div>
  )
}

export default Login;