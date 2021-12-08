import { Card, CardHeader, CardBody, Button, Radio, DatePicker } from '@shared/partials';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { downloadInvoices } from '@stores/api/shared/actions';
import { InvoicesTable } from './components/tables/InvoicesTable';
import { formatDate, formatPrice } from '@shared/core/utils';
import { RadioGroup, FormControlLabel, FormControl, Checkbox } from '@mui/material';
import { useSearch } from '@shared/hooks/useSearch';

const InvoicesList = () => {
  const [params, setParams] = useState({show: 'both'});
  const dispatch = useDispatch();
  const [total, setTotal] = useState();
  const [isFilterDate, setFilterDate] = useState(false);
  const [isDownloading, setIsDownloading] = useState();
  const { inputValue, handleSearch } = useSearch();

  const updateParams = (key, value) => {
    let paramsTemp = params;
    if (!paramsTemp) paramsTemp = {};
    if (key === "notSubmitted") {
      if (value) {
        paramsTemp[key] = 1;
      } else {
        delete paramsTemp[key];
      }
    } else if (["hidePaid", "hideCompletedGrants"].includes(key)) {
      if (value) {
        paramsTemp[key] = 1;
      } else {
        delete paramsTemp[key];
      }
    } else if (["startDate", "endDate"].includes(key)) {
      if (value) {
        const temp = formatDate(value, 'yyyy-MM-dd');
        paramsTemp[key] = temp;
        setFilterDate(true);
      } else {
        delete paramsTemp[key];
      }
    } else {
      if (value) {
        paramsTemp[key] = value;
      } else {
        delete paramsTemp[key];
      }
    }
    setParams({ ...paramsTemp });
  }

  const download = () => {
    setIsDownloading(true);
    dispatch(
      downloadInvoices(
        params,
        (res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "invoices.csv");
          document.body.appendChild(link);
          link.click();
          setIsDownloading(false);
        },
        () => {},
      )
    )
  }

  const handleCheckFilterDate = (event) => {
    const value = event.target.checked;
    setFilterDate(value);
    if (!value) {
      params.startDate && updateParams('startDate', null);
      params.endDate && updateParams('endDate', null);
    }
  };

  const onSearch = (val) => {
    updateParams('search', val);
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 min-h-0">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h2>Invoices</h2>
            <div className="flex gap-4">
              <div>
                <input
                  className="text-xs"
                  type="text"
                  placeholder="Search..."
                  value={inputValue}
                  onChange={handleSearch(onSearch)}
                />
              </div>
              <Button isLoading={isDownloading} disabled={isDownloading} size="xs" color="primary" onClick={download}>Export Table to CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col h-full gap-4">
            <div className="flex gap-4">
              <table className="total-table w-1/3 text-sm">
                <tbody>
                  <tr>
                    <td className="pr-2">Total invoiced:</td>
                    <td>
                      <span className="font-medium">{total?.invoiceCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-2">Number of invoices paid:</td>
                    <td>
                      <span className="font-medium">{total?.invoicePaidCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-2">Total Euros paid:</td>
                    <td>
                      <span className="font-medium">{formatPrice(total?.totalPaid, 6)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-2">Number of invoices unpaid:</td>
                    <td>
                      <span className="font-medium">{total?.invoiceUnpaidCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-2">Total Euros unpaid:</td>
                    <td>
                      <span className="font-medium">{formatPrice(total?.totalUnpaid, 6)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pl-10 flex gap-4 w-2/3 items-center">
                <div className="w-1/3">
                  <FormControl component="fieldset">
                    <RadioGroup
                      className="text-xs"
                      aria-label="gender"
                      defaultValue="both"
                      name="radio-buttons-group"
                      onChange={(event) => {
                        updateParams('show', event.target.value);
                      }}
                      value={params?.show}
                    >
                      <Radio value="paid" label="Show only paid" />
                      <Radio value="unpaid" label="Show only unpaid" />
                      <Radio value="both" label="Show both" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="flex flex-col gap-1">
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckFilterDate} checked={isFilterDate} />
                    }
                    label="Filter by date range"
                  />
                  <div className="flex gap-4">
                    <DatePicker
                      label="Start date"
                      value={params?.startDate ? params.startDate : null}
                      maxDate={params?.endDate && new Date(params.endDate)}
                      onChange={(newValue) => {
                        updateParams('startDate', newValue);
                      }}
                    />
                    <DatePicker
                      label="End date"
                      value={params?.endDate ? params.endDate : null}
                      minDate={params?.startDate && new Date(params.startDate)}
                      onChange={(newValue) => {
                        updateParams('endDate', newValue);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex-1 min-h-0">
              <InvoicesTable outParams={params} onTotal={setTotal} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default InvoicesList