/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, useTable, Button, useDialog } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatDate } from '@shared/core/utils';
import './style.scss';
import { Link } from 'react-router-dom';
import { GrantAgreementDialog } from '@shared/partials/dialog/common/GrantAgreementDialog';
import { getPendingGrants } from '@stores/api/shared/actions';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const PendingAgreementsTable = ({ outParams, api }) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getPendingGrants({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore) => {
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

  const findFormalGrantVote = (item) => {
    return item.proposal?.votes?.find(x => x.content_type === 'grant' && x.type === 'formal');
  }

  const openGrantAgreementDialog = (item) => {
    openDialog(<GrantAgreementDialog grantId={item.id} data={item} />);
  }

  const checkSignCount = (item) => {
    return item?.signture_grants?.filter(x => x.signed === 1)?.length;
  }

  const checkOPSigned = (item) => {
    return !!item?.signture_grants?.find(x => x.role === 'OP').signed;
  }

  return (
    <Table
      {...register}
      className="pending-agreement-table h-full"
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
          <p>Formal Vote Status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Formal Vote End Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Agreement</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>OP signed?</p>
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
                findFormalGrantVote(row)?.status === 'completed' &&
                  <div className="text-center">
                    <p>Pass</p>
                    <Link to={`proposals/${row.proposal_id}/votes/${findFormalGrantVote(row).id}`} className="underline">see results</Link>
                  </div>
              }
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(findFormalGrantVote(row)?.created_at)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <div className={!checkSignCount(row) && `text-red`}>
                <p>{checkSignCount(row)}/3</p>
                <a className="underline" onClick={() => openGrantAgreementDialog(row)}>detail</a>
              </div>
            </Table.BodyCell>
            <Table.BodyCell>
              {checkOPSigned(row) ? <span>Yes</span> : <span className="text-red">No</span>}
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


