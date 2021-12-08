import ComplianceTab from './ComplianceTab';
import { ComplianceTable } from '../tables/ComplianceTable';
import { getDeniedCompliance } from '@stores/api/shared/actions';

const DeniedTab = () => {
  return (
    <ComplianceTab title="Compliance Denied">
      <ComplianceTable api={getDeniedCompliance} />
    </ComplianceTab>
  )
}

export default DeniedTab;
