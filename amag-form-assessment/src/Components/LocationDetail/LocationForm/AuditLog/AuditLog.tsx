import React from "react";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  createStyles,
  Theme,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { auditP } from "../../../../interfaces/interfaces";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "lightgrey",
    },
    auditHeader: {
      borderBottom: "1px solid grey",
    },
    listRoot: {
      width: "100%",
      maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
  })
);

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 20,
  },
});
theme = responsiveFontSizes(theme);

const AuditLog = (props: auditP) => {
  let auditLog = props.auditLog;

  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container className={classes.root} maxWidth="md">
        <Box>Audit Log</Box>
        <Box className={classes.auditHeader}></Box>
        <Box>
          <ThemeProvider theme={theme}>
            <List className={classes.root} subheader={<li />}>
              {auditLog.map((log) => (
                <li
                  key={`section-${log.siteId += 1}`}
                  className={classes.listSection}
                >
                  <ul className={classes.ul}>
                    <ListItem key={`${log.siteId}`}>
                      <Typography>
                        {`Updated on ${log.date}`}
                      </Typography>
                    </ListItem>
                  </ul>
                </li>
              ))}
            </List>
          </ThemeProvider>
        </Box>
      </Container>
    </div>
  );
};

export default AuditLog;
