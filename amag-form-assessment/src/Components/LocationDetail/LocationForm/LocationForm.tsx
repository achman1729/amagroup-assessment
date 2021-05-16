import React, { useEffect, useState } from "react"
import clsx from "clsx"
import TextField from "@material-ui/core/TextField"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button, InputAdornment, FormControl } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"

import axios from "axios"
import { geoCodeApi } from '../../../service/api'
import { spaceToPlusConverter } from "../../../utils/HelperFuctions"
import { API_KEY } from "../../../keys/ApiKey"
import AuditLog from "./AuditLog/AuditLog"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

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
)

interface P {
  hideForm: Function
}

const LocationForm = (props: P) => {
  const classes = useStyles()
  const [siteName, setSiteName] = useState("")
  const [showError, setShowError] = useState(false)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [region, setRegion] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("form submitted")
    if (siteName === "") {
      setShowError(true)
    } else {
      setShowError(false)
      props.hideForm()
      resetStateValues()
    }
    console.log("siteNameNotEmpty", showError)
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log("form cancelled")
    props.hideForm()
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSiteName(e.target.value)
  }

  useEffect(() => {
    // load 1 sec after user stops typing
    const timeoutId = setTimeout(() => load(), 1000)
    console.log("timeoutId: ", timeoutId)
    return () => clearTimeout(timeoutId)
  }, [siteName])

  const load = async () => {
    let convertedSiteName = spaceToPlusConverter(siteName)
    console.log("convertedSiteName", convertedSiteName)
    let data: any

    if (siteName !== "") {
      console.log("siteName", siteName)

      await geoCodeApi(siteName).then(dataRes => {
        console.log("dataRes", dataRes)
        data = dataRes
      })
      console.log("data", data)

      if (data) {
        setLatitude(`${data.geometry.location.lat}`)
        setLongitude(`${data.geometry.location.lng}`)
        setRegion(`${data.address_components[3].long_name}`)
      }
    } else {
      resetStateValues()
    }
  }

  const resetStateValues = () => {
    setLatitude("")
    setLongitude("")
    setRegion("")
    setSiteName("")
  }

  console.log("siteName", siteName)
  console.log("showError", showError)

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
                  defaultValue=""
                  value={siteName}
                  variant="outlined"
                  onChange={(e) => handleOnChange(e)}
                />
              ) : (
                <TextField
                  error
                  id="empty-location-name"
                  defaultValue=""
                  value={siteName}
                  variant="outlined"
                  onChange={(e) => handleOnChange(e)}
                  helperText="Site name can't be empty"
                />
              )}
            </div>
            <div>
              <TextField
                id="region"
                label="Jurisdiction/City/Region"
                defaultValue=""
                variant="filled"
                value={region}
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Site Description"
                defaultValue=""
                variant="outlined"
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
        <AuditLog />
      </div>
    </div>
  )
}

export default LocationForm
