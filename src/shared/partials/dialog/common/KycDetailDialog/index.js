import { Dialog } from "@shared/partials/dialog/Provider";
import './style.scss';

export const KycDetailDialog = ({ user, className, close }) => {
  const props = {
    className,
  };

  let data;
  if (user.shuftipro?.data) data = JSON.parse(user.shuftipro?.data);

  return (
    <Dialog {...props}>
      <Dialog.Header>
        <h3 className="text-lg text-primary">KYC/AML Info</h3>
      </Dialog.Header>
      <Dialog.Body>
        {user.shuftipro.status === "approved" && (
          <table className="kyc-info">
            <tbody>
              <tr>
                <td>KycKangaroo status</td>
                <td className="capitalize">{user?.shuftipro?.status}</td>
              </tr>
              <tr>
                <td>Invite ID</td>
                <td>{user?.shuftipro_temp?.invite_id}</td>
              </tr>
              <tr>
                <td>Shufti REFID</td>
                <td>{user?.shuftipro?.reference_id}</td>
              </tr>
              <tr>
                <td>Name Verified in KYC kangaroo</td>
                <td>
                  {data?.address_document?.name?.first_name}{" "}
                  {data?.address_document?.name?.last_name}
                </td>
              </tr>
              <tr>
                <td>Country Verified in KYC kangaroo</td>
                <td>{data?.address_document?.country}</td>
              </tr>
            </tbody>
          </table>
        )}
        {user.shuftipro.status === "denied" && (
          <div className="text-center">
            <label>Reason</label>
            <span className="pl-5 font-medium">{data?.declined_reason}</span>
          </div>
        )}
      </Dialog.Body>
      <Dialog.Footer>
        <div className="mt-8">
          <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
        </div>
      </Dialog.Footer>
    </Dialog>
  )
};
