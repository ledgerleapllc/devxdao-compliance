import { Button, Dialog } from '@shared/partials';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@shared/core/patterns';
import { useDispatch } from "react-redux";
import { addCM } from "@stores/api/admin/actions"; 
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      EMAIL_PATTERN,
      "Email is invalid"
    ),
  confirm_email: yup
    .string()
    .required('Confirm Email is required')
    .oneOf([yup.ref('email'), null], 'Email not match'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_PATTERN,
      "Password is invalid"
    ),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password not match'),
});

export const AddAssistantDialog = ({ close }) => {
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
      addCM(
        data, 
        () => {
          setLoading(false);
          close(true);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <Dialog>
      <Dialog.Header>
        + Add a New Compliance Assistant
      </Dialog.Header>
      <Dialog.Body>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input placeholder="Email Address" {...register('email')} />
            {formState.errors?.email && (
              <p className="form-error">
                {formState.errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <input placeholder="Confirm Email Address" {...register('confirm_email')} />
            {formState.errors?.confirm_email && (
              <p className="form-error">
                {formState.errors.confirm_email?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <input type="password" placeholder="Create Password" {...register('password')} />
            {formState.errors?.password && (
              <p className="form-error">
                {formState.errors.password?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <input type="password" placeholder="Confirm Password" {...register('confirm_password')} />
            {formState.errors?.confirm_password && (
              <p className="form-error">
                {formState.errors.confirm_password?.message}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm pb-5">Please share these credentials with the user!</p>
            <Button type="submit" isLoading={loading} className="mx-auto block !w-3/5 mb-2.5 px-6" color="primary" disabled={!formState.isValid || loading}>+ Create New User</Button>
            <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
          </div>
        </form>
      </Dialog.Body>
    </Dialog>
  )
}
