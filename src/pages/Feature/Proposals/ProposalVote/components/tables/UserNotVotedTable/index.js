import { Table, useTable } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserNotVoted } from '@stores/api/shared/actions';
import './style.scss';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const UserNotVotedTable = ({ voteId, outParams, user }) => {
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
      getUserNotVoted({ id: voteId, ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore) => {
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
      className="user-not-voted-table max-h-64"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>VA Forum Name</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>VA Telegram</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>VA Email</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              <p>{row.profile?.forum_name}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.profile?.telegram}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.email}</p>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
