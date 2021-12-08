import classNames from 'classnames';
import React, { useState, cloneElement, Fragment } from 'react';
import './style.scss';
const ZINDEX_DEFAULT = 1000;

// Common dialog Context
const DialogContext = React.createContext({
  appendDialog: () => {},
  closeAllDialogs: () => {},
  closeCurrentDialog: () => {},
  openDialog: () => {}
});

// Create `useDialog` hook that using DialogContext
const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};


const DialogProvider = props => {
  const [dialogs, setDialogs] = useState([]);

  const appendDialog = (dialog) => {
    setDialogs([
      ...dialogs,
      dialog
    ])
  }

  const openDialog = (dialog) => {
    setDialogs([dialog])
  }

  const closeAllDialogs = () => {
    setDialogs([])
  }

  const closeCurrentDialog = (index) => {
    dialogs.splice(index, 1)
    setDialogs([...dialogs])
  }

  const renderDialogView = (dialog, index) => {
    return cloneElement(
      dialog,
      {
        close: (data) => {
          if (dialog.props.afterClosed && typeof dialog.props.afterClosed === 'function') dialog.props?.afterClosed(data);
          closeCurrentDialog(index);
        }
      },
    )
  };

  return (
    <DialogContext.Provider value={{ appendDialog, closeAllDialogs, closeCurrentDialog, openDialog }}>
      {dialogs?.length > 0 && (
        <>
          {
            dialogs.map((dialog, index) => (
              <div key={`dialog-${index}`}>
                <div className="dialog-backdrop" style={{zIndex: ZINDEX_DEFAULT + index + index}} />
                <div 
                  className="dialog-wrapper flex-center" 
                  style={{zIndex: ZINDEX_DEFAULT + index + index + 1}}
                  onClick={(e) => closeCurrentDialog(index)}
                >
                  {renderDialogView(dialog, index)}
                </div>
              </div>
          ))}
        </>
      )}
      {props.children}
    </DialogContext.Provider>
  );
};

const Dialog = (props) => {
  return (
    <div className={classNames(props.className, 'dialog-container')} onClick={(e) => e.stopPropagation()}>
      {props.children}
    </div>
  )
}

Dialog.Header = props => (
  <div
    className="dialog-header"
  >
    {props.children}
  </div>
);

Dialog.Body = props => (
  <div
    className="dialog-body"
  >
    {props.children}
  </div>
);

Dialog.Footer = props => (
  <div
    className="dialog-footer"
  >
    {props.children}
  </div>
);


export { DialogProvider, Dialog, useDialog };