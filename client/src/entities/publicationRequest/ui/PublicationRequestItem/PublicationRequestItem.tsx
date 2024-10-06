import React from "react";
import styles from "./PublicationRequestItem.module.css";
import { PublicationRequest } from "../..";

type PublicationRequestItemProps = {
  publicationRequest: PublicationRequest;
};

export const PublicationRequestItem: React.FC<PublicationRequestItemProps> = ({
  publicationRequest,
}) => {
  return (
    <>
      <div className={styles.container}>{publicationRequest.lyricFileId}</div>
    </>
  );
};

export default PublicationRequestItem;
