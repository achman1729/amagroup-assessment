import React, { useState } from "react"
import "./LocationDetail.css"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import LocationForm from "./LocationForm/LocationForm"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		buttonStyle: {
			marginTop: '1vh'
		},
		formShow: {
			border: "1px solid cornflowerblue",
			marginTop: "10vh",
			marginLeft: "15px",
			padding: "15px",
			width: "56vw",
			display: "block",
		},
		formHide: {
			display: "none"
		}
	}),
);

const LocationDetail: React.FC = () => {
	const [showForm, setShowForm] = useState(false)
	const classes = useStyles();

	const handleShowForm = () => {
		setShowForm(true)
	}
	const hideForm = () => {
		setShowForm(false)
	}
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={2}>
					<h3>Enter a site issue: </h3>
				</Grid>
				<Grid className={classes.buttonStyle} item xs={2}>
					<Button variant="contained" type="submit" onClick={handleShowForm}>
						Enter new issue
        </Button>
				</Grid>
			</Grid>
			<div
				className={`locationForm-component ${!showForm ? classes.formHide : classes.formShow}`}>
				<LocationForm hideForm={hideForm} />
			</div>
		</div>
	)
}

export default LocationDetail
