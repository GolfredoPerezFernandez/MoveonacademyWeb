import { useCallback, useMemo, useState,useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  useMoralis } from 'react-moralis';
import { Magic } from "magic-sdk"
import { OAuthExtension } from '@magic-ext/oauth';
import {
  
  TextField,
} from '@mui/material';

const now = new Date();

const Page = () => {
  
  var [courses,setCourses]=useState([])

  var [rowsCourse,setRowsCourse]=useState([])
const {Moralis}=useMoralis()

const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'studentName', headerName: 'Name', width: 200 },
  { field: 'studentEmail', headerName: 'studentEmail', width: 200 },
  { field: 'course', headerName: 'course', width: 100 },

  { field: 'level', headerName: 'Level', width: 100 },
];

const columnsDate = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'date', headerName: 'date', width: 500 },
 
];
var [rowsDate,setRowsDate]=useState([]) 
function handleDate(){  
  console.log(date.$d)

  setRowsDate([...rowsDate,{
   id:count,
   date:date.$d,
  }])
  setCount(count+1)
}
  const fetchData = async () =>{

    try{
      
  let rows2=[]
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });  
    const userMetadata = await magic.user.getMetadata();
  

    const query2 = new Moralis.Query("Courses");
      const query = new Moralis.Query("Students");
     await query.equalTo("teacher",userMetadata.email)
    await  query2.equalTo("teacher",userMetadata.email)

      const object = await query.find();
      const object2 = await query2.find();
      let cursos=[]

      for(let i=0;i<object2.length;i++){
        cursos=[...cursos,{id:object2[i].attributes._id,label:object2[i].attributes.course,value:object2[i].attributes.course}]

      }
      setCourses([...cursos])
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
        studiantes=[...studiantes,{
          id:object[i].attributes.uid,
          course:object[i].attributes.course,
          level:object[i].attributes.level,
          studentEmail:object[i].attributes.studentEmail,
          studentName:object[i].attributes.studentName,
    
         }]
       
          
      }
      setRowsStudents([...studiantes])

      
    } 
    catch(err){
      console.log(err);
    }
  
  }
  
  
async function handleStudent(){
  const Student=Moralis.Object.extend("Students")
  const student=new Student()
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });
  const query = new Moralis.Query("Students");
  const count = await query.find();
console.log(values.course)
console.log(values.level)

  if(values.studentEmail!==""){
    query.equalTo("studentEmail",values.studentEmail)
    if(await query.first()){
      return 
    }
    const userMetadata = await magic.user.getMetadata();

    student.set("teacher",userMetadata.email)   
    if(values.course!==""){

      student.set("course",values.course)    
    
    }    else{
      return
    }
    if(values.level!==""){

      student.set("level",values.level)          
    
    }  else{
      return
    }
if(values.studentName!==""){
  
    student.set("studentName",values.studentName)
    
}else{
  return
}

if(values.studentEmail!==""){
  student.set("studentEmail",values.studentEmail)

}else{
  return
}

    student.set("uid",(count.length+1))
    await student.save()

    setRowsStudents([...rowsStudents,{
      id:count.length+1,
      course:values.course,
      level:values.level,
      studentName:values.studentName,
      studentEmail:values.studentEmail,
   
     }])


  }

}

const estado = [
  {
    value: 'Activo',
    label: 'activo'
  },
  {
    value: 'Inactivo',
    label: 'inactivo'
  },
];
const genders = [
  {
    value: 'Male',
    label: 'male'
  },
  {
    value: 'Female',
    label: 'female'
  },
];
const lenguages = [
  {
    value: 'ingles',
    label: 'ingles'
  },
  {
    value: 'italiano',
    label: 'italiano'
  },
  {
    value: 'aleman',
    label: 'aleman'
  },
  {
    value: 'español',
    label: 'español'
  }
];
var [rowsStudents,setRowsStudents]=useState([])

const [date, setDate] = useState(null);
const [date2, setDate2] = useState(null);

