import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: "#fff",
        margin: '0 10px'
    },
}))

function Nav() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Four-Wheel Parking
                </Typography>
                    <Link className={classes.link} to="/">Home</Link>
                    <Link className={classes.link} to="/new">New Vehicle</Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default React.memo(Nav)