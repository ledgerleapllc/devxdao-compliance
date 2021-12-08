import { Table, useTable, useDialog, Button, SwitchButton } from '@shared/partials';
import { getUsers, updateComplianceUser, updatePaidUser, updateAddressUser } from '@stores/api/admin/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RevokeUserDialog } from '../../dialogs/RevokeUserDialog';
import { ActivateUserDialog } from '../../dialogs/ActivateUserDialog';
import { NewPasswordDialog } from '../../dialogs/NewPasswordDialog';
import { detectTypeUser, formatDate } from '@shared/core/utils';
import './style.scss';
import classNames from 'classnames';
import { DEFAULT_API_RECORDS } from '@shared/core/constant';

export const UsersTable = ({ outParams, readOnly }) => {
  const {
    data,
    register,
    setData,
    hasMore,
    appendData,
    setHasMore,
    page,
    setParams,
    params,
    resetData,
    setPage,
  } = useTable();
  const dispatch = useDispatch();
  const { openDialog } = useDialog();
  const user = useSelector(state => state.authReducer?.user);
  
  const fetchData =(pageValue = page, paramsValue = params) => {
    dispatch(
      getUsers({ ...paramsValue, page_id: pageValue, limit: DEFAULT_API_RECORDS }, user, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
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

  const triggerRevoke = (user) => {
    if (!readOnly) {
      openDialog(
        <RevokeUserDialog 
          user={user}
          afterClosed={(result) => {
            if (result) {
              const currentUser = data.find(x => x.id === result.id);
              currentUser.banned = 1;
              setData([...data]);
            }
          }}
        />
      )
    }
  }

  const triggerActivate = (user) => {
    if (!readOnly) {
      openDialog(
        <ActivateUserDialog 
          user={user}
          afterClosed={(result) => {
            if (result) {
              const currentUser = data.find(x => x.id === result.id);
              currentUser.banned = 0;
              setData([...data]);
            }
          }}
        />
      )
    }
  }

  const triggerResetPW = (user) => {
    openDialog(
      <NewPasswordDialog user={user} />
    )
  }

  const updateCompliance = (val, id) => {
    dispatch(
      updateComplianceUser(
        { id, compliance: val ? 1 : 0 },
        (res) => {
          console.log(res);
        },
        () => {},
      )
    );
  }

  const updatePaid = (val, id) => {
    dispatch(
      updatePaidUser(
        { id, paid: val ? 1 : 0 },
        (res) => {
          console.log(res);
        },
        () => {},
      )
    );
  }

  const updateAddress = (val, id) => {
    dispatch(
      updateAddressUser(
        { id, address: val ? 1 : 0 },
        (res) => {
          console.log(res);
        },
        () => {},
      )
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      {...register}
      className={classNames(readOnly ? 'read-only' : '', `users-table h-full`)}
      onLoadMore={fetchData}
      hasMore={hasMore}
      dataLength={data.length}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>Email</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Date Added</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Type</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Last Login</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>IP Address</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Compliance</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Paid</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Address</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Action</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body className="padding-tracker">
        {data.map((row, ind) => (
          <Table.BodyRow key={ind}>
            <Table.BodyCell>
              <p className="break-words">{row.email}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {formatDate(row.created_at)}
            </Table.BodyCell>
            <Table.BodyCell>
              <p className="capitalize">{detectTypeUser(row)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              <p>{formatDate(row.last_login_at)}</p>
            </Table.BodyCell>
            <Table.BodyCell>
              {row.last_login_ip_address}
            </Table.BodyCell>
            <Table.BodyCell>
              <SwitchButton value={!!row.compliance} onChange={(val) => updateCompliance(val, row.id)} />
            </Table.BodyCell>
            <Table.BodyCell>
              <SwitchButton value={!!row.paid} onChange={(val) => updatePaid(val, row.id)} />
            </Table.BodyCell>
            <Table.BodyCell>
              <SwitchButton value={!!row.address} onChange={(val) => updateAddress(val, row.id)} />
            </Table.BodyCell>
            <Table.BodyCell>
              <div className="flex gap-1">
                {!row.banned && <Button color="danger" size="xs" onClick={() => triggerRevoke(row)}>Revoke</Button>}
                {!!row.banned && <Button color="success" size="xs" onClick={() => triggerActivate(row)}>Activate</Button>}
                <Button color="primary" size="xs" onClick={() => triggerResetPW(row)}>Reset Password</Button>
              </div>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  )
}
