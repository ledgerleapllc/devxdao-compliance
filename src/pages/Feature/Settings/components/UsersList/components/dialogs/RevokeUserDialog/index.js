import { Button } from "@shared/partials";
import { useState } from "react";
import { Dialog } from "@shared/partials/dialog/Provider";
import { useDispatch } from "react-redux";
import { revokeCM } from "@stores/api/admin/actions";

export const RevokeUserDialog = ({ user, className, close }) => {
  const props = {
    className,
  };
  const [revoking, setRevoking] = useState();
  const dispatch = useDispatch();

  const revokeAdmin = () => {
    setRevoking(true);
    dispatch(
      revokeCM({ id: user?.id }, 
        (res) => {
          setRevoking(false);
          if (res.success) {
            close(user);
          }
        },
        () => {
          setRevoking(false);
        }
      )
    );
  }

  return (
    <Dialog {...props}>
      <Dialog.Header>
        <h3 className="text-lg text-red">Revoke user</h3>
      </Dialog.Header>
      <Dialog.Body>
        <p className="text-sm text-center">Doing this will revoke access privileges from {user?.email}. Are you sure you want to continue?</p>
      </Dialog.Body>
      <Dialog.Footer>
        <div className="mt-8">
          <Button type="submit"
            onClick={revokeAdmin}
            isLoading={revoking}
            className="mx-auto block !w-3/5 mb-2.5 px-6"
            color="danger"
            disabled={revoking}>
              Revoke user
          </Button>
          <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
        </div>
      </Dialog.Footer>
    </Dialog>
  )
};
