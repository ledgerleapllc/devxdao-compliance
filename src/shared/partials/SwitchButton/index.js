import { useEffect, useState } from "react";
import Switch from "react-switch";

export const SwitchButton = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(false);
  const toggle = () => {
    onChange(!internalValue);
    setInternalValue(!internalValue);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="text-primary">
      <Switch
        checked={internalValue}
        onChange={toggle}
        checkedIcon={null}
        uncheckedIcon={null}
        offColor="#bbb"
        onColor="#5BDD88"
        height={20}
        width={40}
      />
    </div>
  )
}