import GrantTab from './GrantTab';
import { GrantTable } from '../tables/GrantTable';
import { getActiveGrants } from '@stores/api/shared/actions';

const ActiveGrantTab = () => {
  return (
    <GrantTab>
      <GrantTable api={getActiveGrants} type="active" />
    </GrantTab>
  )
}

export default ActiveGrantTab;