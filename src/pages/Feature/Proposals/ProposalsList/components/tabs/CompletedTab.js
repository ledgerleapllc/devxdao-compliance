import GrantTab from './GrantTab';
import { GrantTable } from '../tables/GrantTable';
import { getCompletedGrants } from '@stores/api/shared/actions';

const CompletedGrantTab = () => {
  return (
    <GrantTab>
      <GrantTable api={getCompletedGrants} type="completed" />
    </GrantTab>
  )
}

export default CompletedGrantTab;