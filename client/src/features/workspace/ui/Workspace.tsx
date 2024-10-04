import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import styles from "./WorkSpace.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

type WorkSpaceProps = {
};

export const WorkSpace: React.FC<WorkSpaceProps> = ({
}) => {
  const [audio, setAudio] = useState<null | Howl>(null);
  const [progress, setProgress] = useState<number>(0);
  const {lyricFile} = useAppSelector((state) => state.lyricFile);

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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleBackward = () => {
    if (Math.floor(progress) < 10) {
      audio?.seek(0);
    } else {
      audio?.seek(progress - 10);
    }
  };

  const handleForward = () => {
    if (audio?.duration() && Math.floor(progress) > audio?.duration() - 10) {
      audio?.seek(audio?.duration());
    } else {
      audio?.seek(progress + 10);
    }
  };

  useEffect(() => {
    // if(projectFile && !audio){
    //   handleCreateAudio(projectFile)
    // }
    return () => {
      audio?.stop();
    };
  }, [audio]);

  return (
    <>
    <h1>{lyricFile && lyricFile.trackName}</h1>
      {audio && (
        <div className={styles.container}>
          {/* <h1 className={styles.title}>{projectTitle}</h1> */}

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
                  <img
                    className={styles.image}
                    src="./img/backward.png"
                    alt=""
                  />
                </button>
                {audio?.playing() ? (
                  <button onClick={handlePause} className={styles.buttons}>
                    <img
                      className={styles.image}
                      src="./img/pause.png"
                      alt=""
                    />
                  </button>
                ) : (
                  <button onClick={handlePlay} className={styles.buttons}>
                    <img className={styles.image} src="./img/play.png" alt="" />
                  </button>
                )}
                <button onClick={handleForward} className={styles.buttons}>
                  <img
                    className={styles.image}
                    src="./img/forward.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.editor}></div>
          <div className={styles.result}></div>
        </div>
      )}
      
    </>
  );
};
