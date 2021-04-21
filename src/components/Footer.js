import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography } from "@material-ui/core";

import Social from './Social';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000000',
    width: `100%`,
    position: "relative",
    overflow: "hidden"
  },
  link: {
    fontSize: "1.25em",
    color: "#F08080",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: "#e67e22",
    fontSize: "1em",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          <Social />
        </Grid>
        <Grid
          item
          container
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/yuyingsu"
          justify="center"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography className={classes.copylight}>
            &copy;Tangerine Music
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;