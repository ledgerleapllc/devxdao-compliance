import { Button, Dialog } from '@shared/partials';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_PATTERN } from '@shared/core/patterns';
import { useDispatch } from "react-redux";
import { resetPassword } from "@stores/api/admin/actions"; 
import { useState } from 'react';

const schema = yup.object().shape({
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

export const NewPasswordDialog = ({ user, close }) => {
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
      resetPassword(
        {...data, id: user.id}, 
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
        Set a new password
      </Dialog.Header>
      <Dialog.Body>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input type="password" placeholder="New Password" {...register('password')} />
            {formState.errors?.password && (
              <p className="form-error">
                {formState.errors.password?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <input type="password" placeholder="Confirm New Password" {...register('confirm_password')} />
            {formState.errors?.confirm_password && (
              <p className="form-error">
                {formState.errors.confirm_password?.message}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm pb-5">Please share these credentials with the user!</p>
            <Button type="submit" isLoading={loading} className="mx-auto block !w-3/5 mb-2.5 px-6" color="primary" disabled={!formState.isValid || loading}>Reset Password</Button>
            <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
          </div>
        </form>
      </Dialog.Body>
    </Dialog>
  )
}
