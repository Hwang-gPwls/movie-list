import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Modal from "./Modal";
import { IMovie } from "../api/movie";
import defaultIMG from "../public/images/no-image.png";
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
      <ContentBox>
        <Container key={id} id={id} onClick={contentClickHandler}>
          <img
            className="movie-poster"
            alt="poster"
            src={posterUrl}
            onError={handleImgError}
          />
          <div className="movie-info">
            <h2 className="movie-info_title">{title}</h2>
            <div className="movie-info_value">
              <p className="movie-info_value__type">{type.toUpperCase()}</p>
              <p className="movie-info_value__year">{year}</p>
            </div>
            <div className="movie-info_bookmark">
              {isCurContentBookmark ? (
                <IconButton aria-label="bookmark">
                  <StarIcon
                    sx={{
                      color: "#f6ea8c",
                      fontSize: 35,
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton aria-label="bookmark">
                  <StarIcon
                    sx={{
                      color: "gray",
                      fontSize: 35,
                    }}
                  />
                </IconButton>
              )}
            </div>
          </div>
        </Container>
      </ContentBox>
    </>
  );
};

export default Content;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 32.75rem;
  height: 15rem;
  background: ${({ theme }) => theme.color.white};
  border: 3px solid ${({ theme }) => theme.color.black};
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 0.5rem;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: all 0.4s;
  }

  .movie-poster {
    width: 10.6875rem;
    height: 100%;
    object-fit: cover;
  }

  .movie-info {
    width: 100%;
    padding: 30px;
    position: relative;

    &_title {
      font-size: 18px;
      font-weight: 600;
    }

    &_value {
      display: flex;
      justify-content: end;
      margin-top: 30px;

      &__type {
        font-weight: 400;
      }

      &__year {
        margin-left: 10px;
        font-weight: 600;
      }
    }

    &_bookmark {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0 10px 10px 0;
    }
  }
`;