const [date3, setDate3] = useState(null);
  useEffect(()=>{
    fetchData()
},[]);
  const [values, setValues] = useState({
    teacherName: '',
    teacherEmail: '', 
    
    teacherLastname: '', 
    course: '',
    level: '',
    rif: '',
    instituto:"",
    cedula: '',
    titulo: '',
    nacimiento: '',
    lenguages: '',
    alergias: '',
    procedencia: '',
    ciudad:"",
    state:"",
    comentarios: '',
    telefono: '',
    nivelAcademico: '',


  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          My Students
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              
              
              <div>
              <Stack spacing={1}>
                <Typography variant="h4">
                  Add Teacher
                </Typography>
                
              </Stack>

      
              <TextField
                  fullWidth
                  label="Teacher Name"
                  name="teacherName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherName}
                />
                
              <TextField
                  fullWidth
                  label="Teacher Lastname"
                  name="teacherLasname"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherLastname}
                />
                      
<TextField
                  fullWidth
                  label="Select Gender"
                  name="Genero"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.gender}
                >
                  {genders.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
              <TextField
                  fullWidth
                  label="Rif"
                  name="rif"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.rif}
                />
              <TextField
                  fullWidth
                  label="Teacher ID"
                  name="cedula"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.cedula}
                />
                 <TextField
                  fullWidth
                  label="Ciudad de Origen"
                  name="ciudad de origen"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.ciudad}
                />
                
                <TextField
                  fullWidth
                  label="Titulo"
                  name="titulo"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.titulo}
                />
                  <TextField
                  fullWidth
                  label="Instituto donde se graduo"
                  name="Instituto"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.instituto}
                />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Nacimiento"
value={date}
onChange={(newValue) => setDate(newValue)}
/>    </LocalizationProvider>

                  <TextField
                  fullWidth
                  label="Teacher Email"
                  name="teacherEmail"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherEmail}
                /> 
                 <TextField
                fullWidth
                label="Teacher Phone"
                name="telefono"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.telefono}
              />
                 <TextField
                fullWidth
                label="Alergias"
                name="alergias"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.alergias}
              />
               <TextField
                fullWidth
                label="Comentarios"
                name="comentarios"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.comentarios}
              /> 
             
<TextField
                  fullWidth
                  label="Select Lenguages"
                  name="Lenguages"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.lenguage}
                >
                  {lenguages.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <Grid container  style={{direction:"row",width:"100%",marginTop:10,marginBottom:10}}>
               
               <Grid container  style={{direction:"row",width:"30%",marginTop:10,marginBottom:10}}>
          
         <Typography variant="h6">
               Disponibilidad
       
             </Typography>
               <Box style={{marginTop:10,marginBottom:10}} >

                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
 label="Disponibilidad Horaria"
 value={date}
 onChange={(newValue) => setDate(newValue)}
/>    </LocalizationProvider>
   
   
</Box>
   <Button 
   style={{marginTop:5,marginLeft:5,height:70,width:120}}
                 startIcon={(
                   <SvgIcon fontSize="small">
                     <PlusIcon />
                   </SvgIcon>
                 )}
                 onClick={handleDate}
                 variant="contained"
               >
                 Add Date
               </Button>
               
</Grid>
<div style={{ height: 200, }}>
             
             <DataGrid
               rows={rowsDate}
               columns={columnsDate}
               paginationModel={{ page: 0, pageSize: 5 }}
               
             />
           </div>
                 
</Grid>
         
                     
<TextField
                  fullWidth
                  label="Select State"
                  name="Estado"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {estado.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Contratacion"
value={date}
onChange={(newValue) => setDate2(newValue)}
/>    </LocalizationProvider>

<LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Finalizacion"
value={date}
onChange={(newValue) => setDate3(newValue)}
/>    </LocalizationProvider>
               
              </div>
            </Stack>
            <Button    
                  onClick={handleStudent}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Teacher 
                </Button>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        rows={rowsStudents}
        columns={columnsCourse}
        paginationModel={{ page: 0, pageSize: 5 }}
        
      />
    </div>
           </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
