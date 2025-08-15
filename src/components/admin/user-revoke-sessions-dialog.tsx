"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { revokeUserSessions } from "@/utils/auth";
import { UserWithDetails } from "@/utils/users";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface UserRevokeSessionsDialogProps {
  user: UserWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function UserRevokeSessionsDialog({
  user,
  isOpen,
  onClose,
}: UserRevokeSessionsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRevokeSessions = async () => {
    try {
      setIsLoading(true);
      await revokeUserSessions(user.id);
      toast.success(
        `All sessions for ${user.name || user.email} have been revoked.`,
      );
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleRevokeSessions}
      title={`Revoke Sessions: ${user.name || user.email}`}
      description="This will log the user out of all devices. They will need to log in again to access their account."
      confirmText={isLoading ? "Processing..." : "Revoke Sessions"}
      confirmVariant="destructive"
    />
  );
}
