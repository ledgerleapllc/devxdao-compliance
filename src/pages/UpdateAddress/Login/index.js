import { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { Button } from '@shared/partials';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { endUserLogin, logout } from '@stores/auth/actions';
import { EMAIL_PATTERN } from '@shared/core/patterns';

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

const UpdateAddress = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    formState,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState();

  const onSubmit = data => {
    setLoading(true);
    dispatch(
      endUserLogin(
        data, 
        () => {
          setLoading(false);
          history.push('/updateaddress/update');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    dispatch(
      logout(
        () => {},
        () => {}
      )
    )
  }, []);

  return (
    <div className="relative h-screen">
      <div className="relative z-40 flex flex-col container mx-auto pt-8 pb-16 h-full">
        <header data-aos="fade-up" data-aos-duration="800">
          <Logo className="main-logo text-primary" />
        </header>
        <div className="flex-1 min-h-0 flex-center">
          <div data-aos="fade-up" data-aos-duration="800" className="w-500px">
            <form className="w-full items-center flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="text-xl font-medium text-center capitalize text-primary pb-12.5">Welcome to the change address tool. Please sign in with your credentials from the DxD portal.</h4>
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

export default UpdateAddress;
