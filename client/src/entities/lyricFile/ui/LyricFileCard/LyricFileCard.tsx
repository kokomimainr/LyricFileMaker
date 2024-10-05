import React, { useEffect } from "react";
import styles from "./LyricFileCard.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getLyricFile } from "../..";
import { getAllStrings } from "@/entities/string";

type LyricFileCardProps = {};

export const LyricFileCard: React.FC<LyricFileCardProps> = ({}) => {
  const {lyricFileId} = useParams();
  const dispatch = useAppDispatch();
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const {strings} = useAppSelector((state) => state.stringList)

  const getLyricFileCard = async() => {
    if (!lyricFileId) return;
    dispatch(getLyricFile({ lyricFileId: +lyricFileId }));
    const getStrings = await dispatch(getAllStrings({lyricFileId: +lyricFileId}));
  };

  useEffect(() => {getLyricFileCard()}, []);
  return (
    <>
      <div className={styles.container}>
        <h1>{lyricFile?.trackName}</h1>
        <div className={styles.text}>
          {strings && strings.map((string, index) => (
            <div key={index} className={styles.string}>

              {string.TimeCodes && string.TimeCodes.length > 0 && (
                <h2>{string.TimeCodes[0].time}</h2>
              )}
                            <b className={styles.stringText}>{string.text}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LyricFileCard;
