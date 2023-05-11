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
import { Grid } from '@mui/material';
import { Dayjs } from 'dayjs';
import {  useMoralis } from 'react-moralis';
import { Magic } from "magic-sdk"
import { OAuthExtension } from '@magic-ext/oauth';
import {
  
  TextField,
} from '@mui/material';

const now = new Date();
const Page = () => {
  
const {Moralis}=useMoralis()
  const [date, setDate] = useState(null);
  const [count2, setCount2] = useState(0);  
  const [count3, setCount3] = useState(0);
  const [count, setCount] = useState(0);
  const [email,setEmail]=useState("")

  const fetchData = async () =>{

    try{
      
  let rows2=[]
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });  
    const userMetadata = await magic.user.getMetadata();
  

      const query = new Moralis.Query("Courses");
      query.equalTo("teacher",userMetadata.email)

      const object = await query.find();

console.log(JSON.stringify(object))
let courses=[]
      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          course:object[i].attributes.course,
          dates:object[i].attributes.dates,
          unities:object[i].attributes.unities,
       
         }]
    
          
      }
      setRowsCourse([...courses])
    } 
    catch(err){
      console.log(err);
    }
  
  }
  
  
  useEffect(()=>{
    fetchData()
},[]);

function handleDate(){  
   console.log(date.$d)

   setRowsDate([...rowsDate,{
    id:count,
    date:date.$d,
   }])
   setCount(count+1)
}

function handleUnity(){  

  setRowsUnidad([...rowsUnidad,{
   id:count2,
   actividad:values.actividad,
   competencia:values.competencia,
   unidad:values.unidad,

  }])
  setCount2(count2+1)
}


async function handleCourse(){
  const Courses=Moralis.Object.extend("Courses")
  const course=new Courses()
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });
  const query = new Moralis.Query("Courses");
  const count = await query.find();
  if(values.course!==""){
    query.equalTo("course",values.course)
    if(await query.first()){
      return 
    }
    const userMetadata = await magic.user.getMetadata();

    course.set("teacher",userMetadata.email)       
    course.set("course",values.course)    
 
    let dates=[]  
      let unities=[]

    for(let i=0;i<rowsDate.length;i++){
      dates=[...dates,rowsDate[i].date]
    }
    for(let i=0;i<rowsUnidad.length;i++){
      unities=[...dates,{
        
   actividad:rowsUnidad[i].actividad,
   competencia:rowsUnidad[i].competencia,
   unidad:rowsUnidad[i].unidad,
   }]

    }
    course.set("dates",[...dates])
    course.set("unities",[...unities])

    course.set("uid",(count.length+1))
    await course.save()

    setRowsCourse([...rowsCourse,{
      id:count.length+1,
      course:values.course,
      dates:rowsDate,
      unities:rowsUnidad,
   
     }])


  }

}
  const [values, setValues] = useState({
    lenguage:"",
    course: '',
    unidad: '',
    actividad: '',
    room: '',
    level: '',
    teacher: '',
    competencia: '',
    email: '',
    city: '',
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

  const teachers = [
  ];
  const levels = [
    {
      value: 'kids',
      label: 'kids'
    },
    {
      value: 'junior',
      label: 'junior'
    },
    {
      value: 'teens',
      label: 'teens'
    },
    {
      value: 'pro',
      label: 'pro'
    },
  ];
  
  const states = [
    {
      value: 'merida',
      label: 'Merida'
    },
    {
      value: 'sancristobal',
      label: 'San Cristobal'
    },
    {
      value: 'caracas',
      label: 'Caracas'
    }
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

  const columnsDate = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'date', headerName: 'date', width: 500 },
   
  ];
  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'course', headerName: 'Course', width: 200 },
  ];
  const columnsUnidad = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'unidad', headerName: 'Unidad', width: 200 },
    { field: 'competencia', headerName: 'Competencia', width: 250 },
    { field: 'actividad', headerName: 'Actividad', width: 250 },

  ];
  var [rows,setRows]=useState([])
  var [rowsDate,setRowsDate]=useState([]) 
   var [rowsUnidad,setRowsUnidad]=useState([])
   var [rowsCourse,setRowsCourse]=useState([])

  return (
    <>
      <Head>
        <title>
          Courses 
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
          <div>
            
          <Typography variant="h6">
                Add New Course
        
              </Typography>
              <TextField
                  fullWidth
                  label="Nombre del Curso"
                  name="course"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.course}
                />
                   <TextField
                  fullWidth
                  label="Select City"
                  name="city"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.city}
                >
                  {states.map((option) => (
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
                  label="Select Lenguage"
                  name="Lenguage"
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
                  label="Class Room"
                  name="class Room"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.room}
                />
                  <TextField
                  fullWidth
                  label="Select Level"
                  name="Level"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.level}
                >
                  {levels.map((option) => (
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
                  label="Select Teacher"
                  name="Teacher"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.teacher}
                >
                  {teachers.map((option) => (
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
                Add Dates
        
              </Typography>
                <Box style={{marginTop:10,marginBottom:10}} >

                     <LocalizationProvider dateAdapter={AdapterDayjs}>

                     <DateTimePicker
  label="Time Picker"
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
              </div>
              
            
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleCourse}
                  variant="contained"
                >
                  Add Course
                </Button>
          </Stack>
    
       
        </Container>
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
              <Stack spacing={1}>
                <Typography variant="h4">
                  Courses
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        rows={rowsCourse}
        columns={columnsCourse}
        paginationModel={{ page: 0, pageSize: 5 }}
        
      />
    </div>
          </Stack>
          
        </Container>
      </Box>
        
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
