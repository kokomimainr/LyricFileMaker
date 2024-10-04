import React from "react";
import styles from "./StringItem.module.css";
import { String } from "@/entities/string";

type StringItemProps = {
  string: String;
};

export const StringItem: React.FC<StringItemProps> = ({ string }) => {
  return (
    <>
      <div className={styles.container}>
        <p>{string.stringNumber} . {string.text}</p>
      </div>
    </>
  );
};

export default StringItem;
