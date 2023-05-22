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
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Checkbox from '@mui/material/Checkbox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const now = new Date();
const top100Films = [
  { title: 'Ingles', valuesLenguage: 'Ingles' },
  { title: 'Italiano', valuesLenguage: 'Italiano' },
  { title: 'Español', valuesLenguage: 'Español' },
  { title: 'Aleman', valuesLenguage: 'Aleman' }, 
];
const Page = () => {
  var [courses,setCourses]=useState([])
  var [count,setCount]=useState([])

  var [rowsCourse,setRowsCourse]=useState([])
const {Moralis}=useMoralis()

const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'teacherName', headerName: 'teacherName', width: 200 },
  { field: 'teacherEmail', headerName: 'teacherEmail', width: 200 },

];

const columnsDate = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'date', headerName: 'date', width: 500 },
 
];

var [dateDisponibilidad,setDateDisponibilidad]=useState(null) 

var [rowsDate,setRowsDate]=useState([])
 var [countDisponibilidad,setCountDisponibilidad]=useState(0) 

function handleDateDisponibilidad(){  
  setRowsDate([...rowsDate,{
   id:countDisponibilidad,
   date:new Date(dateDisponibilidad.$d).toISOString(),
  }])
  setCountDisponibilidad(countDisponibilidad+1)
}
  const fetchData = async () =>{

    try{
      
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });  
    const userMetadata = await magic.user.getMetadata();
  

    const query2 = new Moralis.Query("Teachers");
    await  query2.equalTo("supportEmail",userMetadata.email)

      const object = await query2.find();
    console.log("object "+object)
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
          studiantes=[...studiantes,{
          id:object[i].attributes.uid,
          teacherName:object[i].attributes.teacherName,
          teacherEmail:object[i].attributes.teacherEmail,      
           }]
      }
      setRowsStudents([...studiantes])

      
    } 
    catch(err){
      console.log(err);
    }
  
  }
  
  
async function handleTeacher(){
  const Student= Moralis.Object.extend("Teachers")
  const student= new Student()
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });
  const query = new Moralis.Query("Teachers");
  const count = await query.find();
  try {
    if(values.teacherEmail!==""){
    query.equalTo("teacherEmail",values.teacherEmail)
    if(await query.first()){
      return 
    }
    const userMetadata = await magic.user.getMetadata();
    

    if(userMetadata){

      student.set("supportEmail",userMetadata.email)   
    
    } else{
      return
    }

    if(values.teacherName!==""){

      student.set("teacherName",values.teacherName)    
    
    } else{
      return
    }

    if(values.teacherLastname!==""){

      student.set("teacherLastname",values.teacherLastname)          
    
    }  else{
      return
    }

if(values.teacherRif!==""){
  
    student.set("teacherRif",values.teacherRif)
    
}else{
  return
}


if(valuesLenguage){
  student.set("teacherLenguage",valuesLenguage)

  
}else{
  return
}

if(values.teacherID){
  student.set("teacherID",values.teacherID)

  
}else{
  return
}

if(values.teacherCity){
  student.set("teacherCity",values.teacherCity)

  
}else{
  return
}


if(values.teacherDegree){
  student.set("teacherDegree",values.teacherDegree)

} else {
  return
}


if(values.teacherInstitute){
  student.set("teacherInstitute",values.teacherInstitute)

  
}else{
  return
}


if(dateBirthday){
  student.set("teacherBirthday",dateBirthday.toString())
 
}else{
  return
}

if(values.teacherPhone){
  student.set("teacherPhone",values.teacherPhone)
 
}else{
  return
}

if(values.teacherAlergias){
  student.set("teacherAlergias",values.teacherAlergias)
 
}else{
  return
}

if(values.teacherEmail){
  student.set("teacherEmail",values.teacherEmail)
 
}else{
  return
}
if(values.teacherComments){
  student.set("teacherComments",values.teacherComments)
 
}else{
  return
}

if(values.teacherQualificationMOA){
  student.set("teacherQualificationMOA",values.teacherQualificationMOA)
 
}else{
  return
}

if(valuesLenguage){
  student.set("teacherLenguages",valuesLenguage)
 
}else{
  return
}


if(rowsDate.length>1){
  let dates2=[]
  for(let i=0;i<rowsDate.length;rowsDate++){
    dates2=[...dates2,rowsDate[i].date.toString()]
  }

  student.set("teacherAvaliableTimes",dates2)
 
}else{
  return
}

if(dateContractStart){
  student.set("teacherContractStart",dateContractStart.toString())
 
}else{
  return
}

if(dateContractEnd){
  student.set("teacherContractEnd",dateContractEnd.toString())
 
}else{
  return
}

if(values.teacherGender){
  student.set("teacherGender",values.teacherGender)
 
}else{
  return
}

if(values.teacherState){
  student.set("teacherState",values.teacherState)
 
} else{
  student.set("teacherState","Inactivo")
}
    student.set("uid",(count.length+1))
    console.log(" entro")
    await student.save()
    console.log(" entro2")

    setRowsStudents([...rowsStudents,{
      id:count.length+1,
      teacherName:values.teacherName,
      teacherAlergias:values.teacherAlergias,
      teacherBirthday:dateBirthday,
      teacherCity:values.teacherCity,
      teacherComments:values.teacherComments,
      teacherInstitute:values.teacherInstitute,
      teacherID:values.teacherID,
      teacherEmail:values.teacherEmail,      
      teacherGender:values.teacherGender,  
      teacherDegree:values.teacherDegree,
      teacherLenguages:valuesLenguage,
      teacherQualificationMOA:values.teacherQualificationMOA,
      teacherPhone:values.teacherPhone,
      teacherRif:values.teacherRif,
      teacherState:values.teacherState,
      teacherAvaliableTime:dateDisponibilidad

     }])
  }}catch(e){
    console.log("error",e.message)
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
    value: 'Ingles',
    label: 'Ingles'
  },
  {
    value: 'Italiano',
    label: 'Italiano'
  },
  {
    value: 'Aleman',
    label: 'Aleman'
  },
  {
    value: 'Español',
    label: 'Español'
  },
  {
    value: 'Frances',
    label: 'Frances'
  }
];
var [rowsStudents,setRowsStudents]=useState([])
const [dateBirthday, setDateBirtday] = useState(null);
const [dateContractStart, setContractStart] = useState(null);
const [dateContractEnd, setContractEnd] = useState(null);

