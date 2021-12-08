import { Card, CardHeader, CardBody, SwitchButton, Button, DatePicker, AutoComplete } from '@shared/partials';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getMilestoneProposals, getMilestoneUsers, downloadAllMilestones } from '@stores/api/shared/actions';
import { AllMilestonesTable } from './components/tables/AllMilestonesTable';
import { formatDate, formatPrice } from '@shared/core/utils';
import { useSearch } from '@shared/hooks/useSearch';

const MilestonesList = () => {
  const [proposals, setProposals] = useState([]);
  const [emails, setEmails] = useState([]);
  const [params, setParams] = useState();
  const dispatch = useDispatch();
  const [total, setTotal] = useState();
  const [isDownloading, setIsDownloading] = useState();
  const { inputValue, handleSearch } = useSearch();

  useEffect(() => {
    dispatch(
      getMilestoneProposals(
        {},
        (res) => {
          setProposals(res.map(x => x?.toString()));
        },
        () => {},
      )
    )
    dispatch(
      getMilestoneUsers(
        {},
        (res) => {
          setEmails(res.map(x => x?.toString()));
        },
        () => {},
      )
    )
  }, []);

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
        console.log(temp);
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
      downloadAllMilestones(
        params,
        (res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "milestones.csv");
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
      <Card className="flex-1 min-h-0">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h2>All Milestones</h2>
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
              <div className="w-1/3">
                <table className="total-table text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-2">Total value of shown:</td>
                      <td>
                        <span className="font-medium">{formatPrice(total?.totalGrant)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-2">Total paid amount of shown:</td>
                      <td>
                        <span className="font-medium">{formatPrice(total?.totalPaid)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-2">Total unpaid amount of shown:</td>
                      <td>
                        <span className="font-medium">{formatPrice(total?.totalUnpaid)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-2/3 flex flex-col gap-4">
                <div className="flex gap-4">
                  <DatePicker
                    className="flex-1"
                    label="Start date"
                    value={params?.startDate ? params.startDate : null}
                    onChange={(newValue) => {
                      updateParams('startDate', newValue);
                    }}
                  />
                  <DatePicker
                    className="flex-1"
                    label="End date"
                    value={params?.endDate ? params.endDate : null}
                    onChange={(newValue) => {
                      updateParams('endDate', newValue);
                    }}
                  />
                  <AutoComplete
                    className="flex-1"
                    onChange={(event, newValue) => {
                      updateParams("proposalId", newValue);
                    }}
                    label="Filter by Grant"
                    options={proposals}
                  />
                  <AutoComplete
                    className="flex-1"
                    label="Filter by Email"
                    onChange={(event, newValue) => {
                      updateParams('email', newValue);
                    }}
                    options={emails}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <SwitchButton
                      onChange={(e) =>
                        updateParams("hidePaid", e)
                      }
                    />
                    <span className="text-xs pt-0.5">Hide paid</span>
                  </div>
                  <div className="flex gap-2">
                    <SwitchButton
                      onChange={(e) =>
                        updateParams("hideCompletedGrants", e)
                      }
                    />
                    <span className="text-xs pt-0.5">Hide milestones for completed grants</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex-1 min-h-0 overflow-x-scroll">
              <AllMilestonesTable outParams={params} onTotal={setTotal} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MilestonesList