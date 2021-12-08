import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import './style.scss';

export const Button = (props) => {
  const {
    color,
    className,
    size,
    isLoading,
    ...otherProps
  } = props;
  const [groupClass, setGroupClass] = useState('');
  const [spinner, setSpinner] = useState({ width: '20px', height: '20px'});

  useEffect(() => {
    let arr = [];
    // color
    if (color === 'primary') {
      arr = ['btn', 'btn-primary'];
    } else if (color === 'primary-outline') {
      arr = ['btn', 'btn-primary-outline'];
    } else if (color === 'basic') {
      arr = ['btn', 'btn-basic'];
    } else if (color === 'danger') {
      arr = ['btn', 'btn-danger'];
    } else if (color === 'success') {
      arr = ['btn', 'btn-success'];
    } else if (color === 'default') {
      arr = ['btn', 'btn-default'];
    }
    // size
    if (size === 'xs') {
      arr.push('btn-xs');
      setSpinner({ width: '10px', height: '10px' });
    } else if (size === 'sm') {
      arr.push('btn-sm');
      setSpinner({ width: '10px', height: '10px' });
    } 
    setGroupClass(arr.join(' '));
  }, [color, size]);

  return (
    <button
      type="button"
      className={classNames(groupClass, className)}
      {...otherProps}
    >
      <div className="flex items-center justify-center px-4">
        <div className="custom-wrap relative whitespace-nowrap">
          {isLoading && (
            <ReactLoading
              className="custom-loading absolute top-1/2 -left-2 transform -translate-y-1/2 -translate-x-full"
              type="spinningBubbles"
              color="currentColor"
              {...spinner}
            />
          )}
          {props.children}
        </div>
      </div>
    </button>
  );
}
