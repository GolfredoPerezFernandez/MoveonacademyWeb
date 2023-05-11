import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as PageLayout } from 'src/layouts/dashboard/layout';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {  useEffect } from 'react';
import {  useMoralis } from 'react-moralis';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

import {
  Button,SvgIcon,
  TextField,
} from '@mui/material';
const now = new Date();


import { useCallback, useState } from 'react';


const Access = () => {
  
const {Moralis}=useMoralis()
var [rows,setRows]=useState([])
const fetchData = async () =>{

  try{
    
let rows2=[]

    const query = new Moralis.Query("Moderators");
    const object = await query.find();
    for(let i=0;i<object.length;i++){
      rows2=[...rows2,{
        id:object[i].attributes.uid,
        email:object[i].attributes.email,
        city:object[i].attributes.city
      
      }]
        
    }
    setRows(rows2)
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
const router = useRouter()

function handleOnClickCell(event){
console.log(event.row.id)
router.push({
  pathname: '/teachers',
  query: { uid: event.row.id }
})
}
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

  const [values, setValues] = useState({
 
    email: '',
    city: '',
  });
  async function addTeacher(){
      const Teacher=Moralis.Object.extend("Moderators")
      const teacher=new Teacher()

      const query = new Moralis.Query("Moderators");
      const count = await query.find();
      if(values.email!==""){
        query.equalTo("email",values.email)
        if(await query.first()){
          return 
        }
        let rows2=[]
        teacher.set("email",values.email)
        if(values.city==""){

          teacher.set("city","merida")
        }else{
          
        teacher.set("city",values.city)
        
        }
        teacher.set("uid",(count.length+1))
        await teacher.save()
        rows2=[...rows,{
          id:count.length+1,
          email:values.email,
          city:values.city==""?"merida":values.city
        
        }]

      setValues({email:"",city:""})  
     
      setRows(rows2)

      }

    }
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
 return <>
    <Head>
      <title>
       Admin Access
      </title>
    </Head>
    
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Moderators Permissions
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
                <Grid
                xs={12}
                md={6}
              >
              <Typography variant="h6">
                Add New Moderator
              </Typography>
                <TextField
                  fullWidth
                  label="Moderator Email"
                  name="email"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.email}
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
      <Button 
      onClick={addTeacher}
      disabled={values.email==""}
      style={{marginTop:20}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
          
            </Grid>
          </div>
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
                  Teachers
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        
      />
    </div>
          </Stack>
        </Container>
      </Box>
    </Box>
  </>
};

Access.getLayout = (access) => (
  <PageLayout>
    {access}
  </PageLayout>
);

export default Access;
