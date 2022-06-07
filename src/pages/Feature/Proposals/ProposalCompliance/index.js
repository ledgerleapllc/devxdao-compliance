import { Card, CardHeader, CardBody, BreadCrumb, Button } from '@shared/partials';
import { useScroll } from '@shared/hooks/useScroll';
import { formatDate } from '@shared/core/utils';
import { useContext, useEffect } from 'react';
import { getProposalDetail, getComplianceDetail, approveCompliance, denyCompliance } from '@stores/api/shared/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useState } from 'react';
import './style.scss';
import { AppContext } from '../../../../App';

const ProposalCompliance = () => {
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const { id } = useParams();
  const [proposal, setProposal] = useState();
  const [complianceResult, setComplianceResult] = useState();
  const [reason, setReason] = useState();
  const [screen, setScreen] = useState();
  const history = useHistory();
  const [isApproving, setIsApproving] = useState();
  const [isDenying, setIsDenying] = useState();
  const user = useSelector((state) => state.authReducer?.user);

  useScroll();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getComplianceDetail(
        { id },
        (res) => {
          setComplianceResult(res);
          if (['approved', 'denied'].includes(res?.onboarding.compliance_status)) {
            setScreen(2);
          } else {
            setScreen(0);
          }
          dispatch(
            getProposalDetail(
              { id },
              (res) => {
                setProposal(res);
                setLoading(false);
              },
              () => {
                setLoading(false);
              }
            )
          );
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

  const approve = () => {
    setIsApproving(true);
    dispatch(
      approveCompliance(
        { proposalId: id },
        (res) => {
          setComplianceResult(res);
          setScreen(2);
          setIsApproving(false);
        },
        () => {}
      )
    );
  };

  const deny = () => {
    setIsDenying(true);
    dispatch(
      denyCompliance(
        { proposalId: id, reason },
        (res) => {
          setComplianceResult(res);
          setScreen(2);
          setIsDenying(false);
        },
        () => {}
      )
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumb />
      <Card className='!py-9'>
        <CardHeader>
          <div className='flex justify-between'>
            {[0, 1].includes(screen) && <h2>Compliance Review</h2>}
            {[2].includes(screen) && <h2>Compliance Summary</h2>}
          </div>
        </CardHeader>
        <CardBody>
          {!!user.compliance && screen === 0 && (
            <div className='flex gap-4 flex-col'>
              <p>
                Please review the attached PDF for grant {proposal?.title}. This grant needs your decision on compliance
                before it can move to a formal vote. Please click a button below when your are ready.
              </p>
              <p>In additon to the attached PDF, the link to the proposal is available publically here</p>
              <ul>
                {proposal?.files.map((file) => (
                  <li>
                    -{' '}
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={`${process.env.REACT_APP_BASE_URL}${file.url}`}
                      className='underline text-purple'
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className='pt-12 flex gap-4 w-1/2'>
                <Button
                  className='mx-auto block !w-3/5 mb-2.5 px-6'
                  color='primary'
                  isLoading={isApproving}
                  disabled={isApproving}
                  onClick={approve}
                >
                  I approve this grant
                </Button>
                <Button
                  className='long-text mx-auto block !w-3/5 mb-2.5 px-6'
                  color='primary-outline'
                  onClick={() => setScreen(1)}
                >
                  I need to deny this grant and will provide a reason
                </Button>
              </div>
            </div>
          )}
          {!!user.compliance && screen === 1 && (
            <div className='flex gap-4 flex-col'>
              <p>
                Compliance admin, please record the exact reason for denying this grant. Remember, this action is final
                and will stop this grant from moving ahead. Your reason will be shared with the OP.
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows='5'
                className='border border-gray3 w-full my-1.5 p-3'
                placeholder='Enter the reason you are denying this grant.'
              />
              <div className='pt-12 flex gap-4 w-1/2'>
                <Button
                  className='long-text mx-auto block !w-3/5 mb-2.5 px-6'
                  color='primary-outline'
                  onClick={() => setScreen(0)}
                >
                  Cancel
                </Button>
                <Button
                  className='mx-auto block !w-3/5 mb-2.5 px-6'
                  color='primary'
                  isLoading={isDenying}
                  onClick={deny}
                  disabled={isDenying}
                >
                  Deny grant
                </Button>
              </div>
            </div>
          )}
          {!user.compliance && [0, 1].includes(screen) && <div className='flex gap-4 flex-col'>Waiting for review</div>}
          {screen === 2 && (
            <div className='flex gap-4 flex-col'>
              <h4 className='font-semibold'>This compliance check has been completed!</h4>
              <div>
                <label className='pr-4'>Grant number:</label>
                <span className='font-medium'>{complianceResult?.proposal?.id}</span>
              </div>
              <div>
                <label className='pr-4'>Compliance status:</label>
                <span className='font-medium capitalize'>{complianceResult?.onboarding?.compliance_status}</span>
              </div>
              <div>
                <label className='pr-4'>Compliance admin:</label>
                <span className='font-medium'>{complianceResult?.compliance_admin}</span>
              </div>
              <div>
                <label className='pr-4'>Timestamp:</label>
                <span className='font-medium'>
                  {formatDate(complianceResult?.onboarding?.compliance_reviewed_at, 'dd/MM/yyyy h:mm a')}
                </span>
              </div>
              {complianceResult?.onboarding?.compliance_status === 'denied' && (
                <div>
                  <label className='pr-4'>Denial reason:</label>
                  <span className='font-medium'>{complianceResult?.onboarding?.deny_reason}</span>
                </div>
              )}
              <div className='pt-12 flex gap-4 w-1/2'>
                {complianceResult?.onboarding?.compliance_status === 'denied' ? (
                  <Button
                    className='long-text block !w-3/5 mb-2.5 px-6'
                    color='primary-outline'
                    isLoading={isApproving}
                    disabled={isApproving}
                    onClick={approve}
                  >
                    Approve this compliance
                  </Button>
                ) : (
                  <Button
                    className='long-text block !w-3/5 mb-2.5 px-6'
                    color='primary-outline'
                    onClick={() => history.push('/app/dashboard')}
                  >
                    Back to dashboard
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProposalCompliance;
