import { Card, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    card: {
        padding: '10px',
        display: 'block'
    },
    card_item: {
        width: '100%'
    }
}))

export default function CardVehicle({ data }) {
    const classes = useStyles()
    return data.map(vehicle => (
        <Grid item xs={6} key={vehicle.id}>
            <Card className={classes.card}>
                <span className={classes.card_item}>
                    <b>Propietario: </b>{vehicle.propietario}
                </span> <br/>
                <span className={classes.card_item}>
                    <b>Cedula: </b>{vehicle.cedula_propietario}
                </span> <br/>
                <span>
                    <b>Placa: </b>{vehicle.placa}
                </span> <br/>
                <span>
                    <b>Marca: </b>{vehicle.marca}
                </span> <br/>
                <span>
                    <b>Vehiculo: </b>{vehicle.tipo_vehiculo}
                </span>
            </Card>
        </Grid>
    ))
}
