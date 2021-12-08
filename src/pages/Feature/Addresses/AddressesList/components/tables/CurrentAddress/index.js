import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentAddresses } from '@stores/api/shared/actions';
import { Table, useTable, useDialog } from '@shared/partials';
import { formatDate } from '@shared/core/utils';
import PreviousAddressListDialog from '../../dialogs/PreviousAddressListDialog';

import './style.scss';

const CurrentAddressTable = () => {
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
      getCurrentAddresses((results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerPreviousAddress = (listAddressChanged) => {
    openDialog(
      <PreviousAddressListDialog list={listAddressChanged} />
    );
  };

  return (
    <Table
        {...register}
      className="current-address-table h-full"
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
          <p>Updated Date</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map(val => (
          <Table.BodyRow key={val.id}>
            <Table.BodyCell>
              <p>{val.user_id}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{val.email}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p className="underline pointer" onClick={() => triggerPreviousAddress(val.payment_address_changes)}>{val.cspr_address}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(val.updated_at)}</p>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
};

export default CurrentAddressTable;
