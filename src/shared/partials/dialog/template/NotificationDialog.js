import classNames from "classnames";
import { Button } from "../../Button";
import { Dialog } from "../Provider";

export const NotificationDialog = ({ className, close, text }) => {
  return (
    <Dialog className={classNames(className, 'text-center')}>
      <Dialog.Body>
        <p className="mb-5">{text}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="primary" onClick={close}>Go Back</Button>
      </Dialog.Footer>
    </Dialog>
  )
};
