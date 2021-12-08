import React, { useState } from 'react';
import { Button, Dialog } from '@shared/partials';
import { useDispatch } from 'react-redux';
import { voidAddress } from '@stores/api/shared/actions';

const ConfirmVoidAddressDialog = ({addressId, close}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const triggerVoid = (data) => {
    setLoading(true);
    dispatch(
      voidAddress(
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
        Are you sure you want to void this request?
      </Dialog.Header>
      <Dialog.Body>
        <p className="text-sm pb-10 text-center">The users address will NOT be updated and this request will be deleted.</p>
        <Button type="submit"
          className="mx-auto block !w-3/5 mb-2.5 px-6"
          color="primary"
          onClick={triggerVoid}
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

export default ConfirmVoidAddressDialog;