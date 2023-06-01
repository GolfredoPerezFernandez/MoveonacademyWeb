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
  const [teachers,setTeachers]=useState([])

  
  const fetchData = async () =>{
    try{
      const query = new Moralis.Query("Unities");
      const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
        extensions: [new OAuthExtension()],
      });  
      const userMetadata = await magic.user.getMetadata();
        query.equalTo("supportEmail",userMetadata.email)

      const object = await query.find();
        console.log(JSON.stringify(object))
       let courses=[]
      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          unityName:object[i].attributes.unityName,
          unityDescription:object[i].attributes.unityDescription,   
          unityLevel:object[i].attributes.unityLevel,

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



async function handleUnity(){

      

  if(values.courseName!==""){
  const Courses=Moralis.Object.extend("Unities")

  const course=new Courses()

  const query = new Moralis.Query("Unities");

  const count = await query.find();

    query.equalTo("unityName",values.courseName)
    
    if(await query.first()){
      return 
    }

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

    const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
      extensions: [new OAuthExtension()],
    });   
    const userMetadata = await magic.user.getMetadata();
    course.set("unityName",values.unityName)       
    course.set("unityDescription",values.unityDescription)       
    course.set("unityCompetencia",values.unityCompetence)    
    course.set("unityGramatica",values.unityGramatica)    
    course.set("unityDestrezas",values.unityAbilities)        
    course.set("supportEmail",userMetadata.email)     
    course.set("unityExplorar",values.unityExplorer)       
    course.set("unityLevel",values.unityLevel)       

    course.set("uid",(count.length+1))

    
    await course.save()

    setRowsCourse([...rowsCourse,{
      id:count.length+1,
      unityName:values.unityName,
      unityDescription:values.unityDescription,
      unityLevel:values.unityLevel,
     }])


  }



}
  const [values, setValues] = useState({
    unityName:"",
    unityDescription: '',
    teacherEmail: '',
    unityExplorer: '',
    unityAbilities: '',
    unityGramatica: '',
    unityCompetence: '',
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

  const levels = [
    {
      value: 'Kids',
      label: 'Kids (4 a 7 años)'
    },
    {
      value: 'Junior',
      label: 'Junior (8 a 12 años)'
    },
    {
      value: 'Teens',
      label: 'Teens (12 a 18 años)'
    },
    {
      value: 'Pro',
      label: 'Pro (18 años o mas)'
    },
  ];
  
  const states = [
    {
      value: 'Merida',
      label: 'Merida'
    },
    {
      value: 'SanCristobal',
      label: 'San Cristobal'
    },
    {
      value: 'Caracas',
      label: 'Caracas'
    }
  ];
  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'unityName', headerName: 'unityName', width: 200 },

    { field: 'unityLevel', headerName: 'unityLevel', width: 200 },

    { field: 'unityDescription', headerName: 'unityDescription', width: 200 },
  ];
  var [rowsDate,setRowsDate]=useState([]) 
   var [rowsUnidad,setRowsUnidad]=useState([])
   var [rowsCourse,setRowsCourse]=useState([])

  return (
    <>
      <Head>
        <title>
          Unities 
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
                Add New Unities
        
              </Typography>
              <TextField
                  fullWidth
                  label="Unity Name"
                  name="unityName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityName}
                />
                 
              
                <TextField
                  fullWidth
                  label="Unity Description"
                  name="unityDescription"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityDescription}
                /> 

<TextField
                  fullWidth
                  label="Competencia"
                  name="unityCompetence"
                  onChange={handleChange}
                  required
                  
                  multiline
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityCompetence}
                /> 
                

                <TextField
                  fullWidth
                  label="Gramatica y vocabulario"
                  name="unityGramatica"
                  onChange={handleChange}
                  multiline
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityGramatica}
                /> 
              <TextField
                  fullWidth
                  label="Destrezas"
                  name="unityAbilities"
                  onChange={handleChange}
                  multiline
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityAbilities}
                /> 
                  <TextField
                  fullWidth
                  label="Explorar"
                  name="unityExplorer"
                  onChange={handleChange}
                  multiline
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.unityExplorer}
                /> 
              </div>
              <TextField
                  fullWidth
                  label="Select Level"
                  name="unityLevel"
                  onChange={handleChange}
                  required
                  select
                  defaultValue={"Kids"}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.unityLevel}
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
            
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleUnity}
                  variant="contained"
                >
                  Add Unity
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
                  Unities
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        rows={rowsCourse}
        columns={columnsCourse}
        
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
