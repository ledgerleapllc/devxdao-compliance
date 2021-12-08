import { Table, useTable } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMilestones } from '@stores/api/shared/actions';
import { formatDate, formatPrice } from '@shared/core/utils';
import './style.scss';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const AllMilestonesTable = ({ outParams, onTotal }) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getAllMilestones({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore, res) => {
        setHasMore(isHasMore);
        appendData(results);
        onTotal({
          totalGrant: res.totalGrant,
          totalPaid: res.totalPaid,
          totalUnpaid: res.totalUnpaid,
        })
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

  const renderMilestoneIndex = (row) => {
    const index = row.milestones.findIndex(x => x.id === row.id);
    return index + 1;
  }

  const renderVoteResult = (item) => {
    const vote = item.votes[item.votes.length - 1];
    if (vote && vote.status === "completed") {
      if (vote.result_count && vote.result === "success")
        return (
          <label className="text-purple d-block">Pass</label>
        );
      else if (vote.result === "no-quorum")
        return (
          <label className="text-red d-block">No Quorum</label>
        );
      return <label className="text-red d-block">Fail</label>;
    }
    return null;
  }

  return (
    <Table
      {...register}
      className="all-milestones-table h-full"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Milestone number</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>OP email</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Prop #</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Proposal Title</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Milestone</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Euro value</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Due date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Submitted date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Review status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Vote result</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Paid?</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Paid Date</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              {row.proposal_id}-{renderMilestoneIndex(row)}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.submitted_time ? "Submitted" : "Not submitted"}
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.email}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.proposal_id}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {row.milestone_review_status === "denied" && (
                <p>re-submission {renderMilestoneIndex(row)}</p>
              )}
              <p>{row.proposal_title}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p className="pl-3">
                {renderMilestoneIndex(row)}/{row.milestones.length}
              </p>
            </Table.BodyCell>
            <Table.BodyCell>
             {formatPrice(row.grant)}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.deadline
                ? formatDate(row.deadline)
                : ""}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.submitted_time
                ? formatDate(row.submitted_time)
                : ""}
            </Table.BodyCell>
            <Table.BodyCell>
              <p>
                {row.milestone_review_status === "approved" && "Approved"}
                {row.milestone_review_status === "pending" && "Unassigned"}
                {row.milestone_review_status === "active" && "Assigned"}
                {row.milestone_review_status === "denied" && "Denied"}
                {row.milestone_review_status === "Not Submitted" &&
                  "Not Submitted"}
              </p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{renderVoteResult(row)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.paid ? "Yes" : "No"}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>
                {row.paid_time
                  ? formatDate(row.paid_time)
                  : ""
                }
              </p>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
