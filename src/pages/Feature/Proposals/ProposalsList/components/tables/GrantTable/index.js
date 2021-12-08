/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, useTable, Button, useDialog } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@shared/core/utils';
import { KycDetailDialog } from '@shared/partials/dialog/common/KycDetailDialog';
import { GrantAgreementDialog } from '@shared/partials/dialog/common/GrantAgreementDialog';
import './style.scss';
import { Link } from 'react-router-dom';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const GrantTable = ({ outParams, api, type }) => {
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    setPage,
    setParams,
    page,
    params,
    resetData,
  } = useTable();
  const dispatch = useDispatch();
  const { openDialog } = useDialog();
  const user = useSelector(state => state.authReducer?.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      api({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  }

  useEffect(() => {
    if (outParams) {
      setParams(outParams);
      resetData();
      fetchData(1, outParams);
    }
  }, [outParams]);

  const findInformalGrantVote = (item) => {
    return item.proposal?.votes?.find(x => x.content_type === 'grant' && x.type === 'informal');
  }

  const findFormalGrantVote = (item) => {
    return item.proposal?.votes?.find(x => x.content_type === 'grant' && x.type === 'formal');
  }

  const openKycDetailDialog = (user) => {
    openDialog(<KycDetailDialog className="kyc-dialog" user={user} />);
  }

  const openGrantAgreementDialog = (item) => {
    if (['active', 'completed'].includes(type)) {
      openDialog(<GrantAgreementDialog grantId={item.id} data={item} />);
    } else {
      openDialog(<GrantAgreementDialog grantId={item.id} data={item?.proposal} />);
    }
  }

  const renderKycStatus = (item) => {
    const user = item.user;
    if (user) {
      if (!user.shuftipro) {
        return (
          <div className="text-center">
            <p>Not submitted</p>
            <a className="underline">send reminder</a>
          </div>
        );
      }
      if (user.shuftipro?.status === "pending") {
        return (
          <div className="text-center text-red">
            <p>Needs review</p>
            <a rel="noreferrer" target="_blank" href="https://eta.kyckangaroo.com/" className="underline">go to KYC</a>
          </div>
        );
      }
      if (
        user.shuftipro?.status === "approved"
      ) {
        return (
          <div className="text-center">
            <p>Approved</p>
            <a className="underline" onClick={() => openKycDetailDialog(user)}>see detail</a>
          </div>
        )
      }
      if (user.shuftipro?.status === "error") {
        return (
          <span>
            Error{" "}
          </span>
        );
      }
    } else {
      return <></>;
    }
  }

  const renderComplianceStatus = (item) => {
    let compliance_status;
    if (['active', 'completed'].includes(type)) {
      compliance_status = item?.proposal?.onboarding?.compliance_status;
    } else {
      compliance_status = item?.compliance_status;
    }
    if (compliance_status === 'approved') {
      return (
        <div className="text-center">
          <p>Approved</p>
          <Link to={`proposals/${item.proposal_id}/compliance`} className="underline">see detail</Link>
        </div>
      );
    } else if (compliance_status === 'denied') {
      return (
        <div className="text-center">
          <p>Denied</p>
          <Link to={`proposals/${item.proposal_id}/compliance`} className="underline">see detail</Link>
        </div>
      );
    } else {
      return (
        <div className="text-center text-red">
          <p>Needs review</p>
          {!!(user.is_super_admin || user.compliance) && <Link to={`proposals/${item.proposal_id}/compliance`} className="underline">review now</Link>}
        </div>
      )
    }
  }

  return (
    <Table
      {...register}
      className="proposals-table h-full"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Grant #</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Title</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Informal Vote Status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Compliance checks</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>KYC status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Formal Vote Result</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Formal Vote Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Grant Agreement</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>View in Main Portal</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              <p>{row.proposal_id}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.proposal?.title}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {
                findInformalGrantVote(row)?.status === 'completed' &&
                  <div className="text-center">
                    <p>Pass</p>
                    <Link to={`proposals/${row.proposal_id}/votes/${findInformalGrantVote(row).id}`} className="underline">see results</Link>
                  </div>
              }
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(findInformalGrantVote(row)?.created_at)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {renderComplianceStatus(row)}
            </Table.BodyCell>
            <Table.BodyCell>
              {renderKycStatus(row)}
            </Table.BodyCell>
            <Table.BodyCell>
              {
                findFormalGrantVote(row)?.status === 'completed' &&
                  <div className="text-center">
                    <p>Pass</p>
                    <a className="underline">see results</a>
                  </div>
              }
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(findFormalGrantVote(row)?.created_at)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <div className="text-center">
                {['active', 'completed'].includes(type) && (
                  <p>{row.signture_grants.filter(x => x.signed)?.length}/3</p>
                )}
                {['pre-grant'].includes(type) && (
                    <p>{row.signed_count}/3</p>
                )}
                <a className="underline" onClick={() => openGrantAgreementDialog(row)}>detail</a>
              </div>
            </Table.BodyCell>
            <Table.BodyCell>
              <a target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_PORTAL_URL}/public-proposals/${row.proposal_id}`}>
                <Button color="primary" size="xs">View</Button>
              </a>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}


