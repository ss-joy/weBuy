import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

const test = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className="DialogContent">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
            obcaecati sunt aliquam repellendus, minima maxime, debitis ut dolor
            labore eum natus necessitatibus, assumenda atque neque porro non
            reiciendis consequatur modi?
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default test;
