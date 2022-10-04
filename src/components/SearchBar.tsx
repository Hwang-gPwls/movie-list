import { ComponentProps, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchKeywordState } from "../recoil/movie/atom";

const useStyles = makeStyles({
  button: {
    width: "9.5rem",
    backgroundColor: `#434656 !important`,
    color: "white",
    borderRadius: "0 10px 10px 0 !important",
    zIndex: 999,
  },
  input: {
    width: "35.5rem",
    backgroundColor: `#fff !important`,
    borderRadius: "10px 0 0 10px",
    zIndex: 999,
  },
});

const SearchBar = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const onChange: ComponentProps<"input">["onChange"] = (e) => {
    const { value } = e.target;
    setInputVal(value);
  };

  useEffect(() => {
    setInputVal(keyword);
  }, []);

  return (
    <Container>
      <TextField
        id="searchKeyword"
        label="Search"
        variant="outlined"
        className={classes.input}
        ref={searchInput}
        onChange={onChange}
        value={inputVal}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        className={classes.button}
        onClick={() => {
          setKeyword(inputVal);
        }}
      >
        검색
      </Button>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  top: 7px;
  z-index: 999;
`;
