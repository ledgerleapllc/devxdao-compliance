import ComplianceTab from './ComplianceTab';
import { ComplianceTable } from '../tables/ComplianceTable';
import { getApprovedCompliance } from '@stores/api/shared/actions';

const CompletedGrantTab = () => {
  return (
    <ComplianceTab title="Compliance Approved">
      <ComplianceTable api={getApprovedCompliance} />
    </ComplianceTab>
  )
}

export default CompletedGrantTab;