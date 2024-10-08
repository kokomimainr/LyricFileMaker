import React, { useEffect } from "react";
import styles from "./PublicationRequestItem.module.css";
import { PublicationRequest } from "../..";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { deletePublicationRequest, getAllPublicationRequests, updatePublicationRequest } from "../../model/PublicationRequestThunk";

type PublicationRequestItemProps = {
  publicationRequest: PublicationRequest;
};

export const PublicationRequestItem: React.FC<PublicationRequestItemProps> = ({
  publicationRequest,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleShowFile = () => {
    navigate("/lyric-file-card/" + publicationRequest.lyricFileId);
  };

  const handleApprove = () => {
    dispatch(
      updatePublicationRequest({
        publicationRequestId: publicationRequest.id,
        status: true,
      })
    );
  };

  const handleReject = () => {
    dispatch(
      updatePublicationRequest({
        publicationRequestId: publicationRequest.id,
        status: false,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deletePublicationRequest({
        publicationRequestId: publicationRequest.id,
      })
    );
  }

  return (
    <>
      <div className={styles.container}>
        {publicationRequest.lyricFileId}
        {publicationRequest.approved.toString()}
        <button onClick={handleShowFile}>Показать</button>
        {publicationRequest.approved ? (
          <button onClick={handleReject}>Отклонить</button>
        ) : (
          <button onClick={handleApprove}>Принять</button>
        )}
        <button onClick={handleDelete}>Удалить заявку</button>
      </div>
    </>
  );
};

export default PublicationRequestItem;
