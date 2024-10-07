import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { createLyricFile } from "@/entities/lyricFile";
import { createString } from "@/entities/string";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import FileUploader from "@/features/fileUploader/components/FileUploader";
import { clearBufferTimeCodes } from "@/entities/timeCode";

const { Title } = Typography;

const EOL = "\n";

type CreateFormProps = {};

export const CreateForm: React.FC<CreateFormProps> = () => {
  const dispatcher = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();


  const splitText = (text: string) => {
    return text.split(EOL).map((text) => text.trim());
  };

  const handleCreateProject = async (values: any) => {
    const response = await dispatcher(
      createLyricFile({ trackName: values.title, isPublic: true })
    );
    
    const payload = response.payload as { lyricFile: { id: number } };

    if (payload) {
      splitText(values.text).forEach((text, index) => {
        dispatcher(
          createString({
            lyricFileId: payload.lyricFile.id,
            stringNumber: index + 1,
            text: text,
          })
        );
      });
      message.success("Файл успешно создан!");
      setTitle("");
      setText("");
      navigate(ROUTES.WORKSPACE);
    } else {
      message.error("Ошибка при создании файла.");
    }
    setTitle("");
    setText("");
    dispatcher(clearBufferTimeCodes())
    navigate(ROUTES.WORKSPACE);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* {lyricFile && <Title level={2}>Файл создан</Title>} */}
      <Title level={2}>Добавление файлов</Title>
      <Form
        style={{ width: "50%" }}
        layout="vertical"
        onFinish={handleCreateProject}
      >
        <Form.Item
          label="Название трека"
          name="title"
          rules={[
            { required: true, message: "Пожалуйста, введите название трека!" },
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Загрузите файл">
          <FileUploader />
        </Form.Item>

        <Form.Item
          label="Текст"
          name="text"
          rules={[{ required: true, message: "Пожалуйста, введите текст!" }]}
        >
          <Input.TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст с переносами строк..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
