import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'lightgrey',
			height: '10vh',
		},
		auditHeader: {
			borderBottom: '1px solid grey',
		}
	}),
);

const AuditLog = () => {
	let auditLog

	const classes = useStyles();
	return (
		<div >
			<CssBaseline />
			<Container className={classes.root} maxWidth="md">
				<Box mb={2}>
					Audit Log
				</Box>
				<Box className={classes.auditHeader}></Box>
				<Box>{auditLog}</Box>
			</Container>
		</div>
	)
}

export default AuditLog