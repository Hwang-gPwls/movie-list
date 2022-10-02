import React, { useState } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import defaultIMG from "../public/images/no-image.png";
import { IMovie } from "../api/movie";
import Modal from "./Modal";
import { useRecoilState } from "recoil";
import { bookmarkItemState } from "../recoil/movie/atom";

const replaceItemAtIndex = (arr: IMovie[], index: number, newValue: IMovie) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const Content = ({ id, posterUrl, title, type, year }: IMovie) => {
  const [bookmarkItems, setBookmarkItems] = useRecoilState(bookmarkItemState);
  const index = bookmarkItems.findIndex((item) => item.id === id);

  const [modalOpen, setModalOpen] = useState(false);
  const [isCurContentBookmark, setIsCurContentBookmark] = useState(
    bookmarkItems.some((item) => item.id === id),
  );

  const handleDelete = () => {
    setBookmarkItems((oldBookmarkItems) => {
      const newBookmarkItems = oldBookmarkItems.filter(
        (item) => item.id !== id,
      );

      return newBookmarkItems;
    });
  };

  const handleBookmark = (isBookmark: boolean) => {
    if (isBookmark) {
      const newItems = replaceItemAtIndex(bookmarkItems, index, {
        id: id,
        posterUrl: posterUrl,
        title: title,
        type: type,
        year: year,
      });

      setBookmarkItems(newItems);
    } else {
      handleDelete();
    }
    setIsCurContentBookmark(isBookmark);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultIMG;
  };

  const contentClickHandler = () => {
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <Modal
          isBookmark={isCurContentBookmark}
          handleBookmark={handleBookmark}
          setModalOpen={setModalOpen}
        />
      )}
      <Container key={id} id={id} onClick={contentClickHandler}>
        <img
          className="movie-poster"
          alt="poster"
          src={posterUrl}
          onError={handleImgError}
        />
        <div className="movie-info">
          <h2>{title}</h2>
          <h2>{type}</h2>
          <h2>{year}</h2>
          {isCurContentBookmark ? (
            <StarIcon
              sx={{
                color: "#f6ea8c",
                fontSize: 40,
              }}
            />
          ) : (
            <StarIcon
              sx={{
                color: "gray",
                fontSize: 40,
              }}
            />
          )}
          <button className="btn">Continue</button>
        </div>
      </Container>
    </>
  );
};

export default Content;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  width: 700px;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: all 0.4s;
  }

  .movie-poster {
    padding: 30px;
    max-width: 250px;
  }

  .movie-info {
    padding: 30px;
    position: relative;
    width: 100%;
  }

  .btn {
    background-color: #2a265f;
    border: 0;
    border-radius: 50px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 16px;
    padding: 12px 25px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    letter-spacing: 1px;
  }
`;
