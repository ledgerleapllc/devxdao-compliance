import { useState, cloneElement } from "react";
import { Card, CardHeader, CardBody } from '@shared/partials';
import { useSearch } from '@shared/hooks/useSearch';

const ComplianceTab = (props) => {
  const [params, setParams] = useState();
  const { inputValue, handleSearch } = useSearch();

  const onSearch = (value) => {
    setParams({ search: value });
  }

  return (
    <Card className="h-full flex-1 min-h-0">
      <CardHeader>
        <div className="w-full flex justify-between">
          <h2 className="capitalize">{props.title}</h2>
          <input
            className="text-xs"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={handleSearch(onSearch)}
          />
        </div>
      </CardHeader>
      <CardBody>
        {
          cloneElement(props.children, {
            outParams: params
          })
        }
      </CardBody>
    </Card>
  )
}

export default ComplianceTab;