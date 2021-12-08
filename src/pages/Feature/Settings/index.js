import { Card, CardHeader, CardBody, Button, useSnackBar } from '@shared/partials';
import { ChangePasswordDialog } from './components/dialogs/ChangePasswordDialog';
import { useDialog } from '@shared/partials/dialog/Provider';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddAssistantDialog } from './components/UsersList/components/dialogs/AddAssistantDialog';
import { UsersTable } from './components/UsersList/components/tables/UsersTable';
import { useSearch } from '@shared/hooks/useSearch';

const Settings = () => {
  const { openDialog } = useDialog();
  const { openSnack } = useSnackBar();
  const [reload, setReload] = useState();
  const [params, setParams] = useState();
  const user = useSelector(state => state.authReducer?.user);
  const { inputValue, handleSearch } = useSearch();

  const openChangePWDialog = () => {
    openDialog(
      <ChangePasswordDialog afterClosed={(result) => forceReloadPW(result)} />
    );
  }

  const forceReloadPW = (result) => {
    if (result) {
      openSnack('primary', 'Your password has successfully been updated!');
    }
  }

  const openAddAssistantDialog = () => {
    openDialog(
      <AddAssistantDialog afterClosed={(result) => forceReloadList(result)}/>
    )
  }

  const forceReloadList = (result) => {
    if (result) {
      setReload(true);
      setTimeout(() => {
        setReload(false);
      }, 100);
    }
  }

  const onSearch = (val) => {
    setParams({ search: val });
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {!!user.is_super_admin && (<div className="flex justify-end pb-5">
          <Button className="px-6" color="primary" onClick={openAddAssistantDialog}>+ New Compliance Assistant</Button>
        </div>)}
        <Card className="mb-4">
          <CardHeader>
            <div className="w-full flex justify-between">
              <h2>Settings</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div>
              <h6 className="pb-4">Update Password</h6>
              <Button size="sm" className="!w-1" color="primary" onClick={() => openChangePWDialog()}>Start</Button>
            </div>
          </CardBody>
        </Card>
        {!!user.is_super_admin && (
          <Card className="flex-1 min-h-0">
            <CardHeader>
              <div className="w-full flex justify-between">
                <h2>User Management</h2>
                <input
                  className="text-xs"
                  type="text"
                  placeholder="Search..."
                  value={inputValue}
                  onChange={handleSearch(onSearch)}
                />
              </div>
            </CardHeader>
            <CardBody>
              {!reload && <UsersTable outParams={params} readOnly={!user.is_super_admin} />}
            </CardBody>
          </Card>
        )}
      </div>
    </>
  )
}

export default Settings;