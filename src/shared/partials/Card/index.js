import classNames from 'classnames';
import './style.scss';
import { cloneElement, useContext, useState } from 'react';
import { ReactComponent as IconPlus } from '@assets/icons/ic-plus.svg';
import { ReactComponent as IconMinus } from '@assets/icons/ic-minus.svg';
import { createContext } from 'react';

const CardContext = createContext({
  setIsExpand: () => {},
  isExpand: false
});

const Card = ({ children, className, expand, expandClass }) => {
  const [isExpand, setIsExpand] = useState();
  
  const renderChildren = () => {
    if (Array.isArray(children)) {
      return (
        <>
          {cloneElement(children[0], {
            expand,
          })}
          {cloneElement(children[1], {
            expand,
          })}
        </>
      );
    } else if (children) {
      return (
        <>
          {cloneElement(children, {
            expand,
          })}
       </>
      );
    } else {
      return (
        <></>
      )
    }
  };

  return (
    <div className={classNames(className, isExpand ? expandClass : '',  'card flex flex-col')}>
      <CardContext.Provider value={{ setIsExpand, isExpand }}>
        { renderChildren() }
      </CardContext.Provider>
    </div>
  )
};

Card.Header = ({ children, expand }) => {
  const { setIsExpand, isExpand } = useContext(CardContext);
  return (
    <div className="card-header flex">
      {children}
      {expand && (
        <button 
          className="ml-auto flex-center rounded bg-primary h-7 w-7 text-white"
          onClick={() => setIsExpand(!isExpand)}
        >
          {isExpand ? <IconMinus /> : <IconPlus />}
        </button>
      )}
    </div>
  );
}

Card.Body = ({ children, scrollable }) => {
  return (
    <div className={classNames(scrollable ? 'transition duration-75 overflow-y-scroll padding-tracker' : '', 'card-body flex-1 min-h-0')}>
      {children}
    </div>
  );
}

Card.Body.Preview = ({ children, className }) => {
  return (
    <div className={classNames(className)}>
      {children}
    </div>
  );
}

Card.Body.Expand = ({ children, className, expandClass }) => {
  return (
    <CardContext.Consumer>
      {value => (
        <div className={classNames(className, !value.isExpand ? 'opacity-0 overflow-hidden max-h-0 transition-ease-out' : `${expandClass} opacity-1 max-h-card transition-ease-in`)}>
          {children}
        </div>
      )}
    </CardContext.Consumer>
  );
}

const CardHeader = Card.Header;
const CardBody = Card.Body;
const CardBodyPreview = Card.Body.Preview;
const CardBodyExpand = Card.Body.Expand;

export { Card, CardHeader, CardBody, CardContext, CardBodyPreview, CardBodyExpand };

