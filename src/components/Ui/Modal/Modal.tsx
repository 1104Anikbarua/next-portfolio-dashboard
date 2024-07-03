"use client";
import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setIsModalOpen } from "@/redux/features/blog/blogSlice";

//interface
// 161611hm
interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
}

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MyModal({
  open = false,
  // setOpen,
  title,
  children,
  sx,
}: IModalProps) {
  // dispatch the state
  const dispatch = useAppDispatch();
  //close the modal
  const handleClose = () => {
    dispatch(setIsModalOpen(false));
  };
  //close the modal

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ ...sx }}
      >
        {/* Modal title start here */}
        <DialogTitle
          textAlign={"center"}
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        {/* Modal title ends here */}
        {/* modal close button(X) start here */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* modal close button(X) ends here */}
        {/* Modal content start here */}
        {/* divider means horizontal line between title and form */}
        <DialogContent dividers>{children}</DialogContent>
        {/* Modal content ends here */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
