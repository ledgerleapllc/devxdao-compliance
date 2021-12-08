import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@shared/partials/dialog/Provider";
import './style.scss';
import { Button } from '@shared/partials';
import { formatDate } from '@shared/core/utils';
import { GRANT_LOGS } from '@shared/core/constant';
import { remindGA, resendGA } from '@stores/api/shared/actions';

export const GrantAgreementDialog = ({ grantId, data, className, close, hideTools }) => {
  const [isReminding, setIsReminding] = useState();
  const [isResending, setIsResending] = useState();
  const dispatch = useDispatch();
  
  const remind = () => {
    setIsReminding(true);
    dispatch(
      remindGA(
        { id: grantId },
        () => {
          setIsReminding(false);
        },
        () => {
          setIsReminding(false);
        },
      )
    );
  }

  const resend = () => {
    setIsResending(true);
    dispatch(
      resendGA(
        { id: grantId },
        () => {
          setIsResending(false);
        },
        () => {
          setIsResending(false);
        },
      )
    );
  }

  return (
    <Dialog className="overflow-y-scroll !max-w-4xl !max-h-160">
      <Dialog.Body>
        <div>
          <h3 className="text-lg text-primary mb-3">Grant Agreement Signatures</h3>
          <ul>
            {data?.signture_grants?.map((item, index) => (
              <li key={`signature_${index}`} className="mb-4">
                <p>
                  Role: <span className="font-medium">{item.role}</span>
                  <br />
                  Name: <span className="font-medium">{item.name}</span>
                  <br />
                  Email: <span className="font-medium">{item.email}</span>
                  <br />
                  Status:{" "}
                  <span className="font-medium">
                    {item.signed ? `Signed at ${formatDate(item.updated_at, 'dd/MM/yyyy hh:mm aa')}` : "Not signed yet"}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-lg text-primary">Remind / Resend / API tracker table</h3>
          <table className="table-1 ga-table mt-4">
            <thead>
              <td>Date/time</td>
              <td>Type</td>
              <td>User</td>
              <td>Details</td>
            </thead>
            <tbody>
              {data?.grant_logs?.map(log => (
                <tr>
                  <td>{formatDate(log.created_at, 'dd/MM/yyyy hh:mm aa')}</td>
                  <td>{log.type === "signed"
                    ? GRANT_LOGS["signed"].type
                    : GRANT_LOGS[`${log.role}_${log.type}`]?.type
                    }</td>
                  <td>
                    {log.role === "admin" && <p>{log.email}</p>}
                    {log.role !== "admin" && (
                      <p className="text-uppercase">{log.role}</p>
                    )}
                  </td>
                  <td>
                    {log.type === "signed" ? (
                      <>
                        <span className="text-uppercase">{log.role}</span>
                        <span> {GRANT_LOGS["signed"]?.details}</span>
                      </>
                    ) : (
                      GRANT_LOGS[`${log.role}_${log.type}`]?.details
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog.Body>
      <Dialog.Footer>
        <div className="mt-8">
          {hideTools && (
            <>
              <Button 
                className="mx-auto block !w-3/5 mb-2.5 px-6"
                color="primary"
                isLoading={isReminding}
                disabled={isReminding}
                onClick={remind}
              >
                Remind
              </Button>
              <Button 
                className="mx-auto block !w-3/5 mb-2.5 px-6"
                color="primary-outline"
                isLoading={isResending}
                disabled={isResending}
                onClick={resend}
              >
                Resend
              </Button>
            </>
          )}
          <button type="button" className="mx-auto block text-xs underline" onClick={() => close(false)}>Cancel & Go Back</button>
        </div>
      </Dialog.Footer>
    </Dialog>
  )
};
