import React, {useEffect, useState} from 'react'
import { makeStyles, CircularProgress, Box, Button } from '@material-ui/core'
import clsx from 'clsx'
import { DataGrid } from '@material-ui/data-grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
const scheduleInitial = [{day: "Lunes", start_time: 7, end_time: 9}, {day: "Martes", start_time: 10, end_time: 11},
                  {day: "Miercoles", start_time: 13, end_time: 14}, {day: "Lunes", start_time: 16, end_time: 17},
                  {day: "Martes", start_time: 7, end_time: 9} ]

const Schedule = ({role, next}) => {
  const classes = useStyles()
  const [rows, setRows] = useState(null)
  const [columns, setColumns] = useState(null)
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState(scheduleInitial)
  const [studentSelect, setStudentSelect] = useState([])
  const [date, setDate] = useState(new Date(2021,9,3))
  const [nextButton, setNext] = useState(true)
  useEffect(()=> {
    var newDays = getDate(date)
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
    newDays.forEach((day) => {
      genetaredColumns.push(
        { field: day.label, headerName: 
            <>
              <strong>{day.label}</strong> {"\n"}
              <strong>{day.date}-{day.month}</strong>
            </>, width: 150,
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

  const getDate = (current) => {
    var week= new Array(); 
    current.setDate((current.getDate() - (current.getDay()-1)));
    for (var i = 0; i < 7; i++) {
        let actual = new Date(current)
        let dayactual = actual.getDay() === 0? 6: actual.getDay()-1
        week.push({year: actual.getFullYear(), month: month[actual.getMonth()], date: actual.getDate(), label: days[dayactual]})
        current.setDate(current.getDate() +1);
    }
    setDate(new Date())
    return week; 
  }

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
      console.log(e)
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
        /* handleScheduleSelected(newStudent) */
        setRows(newRow)
        next(slot)
      }
    }
  }
  useEffect(()=>{
    if(role!=="tutor")console.log(studentSelect)
  },[studentSelect])
  
  const handleClickWeek = () => {
    date.setDate(date.getDate()+7)
    setDate(date)
    console.log(date.toDateString())
    let genetaredColumns = []
    let newsDays = getDate(date)
    const franja = { field: 'franja', headerName: 'Franja', headerClassName: 'slotheader',
                      width: 75, cellClassName: 'FranjaCell', sortable: false
    }
    genetaredColumns.push(franja)
    newsDays.forEach((day) => {
      genetaredColumns.push(
        { field: day.label, headerName: 
            <>
              <strong>{day.label}</strong> {"\n"}
              <strong>{day.date}-{day.month}</strong>
            </>, width: 150,
           cellClassName: (params) =>
           clsx('cell', {
           selected: params.value === "Disponible",
           unselected: role!=="tutor"? params.value === "No disponible" : false,
           student: params.value === "Seleccionado"
         }),sortable: false, headerAlign: 'center', headerClassName: 'cellHeader'
        })
    })
    setColumns(genetaredColumns)
    setNext(false)
  }

  const handleClickWeekprev = () => {
    let genetaredColumns = []
    let newsDays = getDate(new Date())
    const franja = { field: 'franja', headerName: 'Franja', headerClassName: 'slotheader',
                      width: 75, cellClassName: 'FranjaCell', sortable: false
    }
    genetaredColumns.push(franja)
    newsDays.forEach((day) => {
      genetaredColumns.push(
        { field: day.label, headerName: 
            <>
              <strong>{day.label}</strong> {"\n"}
              <strong>{day.date}-{day.month}</strong>
            </>, width: 150,
           cellClassName: (params) =>
           clsx('cell', {
           selected: params.value === "Disponible",
           unselected: role!=="tutor"? params.value === "No disponible" : false,
           student: params.value === "Seleccionado"
         }),sortable: false, headerAlign: 'center', headerClassName: 'cellHeader'
        })
    })
    setColumns(genetaredColumns)
    setNext(true)
    setDate(new Date())
  }
  return (
    <>
    {role!=="tutor"? 
    <Box display="flex" flexDirection="Row">
      {nextButton? <Button color="primary" onClick={handleClickWeek} endIcon={<ArrowForwardIosIcon />}> Semana siguiente</Button> :
      <Button color="primary" onClick={handleClickWeekprev} startIcon={<ArrowBackIosIcon />}> Semana anterior</Button>}
    </Box> 
    : 
    <></>}
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
    </>
  )
}

export default Schedule
