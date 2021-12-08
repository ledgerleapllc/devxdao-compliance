import AgreementTab from './AgreementTab';
import { CompletedAgreementsTable } from '../tables/CompletedAgreementsTable';

const CompletedTab = () => {
  return (
    <AgreementTab>
      <CompletedAgreementsTable />
    </AgreementTab>
  )
}

export default CompletedTab;