import { Tab } from '@shared/partials';
import CompletedTab from './components/tabs/CompletedTab';
import PendingTab from './components/tabs/PendingTab';

const tabsData = [
  {
    content: PendingTab,
    id: 'pending',
    title: 'Pending',
  },
  {
    content: CompletedTab,
    id: 'approved',
    title: 'Completed',
  },
];

const AgreementsList = () => {
  return (
    <div className="-mt-10 h-tab">
      <Tab tabs={tabsData} />
    </div>
  )
}

export default AgreementsList;