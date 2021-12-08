import { Tab } from '@shared/partials';
import NeedsReviewTab from './components/tabs/NeedsReviewTab';
import ApprovedTab from './components/tabs/ApprovedTab';
import DeniedTab from './components/tabs/DeniedTab';

const tabsData = [
  {
    content: NeedsReviewTab,
    id: 'needs-review',
    title: 'Needs review',
  },
  {
    content: ApprovedTab,
    id: 'approved',
    title: 'Approved',
  },
  {
    content: DeniedTab,
    id: 'denied',
    title: 'Denied',
  },
];

const CompliancesList = () => {
  return (
    <div className="-mt-10 h-tab">
      <Tab tabs={tabsData} />
    </div>
  )
}

export default CompliancesList;