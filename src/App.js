import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import Countries from "./components/Countries";
import NavBar from "./components/NavBar";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import SortBy from "./components/SortBy";
import Select from "react-select";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [OGData, setOGData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickCountry, setPickCountry] = useState(false);
  const [pickRegion, setPickRegion] = useState(false);
  const [pickedCountry, setPickedCountry] = useState({label:"Lithuania", value: 65300});
  const [pickedRegion, setPickedRegion] = useState("Europe");
  const [down, setDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState("Name");
  const [recordsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = searchedData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(searchedData?.length / recordsPerPage);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => {
        setData(res?.data);
        setSearchedData(res?.data);
        setOGData(res?.data);
        setLoading(false);
      })
      .catch(() => {
        alert("There was an error while retrieving the data");
      });
  }, []);

  const options = OGData?.map((c) => ({ value: c?.area, label: c?.name }));
  const optionsR = [
    { value: "Americas", label: "Americas" },
    { value: "Africa", label: "Africa" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
    { value: "Asia", label: "Asia" },
  ];
  const handleChange = (e, v) => {
    setCurrentPage(v);
  };

  useEffect(() => {
    const sortArea = (selectedCountry) => {
      if (selectedCountry?.label) {
        setData([
          ...OGData?.filter((c) => c.area === selectedCountry?.value),
          ...OGData?.filter((c) => {
            if (down) {
              return Number(selectedCountry?.value) > Number(c?.area);
            } else {
              return Number(c?.area) > Number(selectedCountry?.value);
            }
          }).sort((a, b) => {
            return a.area - b.area;
          }),
        ]);
      } else {
        setData([]);
      }
    };
    const sortName = () => {
      if (!OGData) return;

      const sortedData = [...OGData].sort((a, b) => {
        const nameA = a?.name?.charAt(0);
        const nameB = b?.name?.charAt(0);

        return down
          ? nameB?.localeCompare(nameA) || -1
          : nameA?.localeCompare(nameB) || 1;
      });

      setData(sortedData);
    };
    const sortRegion = (region) => {
      setData(OGData?.filter((c) => c?.region === region));
    };
    const order = () => {
      switch (currentSort) {
        case "Name":
          sortName();
          console.log("7abibi");
          break;
        case "Area":
          sortArea(pickedCountry);
          break;
        case "Region":
          sortRegion(pickedRegion);
          break;
        default:
          break;
      }
    };
    order();
  }, [pickedRegion, pickedCountry, OGData, down, currentSort]);

  const handleSearch = (e) => {
    setSearchInput(e?.target?.value);
  };
  useEffect(() => {
    setSearchedData(
      data.filter((c) =>
        c?.name?.toLowerCase()?.trim()?.includes(searchInput?.toLowerCase()?.trim())
      )
    );
  }, [searchInput,data]);

  useEffect(() => {
    setSearchInput("");
    setSearchedData(data);
  }, [data]);


  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <CssBaseline />
      <NavBar />
      {loading? <Box width={"100%"} height={"80vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}><CircularProgress /></Box>:
      <Grid Container>
        <Grid item container spacing={2} xs={12}>
          <Grid item>
            <SortBy
              data={data}
              setData={setData}
              setPickCountry={setPickCountry}
              setPickRegion={setPickRegion}
              setCurrentSort={setCurrentSort}
              currentSort={currentSort}
            />
          </Grid>

          {pickCountry && (
            <Grid item>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "200px",
                  }),
                }}
                options={options}
                defaultInputValue="Lithuania"
                onChange={(e) => setPickedCountry(e)}
              />
            </Grid>
          )}

          {pickRegion && (
            <Grid item>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "200px",
                    marginLeft: 10,
                    marginRight: 10,
                  }),
                }}
                options={optionsR}
                defaultInputValue="Europe"
                onChange={(e) => setPickedRegion(e?.value)}
              />
            </Grid>
          )}

          {((currentSort === "Area" && pickedCountry?.label) ||
            currentSort === "Name") && (
            <Grid item>
              <IconButton color="primary" onClick={() => setDown(!down)}>
                {down ? (
                  <Box display={"flex"}>
                    <Typography>
                      {currentSort === "Area"
                        ? `Smaller than ${pickedCountry?.label}`
                        : "Descending"}
                    </Typography>
                    <KeyboardDoubleArrowDownIcon />
                  </Box>
                ) : (
                  <Box display={"flex"}>
                    <Typography>
                      {currentSort === "Area"
                        ? `Larger than ${pickedCountry?.label}`
                        : "Ascending"}
                    </Typography>
                    <KeyboardDoubleArrowUpIcon />
                  </Box>
                )}
              </IconButton>
            </Grid>
          )}
          <Grid item xs>
            <Input
              value={searchInput}
              fullWidth
              onChange={handleSearch}
              placeholder="search"
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {currentRecords?.length >0? currentRecords?.map((c, i) => {
            return (
             
                <Countries key={i} c={c} />
             
            );
          }):
          <Grid item xs={12}>
          <Typography width={"100%"} textAlign={"center"} my={2} variant="h5">No countries found.</Typography>
          </Grid>
          }
        </Grid>

        <Grid item xs={12} mt={2} display={"flex"} justifyContent={"center"}>
          <Pagination
            color="primary"
            size="large"
            page={currentPage}
            count={nPages}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      }
    </Container>
      
  );
}

export default App;