const [date, setDate] = useState(null);
const [date2, setDate2] = useState(null);

const [date3, setDate3] = useState(null);
  useEffect(()=>{
    fetchData()
},[]);

const [valuesLenguage, setValueLenguage] = useState("Ingles")

  const [values, setValues] = useState({
    teacherName: '',
    teacherEmail: '', 
    teacherLastname: '', 
    courseName: '',
    courseLevel: '',
    rif: '',
    instituto:"",
    teacherID: '',
    teacherGender:"",
    titulo: '',
    nacimiento: '',
    teacherLenguages: [],
    teacherAlergias: '',
    teacherInstitute: '',
    teacherCity:"",
    teacherContractEnd:"",
    teacherQualificationMOA:"",
    teacherContractStart:"",
    teacherBirthday:"",
    teacherState:"",
    teacherComments: '',
    teacherPhone: '',
    teacherDegree: '',
  });

  const handleChange = useCallback(
    (event) => {
      console.log(event.target.name)
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
          Teachers
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
                  name="teacherLastname"
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
                  name="teacherGender"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.teacherGender}
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
                  name="teacherRif"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherRif}
                />
              <TextField
                  fullWidth
                  label="Teacher ID"
                  name="teacherID"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherID}
                />
                 <TextField
                  fullWidth
                  label="Ciudad de Origen"
                  name="teacherCity"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherCity}
                />
                
                <TextField
                  fullWidth
                  label="Titulo"
                  name="teacherDegree"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherDegree}
                />
                  <TextField
                  fullWidth
                  label="Instituto donde se graduo"
                  name="teacherInstitute"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.teacherInstitute}
                />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Nacimiento"
value={date}
onChange={(newValue) => setDateBirtday(newValue)}
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
                name="teacherPhone"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.teacherPhone}
              />
                 <TextField
                fullWidth
                label="Alergias"
                name="teacherAlergias"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.teacherAlergias}
              />
               <TextField
                fullWidth
                label="Comentarios"
                name="teacherComments"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.teacherComments}
              /> 
               <TextField
                fullWidth
                label="Calificacion perfil MOA"
                name="teacherQualificationMOA"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.teacherQualificationMOA}
              /> 
              <Autocomplete
      multiple

      id="checkboxes-tags-demo"

      options={top100Films}
      
      name="valuesLenguage"


      onChange={(event, newValue) => {
        console.log(newValue)
        setValueLenguage(newValue);
      }}

      disableCloseOnSelect

      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}

      style={{ width: 500 }}

      renderInput={(params) => (
        <TextField {...params} label="Teacher Lenguages" placeholder="Idiomas" />
      )}

    />      
    <TextField
                      fullWidth
                      label="Select State"
                      name="teacherState"
                      onChange={handleChange}
                      required
                      select
                      
                      style={{
                        paddingTop:6,
                        marginBottom:10
                      }}
                      SelectProps={{ native: true }}
                      value={values.teacherState}
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


                <Grid container  style={{direction:"row",width:"100%",marginTop:10,marginBottom:10}}>
               
               <Grid container  style={{direction:"row",width:"30%",marginTop:10,marginBottom:10}}>
          
         <Typography variant="h6">
               Disponibilidad
           </Typography>
               <Box style={{marginTop:10,marginBottom:10}} >

                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                      label="Disponibilidad Horaria"
                      value={dateDisponibilidad}
                      onChange={(newValue) => setDateDisponibilidad(newValue)}
                      />  
                    </LocalizationProvider>
   
   
</Box>
   <Button 
   style={{marginTop:5,marginLeft:5,height:70,width:120}}
                 startIcon={(
                   <SvgIcon fontSize="small">
                     <PlusIcon />
                   </SvgIcon>
                 )}
                 onClick={handleDateDisponibilidad}
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
         
               
                <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Contratacion"
value={dateContractStart}
onChange={(newValue) => setContractStart(newValue)}
/>    </LocalizationProvider>

<LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Finalizacion"
value={dateContractEnd}
onChange={(newValue) => setContractEnd(newValue)}
/>    </LocalizationProvider>
               
              </div>
            </Stack>
            <Button    
                  onClick={handleTeacher}
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
