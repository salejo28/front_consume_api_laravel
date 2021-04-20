import { Button, FormControl, FormGroup, InputLabel, makeStyles, Select, TextField } from '@material-ui/core'
import React, { Fragment } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: '30px 10px 30px rgba(0,0,0,.5)',
        width: '400px',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center'
    },
    control: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
        textAlign: 'center'
    },
    button: {
        width: '100%'
    }
}))

function CreateVehicle({ handleChange, data, handleSubmit }) {
    const classes = useStyles()

    const onlyNumbers = (e) => {
        var key = e.keyCode || e.which

        var keyboard = String.fromCharCode(key)

        var number = '0123456789'

        var special = "8-37-38-46"

        var keyboard_special = false

        for (let i in special) {
            if (key === special[i]) {
                keyboard_special = true
            }
        }

        if (number.indexOf(keyboard) === -1 && !keyboard_special) {
            e.preventDefault()
            return false
        }

        return true
    }

    return (
        <div>
            <form className={classes.root} onSubmit={handleSubmit}>
                <FormGroup className={classes.control}>
                    <h3>Nuevo Vehiculo</h3>
                    <FormControl>
                        <TextField
                            name="placa"
                            label="Placa"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tipo Vehiculo</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                            value={data.tipo_vehiculo}
                            inputProps={{
                                name: 'tipo_vehiculo'
                            }}
                            required
                        >
                            <option>Selecciona un vehiculo</option>
                            <option value="carro">
                                Carro
                            </option>
                            <option value="camioneta">
                                Camioneta
                            </option>
                            <option value="moto">
                                Moto
                            </option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Marca</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                            value={data.marca}
                            inputProps={{
                                name: 'marca'
                            }}
                            required
                        >
                            {
                                data.tipo_vehiculo === 'carro' || data.tipo_vehiculo === 'camioneta' ? (
                                    <Fragment>
                                        <option>
                                            Selecciona una marca
                                        </option>
                                        <option value="Chevrolet">
                                            Chevrolet
                                        </option>
                                        <option value="Renault">
                                            Renault
                                        </option>
                                        <option value="Mazda">
                                            Mazda
                                        </option>
                                    </Fragment>
                                ) : data.tipo_vehiculo === 'moto' ? (
                                    <Fragment>
                                        <option>
                                            Selecciona una marca
                                        </option>
                                        <option value="Honda">
                                            Honda
                                        </option>
                                        <option value="Akt">
                                            Akt
                                        </option>
                                        <option value="Yamaha">
                                            Yamaha
                                        </option>
                                    </Fragment>
                                ) : (
                                    <option>
                                        Selecciona una marca
                                    </option>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <TextField
                            name="propietario"
                            label="Propietario"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            name="cedula_propietario"
                            label="Cedula del Propietario"
                            variant="outlined"
                            onChange={handleChange}
                            onKeyPress={e => onlyNumbers(e)}
                            required
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.button}
                    >
                        Crear
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CreateVehicle