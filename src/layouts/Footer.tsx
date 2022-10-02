import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

const Footer = () => {
  return (
    <FooterBox>
      <Container>
        <div className="nav">
          <Link to={"/"} key={"search"}>
            <IconButton aria-label="search">
              <SearchIcon
                sx={{
                  color: "white",
                  fontSize: 40,
                }}
              />
            </IconButton>
          </Link>
          <Link to={"/bookmark"} key={"bookmark"}>
            <IconButton aria-label="bookmark">
              <BookmarkIcon
                sx={{
                  color: "white",
                  fontSize: 40,
                }}
              />
            </IconButton>
          </Link>
        </div>
      </Container>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  width: 30rem;
  height: 4.5rem;
  padding: 1rem 8rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0.625rem auto;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.darkgray};

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
