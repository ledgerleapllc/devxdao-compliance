import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '@stores/auth/actions';
import { useHistory } from 'react-router';
import { ReactComponent as DashboardIcon } from '@assets/icons/ic-dashboard.svg';
import { ReactComponent as ComplianceIcon } from '@assets/icons/ic-compliance.svg';
import { ReactComponent as AgreementIcon } from '@assets/icons/ic-agreement.svg';
import { ReactComponent as MilestoneIcon } from '@assets/icons/ic-milestone.svg';
import { ReactComponent as AccountingIcon } from '@assets/icons/ic-accounting.svg';
import { ReactComponent as LogoutIcon } from '@assets/icons/ic-logout.svg';
import { ReactComponent as SettingIcon } from '@assets/icons/ic-setting.svg';
import { ReactComponent as InvoiceIcon } from '@assets/icons/ic-setting.svg';

export const useSidebar = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.authReducer?.user);

  useEffect(() => {
    if (user?.is_super_admin) {
      setItems([
        {
          key: 'dashboard',
          icon: DashboardIcon,
          label: 'Dashboard',
          action: {
            to: '/app/dashboard',
          }
        },
        {
          key: 'compliance',
          icon: ComplianceIcon,
          label: 'Compliance',
          action: {
            to: '/app/compliances',
          }
        },
        {
          key: 'agreements',
          icon: AgreementIcon,
          label: 'Agreements',
          action: {
            to: '/app/agreements',
          }
        },
        {
          key: 'milestones',
          icon: MilestoneIcon,
          label: 'Milestones',
          action: {
            to: '/app/milestones',
          }
        },
        {
          key: 'invoices',
          icon: InvoiceIcon,
          label: 'invoices',
          action: {
            to:  '/app/invoices', 
          }
        },
        {
          key: 'accounting',
          icon: AccountingIcon,
          label: 'Accounting',
          action: {
            to:  '/app/accounting', 
          }
        },
        {
          key: 'addresses',
          icon: SettingIcon,
          label: 'Addresses',
          action: {
            to: '/app/addresses',
          }
        },
        {
          key: 'setting',
          icon: SettingIcon,
          label: 'Settings',
          action: {
            to: '/app/settings',
          }
        },
        {
          key: 'logout',
          icon: LogoutIcon,
          label: 'Sign Out',
          action: {
            onClick: () => signout()
          } 
        },
      ]);
    } else if (user?.is_pa) {
      const temp = [
        {
          key: 'dashboard',
          icon: DashboardIcon,
          label: 'Dashboard',
          action: {
            to: '/app/dashboard',
          }
        },
        {
          key: 'compliance',
          icon: ComplianceIcon,
          label: 'Compliance',
          action: {
            to: '/app/compliances',
          }
        },
        {
          key: 'agreements',
          icon: AgreementIcon,
          label: 'Agreements',
          action: {
            to: '/app/agreements',
          }
        },
        {
          key: 'milestones',
          icon: MilestoneIcon,
          label: 'Milestones',
          action: {
            to: '/app/milestones',
          }
        },
        {
          key: 'invoices',
          icon: InvoiceIcon,
          label: 'invoices',
          action: {
            to:  '/app/invoices', 
          }
        },
        {
          key: 'accounting',
          icon: AccountingIcon,
          label: 'Accounting',
          action: {
            to:  '/app/accounting', 
          }
        },
        {
          key: 'setting',
          icon: SettingIcon,
          label: 'Settings',
          action: {
            to: '/app/settings',
          }
        },
        {
          key: 'logout',
          icon: LogoutIcon,
          label: 'Sign Out',
          action: {
            onClick: () => signout()
          } 
        },
      ];
      console.log(123, user)
      if (user.address) {
        const settingIndex = temp.findIndex(obj => obj.key === 'setting');
        const addressTab = {
          key: 'addresses',
          icon: SettingIcon,
          label: 'Addresses',
          action: {
            to: '/app/addresses',
          }
        };
        temp.splice(settingIndex, 0, addressTab);
      }
      setItems([...temp]);
    }
  }, [user]);

  const signout = () => {
    dispatch(
      logout(
        () => {
          setTimeout(() => history.push('/auth/login'));
        },
        () => {}
      )
    )
  }

  return { items };
}