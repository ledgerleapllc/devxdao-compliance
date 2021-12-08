import { useEffect, useState } from 'react';
import './style.scss';
import { ReactComponent as IconArrowDown } from '@assets/icons/ic-arrow-down.svg';
import { ReactComponent as IconArrowUp } from '@assets/icons/ic-arrow-up.svg';

export const Select = ({ className, placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState();

  const selectItem = (ops) => {
    setInternalValue({ ...ops });
    onChange(ops);
  }

  useEffect(() => {
    if (value && options) {
      const item = options.find(x => x.value === value);
      setInternalValue({ ...item });
    }
  }, [value, options]);

  return (
    <div className={`${className || ''} relative select-container z-50`}>
      <button className="flex justify-between items-center w-full select-button" type="button" onClick={() => setOpen(!open)}>
        {!internalValue && <span className="text-gray2">{placeholder}</span>}
        {internalValue && <span className="text-secondary font-medium">{internalValue?.label}</span>}
        {open ? <IconArrowUp /> : <IconArrowDown />}
      </button>
      {open && (
        <>
          <div
            className="select-dropdown rounded max-h-96 overflow-y-scroll absolute w-full bottom-1 bg-white transform translate-y-full left-0 py-3"
            onClick={() => setOpen(false)}
          >
            <ul className="select-list">
              {options?.map((option, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-1.5 cursor-pointer hover:bg-white1 font-medium"
                  onClick={() => selectItem(option)}
                >
                  <span className={internalValue?.value === option.value ? 'text-primary' : ''}>{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fixed inset-0 -z-1" onClick={() => setOpen(false)} />
        </>
      )}
    </div>
  );
};
