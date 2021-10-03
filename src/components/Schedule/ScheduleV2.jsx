import React, {useEffect, useState} from 'react'
import { makeStyles, CircularProgress } from '@material-ui/core'
import clsx from 'clsx'
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '600px',
      '& .cell.selected': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
        color: '#1a3e72',
        fontWeight: '600',
      },
      '& .FranjaCell': {
        backgroundColor: 'rgb(145 151 250 / 40%)',
        color: '#1a3e72',
        fontWeight: '700',
      },
      '& .cellHeader': {
        backgroundColor: '#53b6e0',
        color: '#ffff'
      },
  },
}))

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
const scheduleInitial = [{day: "Lunes", start_time: 7, end_time: 9}, {day: "Martes", start_time: 10, end_time: 11},
                  {day: "Miercoles", start_time: 13, end_time: 14}, {day: "Lunes", start_time: 16, end_time: 17},
                  {day: "Martes", start_time: 7, end_time: 9} ]

const ScheduleV2 = () => {
  const classes = useStyles()
  const [rows, setRows] = useState(null)
  const [columns, setColumns] = useState(null)
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState(scheduleInitial)

  useEffect(()=> {
    const generatedRows = [], genetaredColumns = []
    for (let index = 6; index <= 22; index++) {
      generatedRows.push(
        { id: index, franja: index<12? index+" am": (index===12? (index)+" am": (index-12)+" pm"),
        Lunes:"No disponible", Martes: "No disponible", Miercoles: "No disponible",
        Jueves: "No disponible", Viernes: "No disponible", Sabado: "No disponible"
    })
    }
    const franja = { field: 'franja', headerName: 'Franja', headerClassName: 'slotheader',
                      width: 75, cellClassName: 'FranjaCell', sortable: false
    }
    genetaredColumns.push(franja)
    days.forEach(day => {
      genetaredColumns.push(
        { field: day, headerName: <strong>{day}</strong>, width: 125,
           cellClassName: (params) =>
           clsx('cell', {
           selected: params.value === "disponible",
         }),sortable: false, headerAlign: 'center', headerClassName: 'cellHeader'
        })
    })
    setColumns(genetaredColumns)
    loadSchedule(generatedRows)
    setLoading(false)
  },[])

  const loadSchedule = (generatedRows) => {
    let loadedSchedule = [...generatedRows]
    schedule.forEach(element => {
      let slot = loadedSchedule.find( slot => slot.id === element.start_time)
      let day = element.day
      let res ="disponible"
      let index = loadedSchedule.indexOf(slot)
      slot = {...slot, [day]: res}        
      loadedSchedule[index] = slot
    })
    setRows(loadedSchedule)
  }

  const handleClick = (e) => {
    let day = e.field
    let slot = rows.find( slot => slot.id === e.id)
    let res ="disponible"
    if(e.value !== "No disponible") res = "No disponible"
    slot = {...slot, [day]: res}        
    let newRow = []
    rows.map( element => {
      if(element.id === slot.id) newRow.push(slot)
      else newRow.push(element)
    })
    setRows(newRow)
  }
  
  return (
    <div style={{ height: 600, width: '100%' }} className={classes.root}>
      {loading? <CircularProgress /> : 
      (
        <DataGrid
        disableColumnMenu={true}
        hideFooter={true}
        onCellClick={handleClick}
        rows={rows}
        columns={columns}
      />
      )}
    </div>
  )
}

export default ScheduleV2
