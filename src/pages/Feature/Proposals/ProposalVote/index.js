import { Card, CardHeader, CardBody, BreadCrumb } from '@shared/partials';
import { useScroll } from '@shared/hooks/useScroll';
import { useEffect } from 'react';
import { getVoteDetail} from '@stores/api/shared/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { getQuorumRate } from '@shared/core/utils';
import { VOTE_RESULTS } from '@shared/core/constant';
import { VoteResultTable } from '../ProposalVote/components/tables/VoteResultTable';
import { UserNotVotedTable } from '../ProposalVote/components/tables/UserNotVotedTable';
import './style.scss';

const ProposalsVote = () => {
  const dispatch = useDispatch();
  const { voteId } = useParams();
  const [vote, setVote] = useState();
  const settings = useSelector(state => state.authReducer.settings);
  const user = useSelector(state => state.authReducer.user);
  useScroll();

  useEffect(() => {
    console.log(voteId);
    dispatch(
      getVoteDetail(
        {id: voteId},
        (res) => {
          setVote(res);
        },
        () => {}
      )
    );
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <BreadCrumb text={vote?.proposal?.title} />
      <Card className="h-m-content !py-9">
        <CardBody>
          <table className="vote-detail-table">
            <tbody>
              <tr>
                <td>Vote Type:</td>
                <td className="capitalize">{vote?.type}</td>
              </tr>
              <tr>
                <td>Quorum Rate:</td>
                <td>{getQuorumRate(vote, settings)}</td>
              </tr>
              <tr>
                <td>Votes Obtained:</td>
                <td>{vote?.result_count} / {user?.totalMembers}</td>
              </tr>
              <tr>
                <td>Result:</td>
                <td>{VOTE_RESULTS[vote?.result]}</td>
              </tr>
              <tr>
                <td>Stake for/against:</td>
                <td>{vote?.for_value} / {vote?.against_value}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card className="!py-9">
        <CardHeader>
          <div className="flex justify-between">
            <h2>Vote Results</h2>
          </div>
        </CardHeader>
        <CardBody>
          <VoteResultTable voteId={voteId} />
        </CardBody>
      </Card>
      <Card className="!py-9">
        <CardHeader>
          <div className="flex justify-between">
            <h2>VAs who have not voted yet</h2>
          </div>
        </CardHeader>
        <CardBody>
          <UserNotVotedTable voteId={voteId} />
        </CardBody>
      </Card>
    </div>
  )
}

export default ProposalsVote;