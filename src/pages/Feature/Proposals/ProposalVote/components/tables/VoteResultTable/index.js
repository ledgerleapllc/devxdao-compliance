import { Table, useTable } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getVoteResult } from '@stores/api/shared/actions';
import { formatDate, formatDecimals } from '@shared/core/utils';
import './style.scss';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const VoteResultTable = ({ voteId, outParams, user }) => {
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

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getVoteResult({ id: voteId, ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      {...register}
      className="vote-result-table max-h-64"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Forum Name</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Stake For</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Stake Against</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Time of Vote</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              <p>{row.user?.profile?.forum_name}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.type === 'for' && formatDecimals(row.value)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.type === 'against' && formatDecimals(row.value)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(row.created_at, 'dd/MM/yyyy HH:mm aa')}</p>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
