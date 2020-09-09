import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Landing = () => {
  return (
    <>
      <Container maxWidth="md" background="primary">
        <Typography variant="h5" color="textPrimary" align="right">
          R U ready?
        </Typography>
      </Container>
    </>
  );
};

export default Landing;
