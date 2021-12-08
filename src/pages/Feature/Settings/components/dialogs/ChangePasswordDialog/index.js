import { Button, Dialog } from '@shared/partials';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_PATTERN } from '@shared/core/patterns';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { changePassword } from '@stores/auth/actions';
import { ReactComponent as IconCheckbox } from '@assets/icons/ic-checkbox.svg';

const schema = yup.object().shape({
  current_password: yup
    .string()
    .required('Current Password is required'),
  new_password: yup
    .string()
    .required('New Password is required')
    .matches(
      PASSWORD_PATTERN,
      "New Password is invalid"
    ),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('new_password'), null], 'Password not match'),
});

export const ChangePasswordDialog = ({ close }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const {
    formState,
    register,
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const watchAllFields = watch(); 

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(changePassword(
      data,
      () => {
        setLoading(false);
        close(true);
      },
      () => {
        setLoading(false);
      },
    ))
  }

  return (
    <Dialog>
      <Dialog.Header>
        Change Password
      </Dialog.Header>
      <Dialog.Body>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <div className="relative w-full">
              <input className="w-full" type="password" placeholder="Current Password" {...register('current_password')} />
              {!formState.errors?.current_password && watchAllFields.current_password && <IconCheckbox className="absolute top-1/2 transform -translate-y-1/2 right-0 text-primary" />}
            </div>
            {formState.errors?.current_password && (
              <p className="form-error">
                {formState.errors.current_password?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <div className="relative w-full">
              <input className="w-full" type="password" placeholder="New Password" {...register('new_password')} />
              {!formState.errors?.new_password && watchAllFields.new_password && <IconCheckbox className="absolute top-1/2 transform -translate-y-1/2 right-0 text-primary" />}
            </div>
            {formState.errors?.new_password && (
              <p className="form-error">
                {formState.errors.new_password?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <div className="relative w-full">
              <input className="w-full" type="password" placeholder="Confirm New Password" {...register('confirm_password')} />
              {!formState.errors?.confirm_password && watchAllFields.confirm_password && <IconCheckbox className="absolute top-1/2 transform -translate-y-1/2 right-0 text-primary" />}
            </div>
            {formState.errors?.confirm_password && (
              <p className="form-error">
                {formState.errors.confirm_password?.message}
              </p>
            )}
          </div>
          <div>
            <Button type="submit" isLoading={loading} className="mx-auto block !w-3/5 mb-2.5 px-6" color="primary" disabled={!formState.isValid || loading}>Update Password</Button>
            <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
          </div>
        </form>
      </Dialog.Body>
    </Dialog>
  )
}
