import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, useTable, useDialog } from '@shared/partials';
import { getPendingAddresses } from '@stores/api/shared/actions';
import { formatDate } from '@shared/core/utils';
import ConfirmVoidAddressDialog from '../../dialogs/ConfirmVoidAddressDialog';
import ConfirmUpdateAddressDialog from '../../dialogs/ConfirmUpdateAddressDialog';
import './style.scss';

const AddressTable = ({forceReloadList, reloadCurrentAddressList}) => {
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    setPage,
  } = useTable();
  const { openDialog } = useDialog();
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(
      getPendingAddresses((results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerAvoidAddress = (addressId) => {
    openDialog(
      <ConfirmVoidAddressDialog addressId={addressId} afterClosed={(result) => forceReloadList(result)} />
    );
  };

  const triggerConfirmUpdateAddress = (addressId) => {
    openDialog(
      <ConfirmUpdateAddressDialog addressId={addressId} afterClosed={(result) => {
        forceReloadList(result)
        reloadCurrentAddressList(result)
      }} />
    );
  };

  return (
    <Table
        {...register}
      className="pending-address-table h-full"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}>
      <Table.Header>
        <Table.HeaderCell>
          <p>UserID</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Email</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>CSPR Address</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Request Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Action</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map(val => (
          <Table.BodyRow key={val.id}>
            <Table.BodyCell>
              <p>{val.id}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{val.email}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{val.cspr_address}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(val.created_at)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <div className="flex justify-between gap-2">
                <Button color="primary" size="xs" onClick={() => triggerConfirmUpdateAddress(val.id)}>Confirm Update</Button>
                <Button color="primary-outline" size="xs" onClick={() => triggerAvoidAddress(val.id)}>Void</Button>
              </div>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}

const PendingAddressTable = ({reloadCurrentAddressList}) => {
  const [reload, setReload] = useState();
  const forceReloadList = (result) => {
    if (result) {
      setReload(true);
      setTimeout(() => {
        setReload(false);
      }, 100);
    }
  }
  
  return (
    <>
      {!reload && <AddressTable forceReloadList={forceReloadList} reloadCurrentAddressList={reloadCurrentAddressList} />}
    </>   
  )
};

export default PendingAddressTable;
