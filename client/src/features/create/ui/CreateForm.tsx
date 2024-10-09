import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Upload } from "antd";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { createLyricFile } from "@/entities/lyricFile";
import { createString } from "@/entities/string";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import FileUploader from "@/features/fileUploader/components/FileUploader";
import { clearBufferTimeCodes } from "@/entities/timeCode";
import "./CreateForm.css";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const { Title } = Typography;

const EOL = "\n";

export type CreateLyricFileValues = {
  trackName: string;
  cover: UploadChangeParam;
}

type CreateFormProps = {};

export const CreateForm: React.FC<CreateFormProps> = () => {
  const dispatcher = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const navigate = useNavigate();

  const splitText = (text: string) => {
    return text.split(EOL).map((text) => text.trim());
  };

  const handleCreateProject = async (values: any) => {
    const formData = new FormData();
    if (cover) {
      formData.append("cover", cover); // Используем оригинальный файл
    }
    formData.append("trackName", values.title);
  
    try {
      const response = await dispatcher(createLyricFile(formData));
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
        setCover(null); // Очищаем значение
        navigate(ROUTES.WORKSPACE);
      } else {
        message.error("Ошибка при создании файла.");
      }
    } catch (error) {
      message.error("Произошла ошибка при загрузке файла.");
    }
  
    dispatcher(clearBufferTimeCodes());
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
        className="form-create"
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

        <Form.Item<CreateLyricFileValues> label="Обложка" name="cover">
          <Upload
            accept=".jpeg,.jpg,.png" // Ограничение на типы файлов
            showUploadList={false}
            beforeUpload={() => {
              return false; // Предотвращаем автоматическую загрузку
            }}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                const file: UploadFile<any> = info.fileList[0];
                setCover(file.originFileObj as File); // Преобразуем в File
                message.success(`${file.name} загружен успешно.`);
              } else {
                setCover(null); // Очищаем значение, если файл удален
              }
            }}
          >
             <Button icon={<UploadOutlined />}>Загрузить обложку</Button>
          </Upload>
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
