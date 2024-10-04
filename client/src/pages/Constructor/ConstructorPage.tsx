import React from "react";
import styles from "./ConstructorPage.module.css";
import { CreateForm } from "@/features/create/ui";

type ConstructorPageProps = {};

export function ConstructorPage({}: ConstructorPageProps) {
  return (
    <div className={styles.container}>
      CONSTRUCTOR
      <CreateForm />
    </div>
  );
};

