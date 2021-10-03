import React, {useEffect, useState} from 'react'
import { makeStyles, CircularProgress } from '@material-ui/core'
import clsx from 'clsx'
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '400px',
      '& .cell.selected': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
        color: '#1a3e72',
        fontWeight: '600',
      },
      '& .cell.unselected': {
        backgroundColor: '#c2c2c2',
        color: '#1a3e72',
        fontWeight: '600',
      },
      '& .cell.student': {
        backgroundColor: '#ffff00',
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

const Schedule = ({role}) => {
  const classes = useStyles()
  const [rows, setRows] = useState(null)
  const [columns, setColumns] = useState(null)
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState(scheduleInitial)
  const [studentSelect, setStudentSelect] = useState([])

  useEffect(()=> {
    setStudentSelect([])
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
        { field: day, headerName: <strong>{day}</strong>, width: 150,
           cellClassName: (params) =>
           clsx('cell', {
           selected: params.value === "Disponible",
           unselected: role!=="tutor"? params.value === "No disponible" : false,
           student: params.value === "Seleccionado"
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
      let res ="Disponible"
      let index = loadedSchedule.indexOf(slot)
      slot = {...slot, [day]: res}        
      loadedSchedule[index] = slot
    })
    setRows(loadedSchedule)
  }

  const handleClick = (e) => {
    if(role==="tutor"){
      let day = e.field
      let slot = rows.find( slot => slot.id === e.id)
      let index = rows.indexOf(slot)
      let res ="Disponible"
      if(e.value !== "No disponible") res = "No disponible"
      slot = {...slot, [day]: res}        
      let newRow = [...rows]
      newRow[index] = slot
      setRows(newRow)
    }else{
      if(e.value==="Disponible" || e.value==="Seleccionado"){
        let slot = {id: e.field+e.id,day: e.field, start_time: e.id, end_time: e.id+1}
        let day = e.field
        let slotedit = rows.find( element => element.id === e.id)
        let index = rows.indexOf(slotedit)
        let text = e.value==="Disponible"? "Seleccionado": "Disponible"
        slotedit = {...slotedit, [day]: text}        
        let newRow = [...rows]
        newRow[index] = slotedit
        let newStudent = [...studentSelect]
        if(e.value==="Disponible") newStudent.push(slot)
        else newStudent = newStudent.filter(element => element.id!==slot.id)
        setStudentSelect(newStudent)
        setRows(newRow)
      }
    }
  }
  useEffect(()=>{
    console.log(studentSelect)
  },[studentSelect])
  
  return (
    <div style={role==="tutor"? { height: 500, width: '100%' }:{ height: 400, width: '100%' }} className={classes.root}>
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

export default Schedule
