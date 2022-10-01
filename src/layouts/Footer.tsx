import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

const Footer = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container>
      <div className="nav">
        <Link to={"/"} key={"search"}>
          <SearchIcon
            sx={{
              color: "white",
              fontSize: 40,
            }}
          />
        </Link>
        <Link to={"/bookmark"} key={"bookmark"}>
          <BookmarkIcon
            sx={{
              color: "white",
              fontSize: 40,
            }}
          />
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 7vh;
  padding: 1rem 8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 0.625rem;
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  border-radius: 5px;
  background-color: #716e77;
  .nav {
    display: flex;
    align-items: center;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;
  }
`;

export default Footer;
