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
import Autocomplete from '@mui/material/Autocomplete';

import PropTypes from 'prop-types';
import useAutocomplete from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
const now = new Date();
import Chip from '@mui/material/Chip';

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
      
      const query2 = new Moralis.Query("Unities");
      const query = new Moralis.Query("Programs");
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });        
   const userMetadata = await magic.user.getMetadata();

       query2.equalTo("supportEmail",userMetadata.email)
       const object2 = await query2.find();

  

      query.equalTo("supportEmail",userMetadata.email)

      const object = await query.find();
       let courses=[]
     
      console.log("supportEmail "+JSON.stringify(object2))
      for(let i=0;i<object2.length;i++){
        setLevels([...levels,{
          label:object2[i].attributes.unityName,
          value:object2[i].attributes.uid
        }])
        }

      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          programName:object[i].attributes.programName,
          programDescription:object[i].attributes.programDescription,   
          programLevel:object[i].attributes.programLevel,
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
    date:date.$d.toString(),
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


async function handleProgram(){

      

  if(values.programName!==""){
  const Courses=Moralis.Object.extend("Programs")

  const course=new Courses()

  const query = new Moralis.Query("Programs");

  const count = await query.find();

    query.equalTo("programName",values.programName)
    
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
    course.set("programName",values.programName)       
    course.set("programDescription",values.programDescription)       
    course.set("supportEmail",userMetadata.email)       
    course.set("unities",value)   

    course.set("programLevel",values.programLevel)   
    course.set("uid",(count.length+1))

    
    await course.save()

   
    setRowsCourse([...rowsCourse,{
      id:count.length+1,
      programName:values.programName,
      programDescription:values.programDescription,
      programLevel:values.programLevel,
     }])


  }



}
let fixedOptions=[]
const [value, setValue] = useState([...fixedOptions]);
const [levels, setLevels] = useState([]);


  const [values, setValues] = useState({
    programName:"",
    programDescription: '',
    programLevel:"",
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

  const levelsValues = [
    { label: 'Kids', value: 'Kids' },    
    { label: 'Junior', value: 'Junior' },
    { label: 'Teens', value: 'Teens' },

    { label: 'Pro', value: 'Pro' },


  ];

  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'programName', headerName: 'programName', width: 200 },

    { field: 'programLevel', headerName: 'programLevel', width: 200 },

    { field: 'programDescription', headerName: 'programDescription', width: 200 },
  ];
  var [rows,setRows]=useState([])
  var [rowsDate,setRowsDate]=useState([]) 
   var [rowsUnidad,setRowsUnidad]=useState([])
   var [rowsCourse,setRowsCourse]=useState([])

  return (
    <>
      <Head>
        <title>
          Programs 
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
                Add New Program
        
              </Typography>
              <TextField
                  fullWidth
                  label="Program Name"
                  name="programName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.programName}
                />
                 
              
                <TextField
                  fullWidth
                  label="Program Description"
                  name="programDescription"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.programDescription}
                />   <TextField
                fullWidth
                label="Select Level"
                name="programLevel"
                onChange={handleChange}
                required
                select
                defaultValue={"Kids"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.programLevel}
              >
                {levelsValues.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>

              <Autocomplete
  multiple
  id="fixed-tags-demo"
  value={value}
  onChange={(event, newValue) => {
    setValue([
      ...fixedOptions,
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ]); 
  }}
  options={levels}
  getOptionLabel={(option) => option.label}
  renderTags={(tagValue, getTagProps) =>
    tagValue.map((option, index) => (
      <Chip
        label={option.label}
        {...getTagProps({ index })}
        disabled={fixedOptions.indexOf(option) !== -1}
      />
    ))
  }
  style={{ width: 500 }}
  renderInput={(params) => (
    <TextField {...params} label="Unities" placeholder="Unities" />
  )}
/>
             

              </div>
              
            
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleProgram}
                  variant="contained"
                >
                  Add Program
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
                  Programs
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

