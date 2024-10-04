import React from "react";
import styles from "./StringItem.module.css";
import { String } from "@/entities/string";

type StringItemProps = {
  stringText: string;
};

export const StringItem: React.FC<StringItemProps> = ({ stringText}) => {
  return (
    <>
      <div className={styles.container}>
        <p>{stringText}</p>
      </div>
    </>
  );
};

export default StringItem;
