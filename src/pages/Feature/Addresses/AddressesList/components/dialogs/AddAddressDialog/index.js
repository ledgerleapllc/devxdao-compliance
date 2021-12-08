import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Dialog, Select } from '@shared/partials';
import { getVAUsers, addAddress } from '@stores/api/shared/actions';

const schema = yup.object().shape({
  user_id: yup
    .string()
    .required('User is required'),
  cspr_address: yup
    .string()
    .required('Address is required')
});

const AddAddressDialog = ({close}) => {
  const {
    formState: {errors, isValid},
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();

  const fetchVAUsers = () => {
    dispatch(
      getVAUsers((users) => {
        const newUsersArr = users.map(user => {
          return {
            value: `${user.id}`,
            label: user.email,
          }
        });
        setUsers(newUsersArr);
      })
    );
  };

  useEffect(() => {
    fetchVAUsers();
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(
      addAddress(
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
        Please select a user by their email from the dropdown
      </Dialog.Header>
      <Dialog.Body>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <Controller
              control={control}
              name={"user_id"}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder={'Select User'}
                  options={users}
                  onChange={(data) => onChange(data.value)}
                  value={value}
                />
              )}
            / >
            <p className="form-error">
              {errors.user_id?.message}
            </p>
          </div>
          <div className="form-control">
            <input placeholder="Enter CSPR address" {...register('cspr_address')} />
            <p className="form-error">
              {errors.cspr_address?.message}
            </p>
          </div>
          <div>
            <Button type="submit" isLoading={loading} className="mx-auto block !w-3/5 mb-2.5 px-6" color="primary" disabled={!isValid || loading}>Confirm</Button>
            <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel</button>
          </div>
        </form>
      </Dialog.Body>
    </Dialog>
  );
};

export default AddAddressDialog;