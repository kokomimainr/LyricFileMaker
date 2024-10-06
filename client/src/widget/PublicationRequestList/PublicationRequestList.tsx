import React, { useEffect } from "react";
import styles from "./PublicationRequestList.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllPublicationRequests } from "@/entities/publicationRequest";
import { PublicationRequestItem } from "@/entities/publicationRequest/ui/PublicationRequestItem";

type PublicationRequestListProps = {};

export const PublicationRequestList: React.FC<
  PublicationRequestListProps
> = ({}) => {
  const { publicationRequests } = useAppSelector(
    (state) => state.publicationRequestList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPublicationRequests());
  }, [publicationRequests]);

  return (
    <>
      <div className={styles.container}>PublicationRequestList
      {publicationRequests && [...publicationRequests].map((publicationRequest) => (
        <PublicationRequestItem
          key={publicationRequest.id}
          publicationRequest={publicationRequest}
        />
      ))}
      </div>
    </>
  );
};

export default PublicationRequestList;
