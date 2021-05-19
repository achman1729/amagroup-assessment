import React, { useEffect, useState } from "react";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, InputAdornment, FormControl } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import geoCodeService from "../../../service/api";
import AuditLog from "./AuditLog/AuditLog";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import moment from 'moment'
import { formP, DataObj } from '../../../interfaces/interfaces'
import dataStorageService from '../../../service/dataStorage'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "90%",
      },
    },
    lngLatInput: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      width: "25ch",
    },
    margin: {
      marginRight: theme.spacing(1),
    },
    headerBorder: {
      borderBottom: "1px solid grey",
    },
  })
);

const LocationForm = (props: formP) => {

  const classes = useStyles();
  const [siteName, setSiteName] = useState("");
  const [showError, setShowError] = useState(false);
  const [siteDescription, setSiteDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [region, setRegion] = useState("");
  const [auditLog, setAuditLog] = useState<DataObj[]>([]);

  let siteId: number;
  // let auditLog: DataObj[] = [];
  let dataObj: DataObj;
  let date = moment().format('Do MMMM YYYY, h:mm:ss a')
  siteId = 1

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataStorageService.getFormData()) {
      setAuditLog(dataStorageService.getFormData())
    }

    if (siteName === "") {
      setShowError(true);
    } else {
      setShowError(false);
      dataObj = {
        siteId: siteId,
        siteName: siteName,
        region: region,
        description: siteDescription,
        lat: latitude,
        lng: longitude,
        date: date
      };
      setAuditLog([...auditLog, dataObj])
      dataStorageService.storeFormData(auditLog)
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.hideForm();
    resetStateValues();
  };

  useEffect(() => {
    // load 1 sec after user stops typing
    const timeoutId = setTimeout(() => load(), 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteName]);

  const load = async () => {
    let data: any;
    if (siteName !== "") {
      await geoCodeService.getGeoCodeLocationData(siteName).then((dataRes: any) => {
        data = dataRes;
      });

      if (data) {
        setLatitude(`${data.geometry.location.lat}`);
        setLongitude(`${data.geometry.location.lng}`);
        setRegion(`${data.address_components[3].long_name}`);
      }
    } else {
      resetStateValues();
    }
  };

  const resetStateValues = () => {
    setLatitude("");
    setLongitude("");
    setRegion("");
    setSiteName("");
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <div style={{ marginLeft: "8px" }}>
              <Button variant="outlined" color="primary" type="submit">
                <SaveIcon /> Save
              </Button>
              <Button
                variant="outlined"
                style={{ marginLeft: "8px" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleCancel(e)
                }
              >
                Cancel
              </Button>
              <Box className={classes.headerBorder} mt={2}></Box>
              <Box mt={2}>Site id: 1</Box>
            </div>
            <div>
              {!showError ? (
                <TextField
                  id="location-name"
                  label="Site Name"

                  value={siteName}
                  variant="outlined"
                  onChange={(e) => setSiteName(e.target.value)}
                />
              ) : (
                <TextField
                  error
                  id="empty-location-name"

                  value={siteName}
                  variant="outlined"
                  onChange={(e) => setSiteName(e.target.value)}
                  helperText="Site name can't be empty"
                />
              )}
            </div>
            <div>
              <TextField
                id="region"
                label="Jurisdiction/City/Region"
                variant="filled"
                value={region}
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Site Description"
                variant="outlined"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
              />
            </div>
            <div className={classes.lngLatInput}>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    label="Latitude"
                    id="lat"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                    variant="filled"
                    value={latitude}
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    label="Longitude"
                    id="lng"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                    variant="filled"
                    value={longitude}
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </Box>
      </Container>
      <div>
        <AuditLog auditLog={auditLog} />
      </div>
    </div>
  );
};

export default LocationForm;
