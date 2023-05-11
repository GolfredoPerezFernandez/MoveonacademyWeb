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

import {  useMoralis } from 'react-moralis';
import { Magic } from "magic-sdk"
import { OAuthExtension } from '@magic-ext/oauth';
import {
  
  TextField,
} from '@mui/material';

const now = new Date();

const Page = () => {
  
const {Moralis}=useMoralis()
  const [estudentsData,setStudents]=useState([])
  const fetchStudentData = async () => {
    
    
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });      
  const userMetadata = await magic.user.getMetadata();
  console.log("entra")

    const query = new Moralis.Query("Students");
    if(values.studentName==""){
      
    }
    else{

      await query.equalTo("studentName",values.studentName)
    }
    console.log("entra2")
    await query.equalTo("teacher",userMetadata.email)

    const object = await query.first();
    console.log(object.attributes.course)
    const query2 = new Moralis.Query("Courses");

    await query2.equalTo("course","Junior")
    const object2 = await query2.first();
    console.log("cursoDel"+JSON.stringify(object2)) 

  }
  const fetchData = async () =>{

    try{
      
  let rows2=[]
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });  
    const userMetadata = await magic.user.getMetadata();
  

      const query = new Moralis.Query("Students");
      await query.equalTo("teacher",userMetadata.email)

      const object = await query.find();

let estudiantes=[]
      for(let i=0;i<object.length;i++){
        estudiantes=[...estudiantes,{
      id:object[i].attributes.uid,
      label:object[i].attributes.studentName,
      value:object[i].attributes.studentName,

     }]
          
      }

      setStudents([...estudiantes])
    } 
    catch(err){
      console.log(err);
    }
  
  }
  
  useEffect(()=>{
    fetchData()
},[]);

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 260 },
  { field: 'city', headerName: 'City', width: 130 },
 
];
  const [values, setValues] = useState({
    studentName: '',
  });
useEffect(()=>{

  fetchStudentData()
},[])
  var [rows,setRows]=useState([])
  const handleChange = useCallback(
    (event) => {
    
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const unity = [
    {
      value: 'unidad 1',
      label: 'Unidad 1'
    },
    {
      value: 'Unidad 2',
      label: 'Unidad 2'
    },
    {
      value: 'unidad 3',
      label: 'Unidad 3'
    }
  ];
  const students = [
    {
      value: 'valeria',
      label: 'valeria'
    },
    {
      value: 'martin',
      label: 'martin'
    },
    {
      value: 'juan',
      label: 'juan'
    }
  ];

  return (
    <>
      <Head>
        <title>
          Qualifications
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
                  Add Qualifications
                </Typography>
                
              </Stack>
              <TextField
                  fullWidth
                  label="Select course"
                  name="course"
                  onChange={handleChange}
                  required
                  select
                  defaultValue={estudentsData[0]}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.course}
                >
                  {[{label:"Kids",value:"Kids"},{label:"Junior",value:"Junior"},{label:"Teens",value:"Teens"},{label:"Pro",value:"Pro"}].map((option) => (
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
                  label="Select Level"
                  name="level"
                  onChange={handleChange}
                  required
                  select
                  defaultValue={estudentsData[0]}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.course}
                >
                  {[{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"}].map((option) => (
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
                  label="Select Student"
                  name="studentName"
                  onChange={handleChange}
                  required
                  select
                  defaultValue={estudentsData[0]}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.studentName}
                >
                  {estudentsData.map((option) => (
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
                  label="Select Unidad"
                  name="unidad"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.unity}
                >
                  {unity.map((option) => (
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
                  label="Competencia"
                  name="competencia"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.competencia}
                />
                <TextField
                  fullWidth
                  label="Actividad"
                  name="actividad"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.actividades}
                />
                 <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Habla
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 200, width: '100%' }}>
              
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        
      />
          
    </div>
    <Stack  spacing={1}>
                <Typography variant="h6">
                  {"Promedio "+"10pts"}
                </Typography>
               
              </Stack>
              <Stack  height={5}/>

          </Stack>
          <TextField
                  fullWidth
                  label="Item "
                  name="course"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:2,
                    marginBottom:2
                  }}
                  value={values.date}
                />
          <TextField
                  fullWidth
                  label="nota "
                  name="course"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.date}
                />
          <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Nota 
                </Button>
 
        </Container>
        
        <Stack  height={40}/>

        <Container  maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Escucha
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 200, width: '100%' }}>
              
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        
      />
    </div>
          </Stack>
          
    <Stack  spacing={1}>
                <Typography variant="h6">
                  {"Promedio "+"10pts"}
                </Typography>
               
              </Stack>
              <Stack  height={20}/>
              
          <TextField
                  fullWidth
                  label="Item "
                  name="course"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:2,
                    marginBottom:2
                  }}
                  value={values.date}
                />
          <TextField
                  fullWidth
                  label="nota "
                  name="course"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.date}
                />
          <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add Nota 
                </Button>
 
        </Container>
                     </div>
                     
             
            </Stack>
          
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
