import React, { Dispatch, SetStateAction } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DeliveryDatePickerModalProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeliveryDatePickerModal = ({
  date,
  setDate,
  setShowModal,
  showModal,
}: DeliveryDatePickerModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick a date</DialogTitle>
          <DialogDescription>Pick an expected delivery date</DialogDescription>
        </DialogHeader>
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{
              before: new Date(),
            }}
            className="rounded-md w-fit shadow mx-auto"
            footer={
              date ? (
                <p className="my-2 text-slate-500">
                  Selected: {date.toLocaleDateString()}
                </p>
              ) : (
                <span className="my-2 text-slate-500">Pick a day.</span>
              )
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryDatePickerModal;
