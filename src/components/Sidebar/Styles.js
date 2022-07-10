import { ThemeContext } from "@emotion/react";
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "70%",
  },
  links: {
    color: ThemeContext.palette.text.primary,
    textDecoration: 'none',
  }, 
  genreImage: {
    filter: ThemeContext.palette.mode === 'dark' ? 'dark' : 'invert(1)',
  },
}));