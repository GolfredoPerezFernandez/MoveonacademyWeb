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
  var [levels,setLevels]=useState([{
    label:"1",
    value:"1"
  },{
    label:"2",
    value:"2"
  },{
    label:"3",
    value:"3"
  },{
    label:"4",
    value:"4"
  },{
    label:"5",
    value:"5"
  },{
    label:"6",
    value:"6"
  },{
    label:"7",
    value:"7"
  },{
    label:"8",
    value:"8"
  },{
    label:"9",
    value:"9"
  },{
    label:"10",
    value:"10"
  },{
    label:"11",
    value:"11"
  },{
    label:"12",
    value:"12"
  },])

  var [rowsCourse,setRowsCourse]=useState([])
const {Moralis}=useMoralis()

const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'studentName', headerName: 'Name', width: 200 },
  { field: 'studentEmail', headerName: 'studentEmail', width: 200 },
  { field: 'course', headerName: 'course', width: 100 },

  { field: 'level', headerName: 'Level', width: 100 },
];
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

  useEffect(()=>{
    fetchData()
},[]);
  const [values, setValues] = useState({
    studentName: '',
    studentEmail: '', 
    studentLastname: '', 
    course: '',
    level: '',
    cedula: '',
    nacimiento: '',
    lenguages: '',
    alergias: '',
    procedencia: '',
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
                  Add Students
                </Typography>
                
              </Stack>

      
              <TextField
                  fullWidth
                  label="Student Name"
                  name="studentName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.studentName}
                />
                
              <TextField
                  fullWidth
                  label="Student Lastname"
                  name="studentLasname"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.studentLastname}
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
                  label="Student Cedula"
                  name="cedula"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.cedula}
                />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Nacimiento"
value={date}
onChange={(newValue) => setDate(newValue)}
/>    </LocalizationProvider>
                  <TextField
                  fullWidth
                  label="Student Email"
                  name="studentEmail"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.studentEmail}
                /> 
                 <TextField
                fullWidth
                label="Student Phone"
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
              label="Nivel Academico"
              name="nivelAcademico"
              onChange={handleChange}
              required
              style={{
                marginTop:10,
                marginBottom:10
              }}
              value={values.nivelAcademico}
            />  
              <TextField
            fullWidth
            label="Procedencia"
            name="procedencia"
            onChange={handleChange}
            required
            style={{
              marginTop:10,
              marginBottom:10
            }}
            value={values.nivelAcademico}
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

                <Button    
                  onClick={handleStudent}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Student 
                </Button>
              </div>
            </Stack>
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
