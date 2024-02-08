import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ErrorHandle.module.css";
import cn from "classnames";

const handleDisplayIcon = (error, len) => {
  if (len > 0) {
    if (error) {
      return <CloseIcon style={{ fontSize: "0.8rem", paddingLeft: "3px" }} />;
    } else {
      return (
        <CheckBoxIcon style={{ fontSize: "0.8rem", paddingLeft: "3px" }} />
      );
    }
  }
  return null;
};
function ErrorHandleItem({ text, error, len }) {
  return (
    <li
      className={cn(styles.default, {
        [styles.error]: error && len > 0,
        [styles.pass]: !error,
      })}
    >
      {text}
      {handleDisplayIcon(error, len)}
    </li>
  );
}

export default ErrorHandleItem;
