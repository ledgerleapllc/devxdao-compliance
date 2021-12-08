import { Button } from "@shared/partials";
import { useState } from "react";
import { Dialog } from "@shared/partials/dialog/Provider";
import { useDispatch } from "react-redux";
import { activateCM } from "@stores/api/admin/actions";

export const ActivateUserDialog = ({ user, className, close }) => {
  const props = {
    className,
  };
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const revokeAdmin = () => {
    setLoading(true);
    dispatch(
      activateCM({ id: user?.id }, 
        (res) => {
          setLoading(false);
          if (res.success) {
            close(user);
          }
        },
        () => {
          setLoading(false);
        }
      )
    );
  }

  return (
    <Dialog {...props}>
      <Dialog.Header>
        <h3 className="text-lg text-purple">Revoke user</h3>
      </Dialog.Header>
      <Dialog.Body>
        <p className="text-sm text-center">
          Doing this will reinstate privileges for {user?.email}. Are you sure you want to continue?
        </p>
      </Dialog.Body>
      <Dialog.Footer>
        <div className="mt-8">
          <Button type="submit"
            onClick={revokeAdmin}
            isLoading={loading}
            className="mx-auto block !w-3/5 mb-2.5 px-6"
            color="success"
            disabled={loading}>
              Activate user
          </Button>
          <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
        </div>
      </Dialog.Footer>
    </Dialog>
  )
};
