import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Content from "../components/Content";
import { bookmarkItemState } from "../recoil/movie/atom";

const Bookmark = () => {
  const bookmarkItems = useRecoilValue(bookmarkItemState);

  return (
    <Container>
      <Title>
        <h1 className="title">내 즐겨찾기</h1>
      </Title>
      {bookmarkItems.length ? (
        bookmarkItems.map((item) => (
          <Content
            key={item.id}
            id={item.id}
            posterUrl={item.posterUrl}
            title={item.title}
            type={item.type}
            year={item.year}
          />
        ))
      ) : (
        <div className="no-content">{"등록된 즐겨찾기 영화가 없습니다"}</div>
      )}
    </Container>
  );
};

export default Bookmark;

const Container = styled.div`
  width: 100%;

  .no-content {
    margin: 42vh 0 0 0;
    font-size: 30px;
    text-align: center;
  }
`;

const Title = styled.div`
  font-size: 30px;
  margin-top: 20px;
  text-align: center;

  .title {
    font-size: 25px;
    font-weight: 900;
  }
`;
