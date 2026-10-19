"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContactFormModal, {
  CONTACT_DIALOG_CONTENT_CLASS,
} from "@/components/contact-form-modal";

interface ReplicaContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
}

export default function ReplicaContactDialog({
  open,
  onOpenChange,
  title = "Get in Touch",
  subtitle = "Share a few details and our team will get back within one business day.",
}: ReplicaContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
        <ContactFormModal title={title} subtitle={subtitle} action="quote" />
      </DialogContent>
    </Dialog>
  );
}
