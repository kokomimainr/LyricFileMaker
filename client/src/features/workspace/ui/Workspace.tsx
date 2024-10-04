import React, { useContext, useEffect, useState } from "react";
import { Howl } from "howler";
import "./WorkSpace.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { FileContext } from "@/features/fileUploader/model/FileContext";
import { StringList } from "@/widget/StringList";
import {
  BackwardOutlined,
  CaretRightOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  ForwardOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

type WorkSpaceProps = {};

export const WorkSpace: React.FC<WorkSpaceProps> = ({}) => {
  const [audio, setAudio] = useState<null | Howl>(null);
  const [progress, setProgress] = useState<number>(0);
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { file } = useContext(FileContext) || {};

  const handleCreateAudio = (file: File) => {
    const url = URL.createObjectURL(file);
    const howl = new Howl({
      src: [url],
      html5: true,
      onend: () => {
        console.log("Track ended.");
        setProgress(0);
      },
    });

    setAudio(howl);
    return () => {
      URL.revokeObjectURL(url);
    };
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSeek = Number(event.target.value);
    audio?.seek(newSeek);
  };

  const handlePlay = () => {
    audio?.play();
    updateProgress();
  };

  const handlePause = () => {
    audio?.pause();
  };

  const updateProgress = () => {
    if (audio) {
      setProgress(audio.seek());
      requestAnimationFrame(updateProgress);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleBackward = () => {
    if (Math.floor(progress) < 10) {
      audio?.seek(0);
    } else {
      audio?.seek(progress - 10);
    }
  };

  const handleLittleBackward = () => {
    if (Math.floor(progress) < 10) {
      audio?.seek(0);
    } else {
      audio?.seek(progress - 1);
    }
  };

  const handleForward = () => {
    if (audio?.duration() && Math.floor(progress) > audio?.duration() - 10) {
      audio?.seek(audio?.duration());
    } else {
      audio?.seek(progress + 10);
    }
  };

  const handleLittleForward = () => {
    if (audio?.duration() && Math.floor(progress) > audio?.duration() - 10) {
      audio?.seek(audio?.duration());
    } else {
      audio?.seek(progress + 1);
    }
  };

  useEffect(() => {
    if (file && !audio) {
      handleCreateAudio(file);
    }
    return () => {
      audio?.stop();
    };
  }, [audio]);

  return (
    <>
      {audio && lyricFile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
          }}
        >
          <h1>{lyricFile?.trackName}</h1>
          <div className="player">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "38vw",
                height: "15vh",
                marginTop: "10px",
              }}
              className="progress"
            >
              <div className="time-with-progress" style={{ width: "90%" }}>
                <div className="time">
                  <h2 className="timeProgress"> {formatTime(progress)}</h2>
                  <h2 className="timeDuration">
                    {formatTime(audio.duration())}
                  </h2>
                </div>
                <input
                  id="radius"
                  type="range"
                  min={0}
                  max={audio?.duration()}
                  value={audio?.seek() || 0}
                  onChange={handleSeek}
                  style={{ width: "100%", backgroundColor: "transparent" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "80%",
                }}
                className="buttons"
              >
                <Button
                  className="custom-button"
                  type="primary"
                  size="large"
                  onClick={handleBackward}
                  icon={<FastBackwardOutlined />}
                />
                <Button
                  className="custom-button"
                  type="primary"
                  size="large"
                  onClick={handleLittleBackward}
                  icon={<BackwardOutlined />}
                />
                {audio?.playing() ? (
                  <Button
                  className="custom-button"
                    type="primary"
                    size="large"
                    onClick={handlePause}
                    icon={<PauseOutlined />}
                  />
                ) : (
                  <Button
                  className="custom-button"
                    type="primary"
                    size="large"
                    onClick={handlePlay}
                    icon={<CaretRightOutlined />}
                  />
                )}
                <Button
                  className="custom-button"
                  type="primary"
                  size="large"
                  onClick={handleLittleForward}
                  icon={<ForwardOutlined />}
                />
                <Button
                  
                  className="custom-button"
                  type="primary"
                  size="large"
                  onClick={handleForward}
                  icon={<FastForwardOutlined />}
                />
              </div>
            </div>
          </div>
          <StringList lyricFileId={lyricFile?.id} progress={progress} />
        </div>
      )}
    </>
  );
};
