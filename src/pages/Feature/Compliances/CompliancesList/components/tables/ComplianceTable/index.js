/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, useTable, Button, useDialog } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@shared/core/utils';
import { KycDetailDialog } from '@shared/partials/dialog/common/KycDetailDialog';
import './style.scss';
import { Link } from 'react-router-dom';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const ComplianceTable = ({ outParams, api }) => {
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

  const openKycDetailDialog = (user) => {
    openDialog(<KycDetailDialog className="kyc-dialog" user={user} />);
  }

  const renderKycStatus = (item) => {
    const userTemp = item.user;
    if (userTemp) {
      if (!userTemp.shuftipro) {
        return (
          <div className="text-center">
            <p>Not submitted</p>
            <a className="underline">send reminder</a>
          </div>
        );
      }
      if (userTemp.shuftipro?.status === "pending") {
        return (
          <div className="text-center text-red">
            <p>Needs review</p>
            <a rel="noreferrer" target="_blank" href="https://eta.kyckangaroo.com/" className="underline">go to KYC</a>
          </div>
        );
      }
      if (
        userTemp.shuftipro?.status === "approved"
      ) {
        return (
          <div className="text-center">
            <p>Approved</p>
            <a className="underline" onClick={() => openKycDetailDialog(userTemp)}>see detail</a>
          </div>
        )
      }
      if (userTemp.shuftipro?.status === "error") {
        return (
          <span>
            Error{" "}
          </span>
        );
      }
      if (userTemp.shuftipro?.status === "denied") {
        return (
          <span>
            <p>Denied</p>
            <a className="underline" onClick={() => openKycDetailDialog(userTemp)}>see detail</a>
          </span>
        );
      }
    } else {
      return <></>;
    }
  }

  return (
    <Table
      {...register}
      className="compliance-table h-full"
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
              {row?.compliance_status === 'approved' && (
                <div className="text-center">
                  <p>Approved</p>
                  <Link to={`proposals/${row.proposal_id}/compliance`} className="underline">see detail</Link>
                </div>
              )}
              {row?.compliance_status === 'pending' && (
                 <div className="text-center text-red">
                  <p>Needs review</p>
                  {!!(user.is_super_admin || user.compliance) && <Link to={`proposals/${row.proposal_id}/compliance`} className="underline">review now</Link>}
                </div>
              )}
              {row?.compliance_status === 'denied' && (
                 <div className="text-center text-red">
                  <p>Denied</p>
                </div>
              )}
            </Table.BodyCell>
            <Table.BodyCell>
              {renderKycStatus(row)}
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


