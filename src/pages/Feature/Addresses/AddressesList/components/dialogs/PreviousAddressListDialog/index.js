import React, { useEffect } from 'react';
import { Dialog, Table, useTable } from '@shared/partials';
import { formatDate } from '@shared/core/utils';
import './style.scss';

const PreviousAddressListDialog = ({ list, close }) => {
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    setPage,
  } = useTable();

  const fetchData = () => {
    setTimeout(() => {
      setHasMore(false);
      appendData(list.reverse());
      setPage(prev => prev + 1);
    }, 500);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dialog>
      <Dialog.Header>
        Addresses and previous changes
      </Dialog.Header>
      <Dialog.Body>
        <Table
          {...register}
          className="previous-address-table h-full"
          onLoadMore={fetchData}
          hasMore={hasMore}
          dataLength={data.length}
        >
          <Table.Header>
            <Table.HeaderCell>
              <p>Address</p>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <p>Date Changed</p>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <p>Request IP</p>
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body className="padding-tracker">
            {data.map((val, index) => (
              <Table.BodyRow key={val.id}>
                <Table.BodyCell>
                  <p className="txt-start">{val.cspr_address}</p>
                </Table.BodyCell>
                <Table.BodyCell>
                  <p>{index === 0 ? `Current` : formatDate(val.updated_at)}</p>
                </Table.BodyCell>
                <Table.BodyCell>
                  <p>{val.request_ip}</p>
                </Table.BodyCell>
              </Table.BodyRow>
            ))}
          </Table.Body>
        </Table>
      </Dialog.Body>
      <button type="button" className="mx-auto mt-4 block text-xs underline" onClick={() => close(false)}>Cancel</button>
    </Dialog>
  );
};

export default PreviousAddressListDialog;
