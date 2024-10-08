import React, { useEffect } from "react";
import { List, Card } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllPublicationRequests } from "@/entities/publicationRequest";
import { PublicationRequestItem } from "@/entities/publicationRequest/ui/PublicationRequestItem";

export const PublicationRequestList: React.FC = () => {
  const { publicationRequests } = useAppSelector((state) => state.publicationRequestList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPublicationRequests());
  }, [dispatch]);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
      }}
      dataSource={publicationRequests}
      renderItem={(publicationRequest) => (
        <List.Item>
          <Card hoverable>
            <PublicationRequestItem publicationRequest={publicationRequest} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default PublicationRequestList;
