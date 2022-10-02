import { ComponentProps, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchKeywordState } from "../recoil/movie/atom";

const useStyles = makeStyles({
  button: {
    width: "8rem",
    backgroundColor: `#434656 !important`,
    color: "white",
    borderRadius: "0 10px 10px 0 !important",
  },
  input: {
    width: "26rem",
    backgroundColor: `#fff !important`,
    borderRadius: "10px 0 0 10px",
  },
});

const SearchBar = () => {
  const classes = useStyles();

  const setKeyword = useSetRecoilState(searchKeywordState);
  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const onChange: ComponentProps<"input">["onChange"] = (e) => {
    const { value } = e.target;
    setInputVal(value);
  };

  return (
    <Container>
      <TextField
        id="searchKeyword"
        label="Search"
        variant="outlined"
        className={classes.input}
        ref={searchInput}
        onChange={onChange}
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
`;
