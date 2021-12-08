import { Table, useTable } from '@shared/partials';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDosFee } from '@stores/api/shared/actions';
import { formatDate, formatPrice } from '@shared/core/utils';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

import './style.scss';

export const AccountingTable = ({ outParams, onTotal }) => {
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    setPage,
    setParams,
    page,
    params,
    resetData,
  } = useTable();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getDosFee({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore, res) => {
        setHasMore(isHasMore);
        appendData(results);
        onTotal({
          totalCC: res.totalCC,
          totalETH: res.totalETH,
        })
        setPage(prev => prev + 1);
      })
    );
  }

  useEffect(() => {
    if (outParams) {
      setParams(outParams);
      resetData();
      fetchData(1, outParams);
    }
  }, [outParams]);

  return (
    <Table
      {...register}
      className="accounting-table h-full"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Date time</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Grant number</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>OP</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Type</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Amount</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>ETH Amount</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>TXID</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Bypass?</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              {formatDate(row.created_at, 'dd/MM/yyyy h:mm a')}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.id}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.email}
            </Table.BodyCell>
            <Table.BodyCell>
              <span className="uppercase">{row.type_dos}</span>
            </Table.BodyCell>
            <Table.BodyCell>
              {formatPrice(row?.dos_amount)}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.type_dos === "eth" && row.amount_dos?.toFixed(4)}
            </Table.BodyCell>
            <Table.BodyCell>
              <p className="break-words">{row.dos_txid}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {row.bypass ? "Yes" : "No"}
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
