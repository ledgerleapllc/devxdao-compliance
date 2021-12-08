import ComplianceTab from './ComplianceTab';
import { ComplianceTable } from '../tables/ComplianceTable';
import { getNeedsReviewCompliance } from '@stores/api/shared/actions';

const NeedsReviewTab = () => {
  return (
    <ComplianceTab title="Compliance Needing Review">
      <ComplianceTable api={getNeedsReviewCompliance} />
    </ComplianceTab>
  )
}

export default NeedsReviewTab;