import { Tab } from '@shared/partials';
import { useSelector } from "react-redux";
import PreGrantTab from './components/tabs/PreGrantTab';
import ActivatedTab from './components/tabs/ActivatedTab';
import CompletedTab from './components/tabs/CompletedTab';

const tabsData = [
  {
    content: PreGrantTab,
    id: 'pre-grant',
    title: 'Pre-Grant',
  },
  {
    content: ActivatedTab,
    id: 'activated',
    title: 'Activated',
  },
  {
    content: CompletedTab,
    id: 'completed',
    title: 'Completed',
  },
];

const ProposalsList = () => {
  const user = useSelector(state => state.authReducer?.user);

  return (
    <div className="-mt-10 h-tab">
      {
        user && (
          <Tab tabs={tabsData} data={{ user }} />
        )
      }
    </div>
  )
}

export default ProposalsList;