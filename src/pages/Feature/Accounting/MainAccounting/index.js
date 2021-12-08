import { Card, CardHeader, CardBody, Button } from '@shared/partials';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { getMetrics, downloadDosFee } from '@stores/api/shared/actions';
import { AccountingTable } from './components/tables/AccountingTable';
import { formatDate, formatPrice } from '@shared/core/utils';
import { useSearch } from '@shared/hooks/useSearch';

const MilestonesList = () => {
  const [metrics, setMetrics] = useState();
  const [params, setParams] = useState();
  const dispatch = useDispatch();
  const [total, setTotal] = useState();
  const [isDownloading, setIsDownloading] = useState();
  const { inputValue, handleSearch } = useSearch();

  useEffect(() => {
    dispatch(
      getMetrics(
        {},
        (res) => {
          setMetrics(res);
        },
        () => {},
      )
    )
  }, []);

  const updateParams = (key, value) => {
    let paramsTemp = params;
    if (!paramsTemp) paramsTemp = {};
    if (["end_date", "start_date"].includes(key)) {
      if (value) {
        const temp = formatDate(value, 'yyyy-MM-dd');
        paramsTemp[key] = temp;
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
      downloadDosFee(
        params,
        (res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "dos-fee.csv");
          document.body.appendChild(link);
          link.click();
          setIsDownloading(false);
        },
        () => {},
      )
    )
  }

  const onSearch = (val) => {
    updateParams('search', val);
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="mb-4">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h2>System Metrics</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4">
            <label className="pb-4">Sum of grants activated:</label>
            <span>{formatPrice(metrics?.totalGrant)}</span>
          </div>
        </CardBody>
      </Card>
      <Card className="flex-1 min-h-0">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h2>DOS Fee Tracker</h2>
            <div className="flex gap-4">
              <input
                className="text-xs"
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleSearch(onSearch)}
              />
              <Button isLoading={isDownloading} disabled={isDownloading} size="xs" color="primary" onClick={download}>Download</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col h-full">
            <div className="flex justify-between">
              <div>
                <table className="total-table">
                  <tbody>
                    <tr>
                      <td className="pr-2">ETH total for date range:</td>
                      <td>
                        <span className="font-medium">{formatPrice(total?.totalETH)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-2">CC total for date range:</td>
                      <td>
                        <span className="font-medium">{formatPrice(total?.totalCC)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start date"
                      value={params?.start_date ? params.start_date : null}
                      onChange={(newValue) => {
                        updateParams('start_date', newValue);
                      }}
                      renderInput={(params) => <TextField sx={{width: '12rem'}} {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End date"
                      value={params?.end_date ? params.end_date : null}
                      onChange={(newValue) => {
                        updateParams('end_date', newValue);
                      }}
                      renderInput={(params) => <TextField sx={{width: '12rem'}} {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="mt-10 flex-1 min-h-0">
              <AccountingTable outParams={params} onTotal={setTotal} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MilestonesList