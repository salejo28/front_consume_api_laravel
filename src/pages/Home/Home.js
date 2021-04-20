import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, makeStyles } from '@material-ui/core'
import Search from '../../components/Search/Search'

import axios from 'axios'
import Pagination from '../../components/Paginations/Pagination'
import CardVehicle from '../../components/Card/CardVehicle'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        height: '50px',
        margin: '0 30px',
    }
}))

export default function Home() {
    const uri = process.env.REACT_APP_URI_API
    const classes = useStyles()

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [vehiclePerPage] = useState(4)
    const [showTotal, setShowTotal] = useState(false)
    const [carsBrandTotal, setCarsBrandTotal] = useState([])
    const [motoBrandTotal, setMotoBrandTotal] = useState([])
    const [toSearch, setToSearch] = useState('')
    const [alert, setAlert] = useState({
        show: false,
        message: ''
    })
    const [vehicle, setVehicle] = useState([])
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        loadData()
        loadTotalBrand()
    }, [])

    const onClose = () => {
        setAlert({
            show: false,
            message: ''
        })
    }

    const handleClick = () => {
        setShowTotal(!showTotal)
    }

    const handleChange = (e) => {
        setIsSearch(false)
        const { value } = e.target
        setToSearch(value)
    }

    const search = async () => {
        const res = await axios.get(uri + '/api/vehiculo/' + toSearch)
        if (res.data.Message) {
            setAlert({
                show: true,
                message: res.data.Message
            })
            return
        }
        setIsSearch(true);
        setVehicle(res.data)
    }

    const loadData = async () => {
        const res = await axios.get(uri + '/api/vehiculos')
        setData(res.data)
    }

    const loadTotalBrand = () => {
        const arrayCars = []
        const arrayM = []
        Brands.cars.map(async brand => {
            const res = await axios.get(uri + '/api/vehiculo/brand/' + brand)
            arrayCars.push(res.data)
        })

        Brands.motorcycle.map(async brand => {
            const res = await axios.get(uri + '/api/vehiculo/brand/' + brand)
            arrayM.push(res.data)
        })
        setCarsBrandTotal(arrayCars)
        setMotoBrandTotal(arrayM)
    }

    const indexOfLastVehicle = currentPage * vehiclePerPage
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage
    const currentVehicle = data.slice(indexOfFirstVehicle, indexOfLastVehicle)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <Container maxWidth="sm">
            {
                alert.show ? (
                    <Alert
                        color="warning"
                        onClose={onClose}
                    >
                        {alert.message}
                    </Alert>
                ) : <></>
            }
            <div className={classes.header}>
                <Search onChange={handleChange} click={search} value={toSearch} />
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={handleClick}
                    disabled={isSearch}
                >
                    {showTotal ? 'Ver Vehiculos' : 'Total Vehiculos'}
                </Button>
            </div>
            {
                isSearch ? (
                    <Grid container spacing={3}>
                        <CardVehicle data={vehicle} />
                    </Grid>
                ) :
                    showTotal ? (
                        <ul>
                            <h1>Carros y Camionetas</h1>
                            {
                                carsBrandTotal.map((vehicle, i) => {
                                    return (
                                        <li key={i}>
                                            <span>
                                                <b>{vehicle.Marca}: </b>{vehicle.Vehicles}
                                            </span>
                                        </li>
                                    )
                                })
                            }
                            <h1>Motos</h1>
                            {
                                motoBrandTotal.map((vehicle, i) => {
                                    return (
                                        <li key={i}>
                                            <span>
                                                <b>{vehicle.Marca}: </b>{vehicle.Vehicles}
                                            </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) : (
                        <Grid container spacing={3}>

                            <CardVehicle data={currentVehicle} />

                            <Grid item xs={12}>
                                <Pagination vehiclesPerPage={vehiclePerPage} totalVehicles={data.length} paginate={paginate} />
                            </Grid>
                        </Grid>
                    )
            }
        </Container>
    )
}

const Brands = {
    cars: ["Chevrolet", "Renault", "Mazda"],
    motorcycle: ["Honda", "Akt", "Yamaha"]
}
