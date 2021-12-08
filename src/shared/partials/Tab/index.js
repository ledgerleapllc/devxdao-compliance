import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const TabView = React.memo(({ tabs, currentTab }) => {
  const View = tabs[currentTab].content;
  return <View />;
});

export const Tab = ({ tabs, className, scrollable, lazy }) => {
  const { hash } = useLocation();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (hash) {
      const ind = tabs.findIndex(x => `#${x.id}` === hash);
      setCurrentTab(ind);
    } else {
      setCurrentTab(0);
    }
  }, [hash]);

  return (
    <div className={classNames(className, 'flex flex-col h-full')}>
      {tabs && (
        <>
          <ul
            id="tabs"
            className="inline-flex w-full pb-4 justify-between lg:justify-start h-10"
          >
            {tabs.map((x, index) => (
              <li
                className="tab-header text-base font-medium pr-14"
                key={`tab-header-${index}`}
              >
                <Link 
                  className={classNames(currentTab === index ? 'opacity-100 text-primary border-b border-primary' : 'opacity-40', 'transition' )}
                  to={`#${x.id}`}
                >
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
          <div
            id="tab-contents"
            className={classNames(scrollable ? 'overflow-y-scroll' : '', 'flex-1 min-h-0')}
          >
            {!lazy ? (
              tabs.map((x, index) => (
                <div
                  key={`tab-content-${index}`}
                  className="h-full"
                  hidden={currentTab !== index}
                >
                  {{ ...tabs[index].content() }}
                </div>
              ))
            ) : (
              <div className="h-full">
                <TabView tabs={tabs} currentTab={currentTab} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
