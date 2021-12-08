import { Table, useTable, SwitchButton } from '@shared/partials';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoices, markPaid } from '@stores/api/shared/actions';
import { formatDate } from '@shared/core/utils';
import './style.scss';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const InvoicesTable = ({ outParams, onTotal }) => {
  const {
    data,
    register,
    hasMore,
    setData,
    appendData,
    setHasMore,
    setPage,
    setParams,
    page,
    params,
    resetData,
  } = useTable();
  const [total, setTotal] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer?.user);
  

  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getInvoices({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, (results, isHasMore, res) => {
        setHasMore(isHasMore);
        appendData(results);
        const tempTotal = {
          invoiceCount: res.invoiceCount,
          invoicePaidCount: res.invoicePaidCount,
          invoiceUnpaidCount: res.invoiceUnpaidCount,
          totalGrant: res.totalGrant,
          totalPaid: res.totalPaid,
          totalUnpaid: res.totalUnpaid,
        };
        onTotal(tempTotal);
        setTotal(tempTotal);
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

  const paid = (value, row) => {
    dispatch(
      markPaid(
        { id: row.id, paid: value ? 1 : 0 },
        () => {
          if (value) {
            row.paid = 1;
            row.marked_paid_at = new Date().toISOString();
            const tempTotal = {
              invoiceCount: total.invoiceCount,
              invoicePaidCount: total.invoicePaidCount + 1,
              invoiceUnpaidCount: total.invoiceUnpaidCount - 1,
              totalGrant: total.totalGrant,
              totalPaid: total.totalPaid + +row.milestone?.grant,
              totalUnpaid: total.totalUnpaid - +row.milestone?.grant,
            };
            onTotal(tempTotal);
            setTotal(tempTotal);
          } else {
            row.paid = 0;
            row.marked_paid_at = null;
            const tempTotal = {
              invoiceCount: total.invoiceCount,
              invoicePaidCount: total.invoicePaidCount - 1,
              invoiceUnpaidCount: total.invoiceUnpaidCount + 1,
              totalGrant: total.totalGrant,
              totalPaid: total.totalPaid - +row.milestone?.grant,
              totalUnpaid: total.totalUnpaid + +row.milestone?.grant,
            };
            onTotal(tempTotal);
            setTotal(tempTotal);
          }
          setData([...data]);
        }
      )
    );
  }

  return (
    <Table
      {...register}
      className="invoices-table h-full"
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Invoice #</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Sent Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Payee</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Grant #</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Milestone #</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Proposal title</p>
        </Table.HeaderCell>
        {
          user.paid ? (
            <Table.HeaderCell>
              <p>Paid ?</p>
            </Table.HeaderCell>
          ) : (
            <></>
          )
        }
        <Table.HeaderCell>
          <p>Date marked paid</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              <p>{row.code}</p>
              {row.pdf_link_url && <a className="underline" rel="noreferrer" href={row.pdf_link_url} target="_blank">view</a>}
            </Table.BodyCell>
            <Table.BodyCell>
              {formatDate(row.sent_at)}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.payee_email}
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{row.proposal_id}</p>
              <a className="underline" target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_PORTAL_URL}/public-proposals/${row.proposal_id}`}>
                view
              </a>
            </Table.BodyCell>
            <Table.BodyCell>
              {row.milestone_id}
            </Table.BodyCell>
            <Table.BodyCell>
              {row.proposal?.title}
            </Table.BodyCell>
            {
              user.paid ? (
                <Table.BodyCell>
                  <SwitchButton value={row.paid} onChange={(val) => paid(val, row)} />
                </Table.BodyCell>
              ) : (
                <></>
              )
            }
            <Table.BodyCell>
              {formatDate(row.marked_paid_at)}
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
