import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import Countries from "./components/Countries";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortBy from "./components/SortBy";
import Select from "react-select";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [OGData, setOGData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickCountry, setPickCountry] = useState(false);
  const [pickRegion, setPickRegion] = useState(false);
  const [down, setDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState("Name");
  const [recordsPerPage] = useState(10);
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data?.length / recordsPerPage);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => {
        setData(res?.data);
        setOGData(res?.data);
        setLoading(false);
      })
      .catch(() => {
        alert("There was an error while retrieving the data");
      });
  }, []);

  const options = data?.map((c) => ({ value: c?.area, label: c?.name }));
  const optionsR = [{value:"Americas", label:"Americas"}, {value:"Africa", label:"Africa"}, {value:"Europe", label:"Europe"}, {value:"Oceania", label:"Oceania"}, {value:"Asia", label:"Asia"}];
  const handleChange = (e, v) => {
    setCurrentPage(v);
  };
  console.log(data);
  const sortName = () =>{
    setData(OGData?.sort((a, b) => (down?a?.name?.localeCompare(b.name):b?.name?.localeCompare(a.name))));
 }
 const sortRegion = (region) =>{
  setData(OGData?.filter((c) => (c.region === region)));
}
const sortArea = (area) =>{
  setData(OGData?.filter((c) => down? (Number(c.area) - Number(area) >0):(Number(c.area) - Number(area) <0)));
  console.log(OGData);
}
  const order = () =>{
    switch (currentSort) {
        case "Name":
            sortName();
            break;
            case "Area":
            sortArea();
            break;
        default:
            break;
    }
   }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Grid Container>
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
            <SortBy
              data={data}
              setData={setData}
              setPickCountry={setPickCountry}
              setPickRegion={setPickRegion}
              down={down}
              setCurrentSort={setCurrentSort}
              order={order}
            />
            
              {pickCountry && (
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width:"200px",
                      marginLeft:10,
                      marginRight:10
                    }),
                  }}
                  options={options}
                  onChange={(e)=>(sortArea(e.value))}
                />
              )}
              {pickRegion && (
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width:"200px",
                      marginLeft:10,
                      marginRight:10
                    }),
                  }}
                  options={optionsR}
                  onChange={(e)=>(sortRegion(e.value))}
                />
              )}
        
            <IconButton onClick={() => (setDown(!down),order())}>
              {down ? (
                <Box display={"flex"}>
                  <Typography>Ascending</Typography>
                  <KeyboardDoubleArrowUpIcon />
                </Box>
              ):
              (
                <Box display={"flex"}>
                  <Typography>Descending</Typography>
                  <KeyboardDoubleArrowDownIcon />
                </Box>
              ) }
            </IconButton>
          </Box>
          <Box></Box>
        </Grid>
        <Grid item container xs={12}>
          {currentRecords.map((c, i) => {
            return <Countries key={i} c={c} />;
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Pagination page={currentPage} count={nPages} onChange={handleChange} />
      </Grid>
      <Typography variant="h1" fullwidth textAlign={"center"}>
        Teeeeez taloooooon
      </Typography>
    </Container>
  );
}

export default App;
