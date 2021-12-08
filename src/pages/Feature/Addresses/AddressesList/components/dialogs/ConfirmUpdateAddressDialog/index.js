import React, { useState } from 'react';
import { Button, Dialog } from '@shared/partials';
import { useDispatch } from 'react-redux';
import { confirmAddress } from '@stores/api/shared/actions';

const ConfirmUpdateAddressDialog = ({addressId, close}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const triggerConfirm = (data) => {
    setLoading(true);
    dispatch(
      confirmAddress(
        addressId,
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
        Are you sure you want to confirm the address update?
      </Dialog.Header>
      <Dialog.Body>
        <p className="text-sm pb-10 text-center">We recommend reaching out to the VA first to confirm this new address and making sure the payment systems are updated to include this new address on the whitelist first.</p>
        <Button type="submit"
          className="mx-auto block !w-3/5 mb-2.5 px-6"
          color="primary"
          onClick={triggerConfirm}
          isLoading={loading}
          disabled={loading}
        >
          Confirm
        </Button>
        <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel</button>
      </Dialog.Body>
    </Dialog>
  );
};

export default ConfirmUpdateAddressDialog;