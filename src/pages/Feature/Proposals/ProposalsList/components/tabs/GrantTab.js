import { useState, cloneElement } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody } from '@shared/partials';
import { useSearch } from '@shared/hooks/useSearch';

const GrantTab = (props) => {
  const [params, setParams] = useState();
  const user = useSelector(state => state.authReducer?.user);
  const { inputValue, handleSearch } = useSearch();

  const onSearch = (val) => {
    setParams({ search: val });
  }

  return (
    <Card className="h-full flex-1 min-h-0">
      <CardHeader>
        <div className="w-full flex justify-end">
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
          user && (
            cloneElement(props.children, {
              outParams: params
            })
          )
        }
      </CardBody>
    </Card>
  )
}

export default GrantTab;