import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@shared/partials';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { updateAddress, getUserAddress } from '@stores/api/user/actions';
import { removeUpdateAddressToken } from '@shared/core/services/auth';
import { clearEndUser } from '@stores/auth/actions';
import { useDialog } from '@shared/partials';
import { NotificationDialog } from '@shared/partials/dialog/template/NotificationDialog';

const schema = yup.object().shape({
  cspr_address: yup
    .string()
    .required('Address is required'),
  confirm_address: yup
    .string()
    .required('Confirm Address is required')
    .oneOf([yup.ref('cspr_address'), null], 'Address must match')
});

const AddressUpdate = () => {
  const { appendDialog } = useDialog();
  const {
    formState,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const endUser = useSelector(state => state.authReducer?.endUser);
  const [currentAddress, setCurrentAddress] = useState();

  const [loading, setLoading] = useState();

  const fetchData = () => {
    dispatch(
      getUserAddress(
        (address) => {
          setCurrentAddress(address?.cspr_address);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }

  useEffect(() => {
    if (endUser) {
      fetchData();
    } else {
      logout();
    }
  }, []);

  const logout = () => {
    removeUpdateAddressToken();
    dispatch(clearEndUser());
    history.push('/updateaddress');
  }

  const onSubmit = data => {
    setLoading(true);
    dispatch(
      updateAddress(
        {
          user_id: endUser.id,
          cspr_address: data.cspr_address
        }, 
        () => {
          setLoading(false);
          appendDialog(<NotificationDialog text="Update address success" />);
          history.replace('/updateaddress');
          removeUpdateAddressToken();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <div id="update-address-page" className="relative h-screen">
      <div className="relative z-40 flex flex-col container mx-auto pt-8 pb-16 h-full">
        <header data-aos="fade-up" data-aos-duration="800">
          <Logo className="main-logo text-primary" />
        </header>
        <div className="flex-1 min-h-0 flex-center">
          <div data-aos="fade-up" data-aos-duration="800" className="w-500px">
            <form className="w-full items-center flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="text-xl font-medium text-center capitalize text-primary pb-12.5">We found you in the the system</h4>
              {currentAddress && (<div className="mb-10 text-center">
                <p className="font-medium">Your current CSPR address is</p>
                <p className="text-center italic">{currentAddress}</p>
              </div>)}
              <p className="mb-3 font-medium">Enter a new address below</p>
              <div className="form-control w-full mb-3">
                <input placeholder="Enter new address" {...register('cspr_address')} />
                {formState.errors?.address && (
                  <p className="form-error">
                    {formState.errors.address?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full mb-3">
                <input placeholder="Confirm new address" {...register('confirm_address')} />
                {formState.errors?.confirm_address && (
                  <p className="form-error">
                    {formState.errors.confirm_address?.message}
                  </p>
                )}
              </div>
              <Button isLoading={loading} disabled={!formState.isValid || loading} className="!w-1 mb-4" color="primary" type="submit">Submit</Button>
              <button onClick={logout}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
      <img className="z-30 absolute bottom-0" src="/images/bg-login.svg" alt="" />
    </div>
  )
}

export default AddressUpdate;
