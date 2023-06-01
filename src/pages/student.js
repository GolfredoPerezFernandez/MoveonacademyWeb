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
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Checkbox from '@mui/material/Checkbox';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  useMoralis } from 'react-moralis';
import { Magic } from "magic-sdk"
import { OAuthExtension } from '@magic-ext/oauth';
import {
    TextField,
} from '@mui/material';

const now = new Date();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Page = () => {
  
const top100Films = [
  { title: 'Ingles', valuesLenguage: 'Ingles' },
  { title: 'Italiano', valuesLenguage: 'Italiano' },
  { title: 'Español', valuesLenguage: 'Español' },
  { title: 'Aleman', valuesLenguage: 'Aleman' }, 
];
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
const procedence=[
  {
    label:"Instagram",
    value:"Instagram"
  },{
    label:"Facebook",
    value:"Facebook"
  },{
    label:"Twitter",
    value:"Twitter"
  }
]
const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'studentName', headerName: 'studentName', width: 200 },
  { field: 'studentEmail', headerName: 'studentEmail', width: 200 },

];
  const fetchData = async () =>{

    try{
      
  let rows2=[]
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });  
    const userMetadata = await magic.user.getMetadata();
  

    const query = new Moralis.Query("Students");
    await  query.equalTo("supportEmail",userMetadata.email)

      const object = await query.find();
   console.log("studiantes "+object)

    
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
        studiantes=[...studiantes,{
          id:object[i].attributes.uid,
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
  
  const [dateBirthday, setDateBirtday] = useState(null);

async function handleStudent(){
  const Student= Moralis.Object.extend("Students")
  const student= new Student()
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });
  const query = new Moralis.Query("Students");
  const count = await query.find();
  try {
    if(values.studentEmail!==""){
    query.equalTo("studentEmail",values.studentEmail)
    if(await query.first()){
      return 
    }
    const userMetadata = await magic.user.getMetadata();
    

    if(userMetadata){

      student.set("supportEmail",userMetadata.email)   
    
    } else{
      return
    }
    console.log("studentName ",values.studentName)

    if(values.studentName!==""){

      student.set("studentName",values.studentName)    
    
    } else{
      return
    }
    console.log("studentLastname ",values.studentLastname)

    if(values.studentLastname!==""){

      student.set("studentLastname",values.studentLastname)          
    
    }  else{
      return
    }
   
    console.log("studentID ",values.studentID)

if(values.studentID!==""){
  
    student.set("studentID",values.studentID)
    
}else{
  return
}
console.log(valuesLenguage)

console.log("valuesLenguage ",valuesLenguage)

if(valuesLenguage){
  student.set("teacherLenguage",valuesLenguage)

  
}else{
  return
}

console.log("teacherGender ",values.studentGender)

if(values.studentGender){
  student.set("teacherGender",values.studentGender)

  
}else{
  return
}
console.log("studentPhone ",values.studentPhone)


if(values.studentPhone){
  student.set("studentPhone",values.studentPhone)

} else {
  return
}
console.log("studentAlergies ",values.studentAlergies)


if(values.studentAlergies){
  student.set("studentAlergies",values.studentAlergies)

  
}else{
  return
}

console.log("dateBirthday ",dateBirthday)

if(dateBirthday){
  student.set("teacherBirthday",dateBirthday.toString())
 
}else{
  return
}
console.log("studentComments ",values.studentComments)

if(values.studentComments){
  student.set("studentComments",values.studentComments)
 
}else{
  return
}
console.log("studentDegree ",values.studentDegree)

if(values.studentDegree){
  student.set("studentDegree",values.studentDegree)
 
}else{
  return
}
console.log("studentCity ",values.studentCity)

if(values.studentCity){
  student.set("studentCity",values.studentCity)
 
}else{
  return
}
console.log("studentState ",values.studentState)

if(values.studentState){
  student.set("studentState",values.studentState)
 
} else{
  student.set("studentState","Inactivo")
}
console.log("studentInstitute ",values.studentInstitute)
if(values.studentInstitute){
  student.set("studentInstitute",values.studentInstitute)
 
}else{
  return
}

    student.set("uid",(count.length+1))
    console.log(" entro")
    await student.save()
    console.log(" entro2")

    setRowsStudents([...rowsStudents,{
      id:count.length+1,
      studentName:values.studentName,
      studentEmail:values.studentEmail,      
      teacherState:values.teacherState,
      
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
];{
  
}
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
const [valuesLenguage, setValueLenguage] = useState("Ingles")

const [date, setDate] = useState(null);

  useEffect(()=>{
    fetchData()
},[]);
  const [values, setValues] = useState({
    studentName: '',
    studentEmail: '', 
    studentProcedence: '', 
    studentLastname: '', 
    course: '',
    studentGender:"",
    level: '',
    studentID: '',
    studentAlergies: '',
    procedencia: '',
    studentState:"",
    studentComments: '',
    studentPhone: '',
    studentDegree: '',


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
                  name="studentLastname"
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
                  name="studentGender"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.studentGender}
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
                  name="studentID"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.studentID}
                />
                 <TextField
                  fullWidth
                  label="Student City"
                  name="studentCity"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.studentCity}
                />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Nacimiento"
value={dateBirthday}
onChange={(newValue) => setDateBirtday(newValue)}
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
                name="studentPhone"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.studentPhone}
              />
                 <TextField
                fullWidth
                label="Alergias"
                name="studentAlergies"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.studentAlergies}
              />
               <TextField
                fullWidth
                label="Comentarios"
                name="studentComments"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.studentComments}
              /> 
              <TextField
              fullWidth
              label="Nivel Academico"
              name="studentDegree"
              onChange={handleChange}
              required
              style={{
                marginTop:10,
                marginBottom:10
              }}
              value={values.studentDegree}
            />  
              <TextField
            fullWidth
            label="Instituto"
            name="studentInstitute"
            onChange={handleChange}
            required
            style={{
              marginTop:10,
              marginBottom:10
            }}
            value={values.studentInstitute}
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
                  label="Procedence"
                  name="studentProcedence"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.studentProcedence}
                >
                  {procedence.map((option) => (
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
                  name="studentState"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.studentState}
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
