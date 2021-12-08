import { Button } from "@shared/partials";
import { Dialog } from "../Provider";

export const ConfirmDialog = ({ className, text, confirmText, close }) => {
  const props = {
    className,
  };

  return (
    <Dialog {...props}>
      <Dialog.Body>
        <p className="text-center">{text}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <div className="flex gap-4 mt-8 justify-center">
          <Button size="sm" color="primary-outline" onClick={() => close(false)}>Cancel</Button>
          <Button size="sm" color="primary" onClick={() => close(true)}>{confirmText ? confirmText : 'OK'}</Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  )
};
