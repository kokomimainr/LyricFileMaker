import React, { useContext, useEffect, useState } from "react";
import styles from "./MusicPlayer.module.css";
import { Howl } from "howler";
import { FileContext } from "@/features/fileUploader/model/FileContext";

type MusicPlayerProps = {
  progress: number;
  setProgress: (progress: number) => void;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  progress,
  setProgress,
}) => {
  const [audio, setAudio] = useState<null | Howl>(null);
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
    <div className={styles.container}>
      {audio && (
        <div className={styles.player}>
          <div
            style={{ width: "100%", background: "#ccc", marginTop: "10px" }}
            className={styles.progress}
          >
            <div className={styles.time}>
              <h2 className={styles.timeProgress}> {formatTime(progress)}</h2>
              <h2 className={styles.timeDuration}>
                {formatTime(audio.duration())}
              </h2>
            </div>

            <input
              type="range"
              min={0}
              max={audio?.duration()}
              value={audio?.seek() || 0}
              onChange={handleSeek}
              style={{ width: "100%" }}
            />
            <div className={styles.buttons}>
              <button onClick={handleBackward} className={styles.buttons}>
                <img className={styles.image} src="./img/backward.png" alt="" />
              </button>
              <button onClick={handleLittleBackward} className={styles.buttons}>
                <img className={styles.image} src="./img/backward.png" alt="" />
              </button>
              {audio?.playing() ? (
                <button onClick={handlePause} className={styles.buttons}>
                  <img className={styles.image} src="./img/pause.png" alt="" />
                </button>
              ) : (
                <button onClick={handlePlay} className={styles.buttons}>
                  <img className={styles.image} src="./img/play.png" alt="" />
                </button>
              )}
              <button onClick={handleLittleForward} className={styles.buttons}>
                <img className={styles.image} src="./img/forward.png" alt="" />
              </button>
              <button onClick={handleForward} className={styles.buttons}>
                <img className={styles.image} src="./img/forward.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
