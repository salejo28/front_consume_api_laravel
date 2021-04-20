import React from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles({
    content_search: {
        display: 'flex',
        alignItems: 'center',
        margin: '30px 0',
    },
    icon: {
        color: '#fff',
    },
})

function Search({ onChange, click, value }) {
    const classes = useStyles()
    return (
        <div className={classes.content_search}>
            <TextField
                name="by"
                label="Buscar vehiculo"
                onChange={onChange}
                value={value}
            />
            <Button
                color="primary"
                variant="contained"
                onClick={click}
            >
                <SearchIcon className={classes.icon} />
            </Button>
        </div>
    )
}

export default Search