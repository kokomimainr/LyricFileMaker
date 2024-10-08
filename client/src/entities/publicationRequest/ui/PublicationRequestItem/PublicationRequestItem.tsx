import React from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { deletePublicationRequest, updatePublicationRequest } from "../../model/PublicationRequestThunk";
import { PublicationRequest } from "../..";

const { Text } = Typography;

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
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>ID файла: {publicationRequest.lyricFileId}</Text>
        <Text>
          Статус: {publicationRequest.approved ? "Одобрено" : "Ожидает"}
        </Text>
        <Button type="link" onClick={handleShowFile}>
          Показать файл
        </Button>
        {publicationRequest.approved ? (
          <Button type="danger" onClick={handleReject}>
            Отклонить
          </Button>
        ) : (
          <Button type="primary" onClick={handleApprove}>
            Принять
          </Button>
        )}
        <Button type="default" danger onClick={handleDelete}>
          Удалить заявку
        </Button>
      </Space>
    </div>
  );
};

export default PublicationRequestItem;
