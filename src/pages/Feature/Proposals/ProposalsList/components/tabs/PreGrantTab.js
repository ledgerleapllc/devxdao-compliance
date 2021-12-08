import GrantTab from './GrantTab';
import { GrantTable } from '../tables/GrantTable';
import { getPreGrants } from '@stores/api/shared/actions';

const PreGrantTab = () => {
  return (
    <GrantTab>
      <GrantTable api={getPreGrants} type="pre-grant" />
    </GrantTab>
  )
}

export default PreGrantTab;