import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, useDialog } from '@shared/partials';
import PendingAddressTable from './components/tables/PendingAddress';
import CurrentAddressTable from './components/tables/CurrentAddress';
import AddAddressDialog from './components/dialogs/AddAddressDialog';

const AddressesList = () => {
  const { openDialog } = useDialog();
  const [reload, setReload] = useState();

  const forceReloadList = (result) => {
    if (result) {
      setReload(true);
      setTimeout(() => {
        setReload(false);
      }, 100);
    }
  }

  const triggerAddAddress = () => {
    openDialog(
      <AddAddressDialog afterClosed={(result) => forceReloadList(result)} />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 min-h-0 mb-5">
        <CardHeader>
          <h2>Pending Address changes</h2>
        </CardHeader>
        <CardBody>
          <PendingAddressTable reloadCurrentAddressList={forceReloadList} />
        </CardBody>
      </Card>
      <Card className="flex-1 min-h-0">
        <CardHeader>
          <div className="flex justify-between">
            <h2>Current user addresses</h2>
            <Button className="ml-5" color="primary" size="xs" onClick={triggerAddAddress}>Add address to unlisted user</Button>
          </div>
        </CardHeader>
        <CardBody>
          {!reload && <CurrentAddressTable />}
        </CardBody>
      </Card>
    </div>
  )
};

export default AddressesList;
