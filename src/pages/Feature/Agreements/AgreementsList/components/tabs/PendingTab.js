import AgreementTab from './AgreementTab';
import { PendingAgreementsTable } from '../tables/PendingAgreementsTable';

const PendingTab = () => {
  return (
    <AgreementTab>
      <PendingAgreementsTable />
    </AgreementTab>
  )
}

export default PendingTab;