import { useState, useRef, useEffect } from "react";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  Button,
  Tabs,
  Tab,
  Paper,
  Typography,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "./TabPanel";
import {
  DirectionsSharp,
  BubbleChartSharp,
  ShowChartSharp,
  VisibilitySharp,
  VisibilityOffSharp,
} from "@material-ui/icons";

import readFileRequest from "../helper/fileRequests";
import getPathRequest from "../helper/pathRequest";

const Form = ({ state, setter }) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [value, setValue] = useState(0);

  const fileRef = useRef();

  const theme = useTheme();

  const handleFile = async () => {
    const file = fileRef.current.files[0];
    const data = await readFileRequest(file);
    console.log(data);
    setter.setNodes(data.nodes);
    setter.setLines(data.neighbors);
    setter.setFilename(file.name);
  };

  const findPath = async () => {
    if (start && end) {
      const data = await getPathRequest(state.filename, start, end);
      console.log(data);
      setter.setPaths(data.paths);
    }
  };

  useEffect(() => {
    const pathNames = state.paths.map((path) => path.node);
    setter.setNodes(
      state.nodes.map((node) =>
        pathNames.includes(node.name)
          ? { ...node, content: state.paths[pathNames.indexOf(node.name)].cost }
          : node
      )
    );
  }, [state.paths]);

  return (
    <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
      <Grid item xs={12}>
        <Card elevation={3} alignContent="flex-start">
          <CardHeader
            title="Pencarian Lintasan Terpendek"
            subheader="Sebuah implementasi algoritma A*"
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="start-label">Source Node</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="start-label"
                    id="demo-simple-select"
                    onChange={(e) => setStart(e.target.value)}
                  >
                    {state.nodes.map((node) => (
                      <MenuItem value={node.name}>{node.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="end-label">Destination Node</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="end-label"
                    id="end"
                    onChange={(e) => setEnd(e.target.value)}
                  >
                    {state.nodes.map((node) => (
                      <MenuItem value={node.name}>{node.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl>
                  <Button
                    style={{ marginTop: 10 }}
                    variant="outlined"
                    onClick={findPath}
                  >
                    Find Path
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={12} align="flex-start">
                <input
                  type="file"
                  ref={fileRef}
                  encType="multipart/form"
                  onChange={handleFile}
                  hidden
                />
                <div style={{ display: "flex" }}>
                  <Button
                    variant="outlined"
                    onClick={() => fileRef.current.click()}
                  >
                    load graph
                  </Button>
                  <Typography style={{ paddingLeft: 20, paddingTop: 10 }}>
                    {state.filename === ""
                      ? "No file selected"
                      : state.filename}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Paper square elevation={3}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, val) => setValue(val)}
            aria-label="disabled tabs example"
          >
            <Tab icon={<DirectionsSharp />} label="Path" />
            <Tab icon={<BubbleChartSharp />} label="Nodes" />
            <Tab icon={<ShowChartSharp />} label="Edges" />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={(index) => setValue(index)}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Table aria-label="path-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Step </TableCell>
                    <TableCell>Current Node</TableCell>
                    <TableCell>Cumulative Cost (m)</TableCell>
                    <TableCell>View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.paths.map((path, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell component="th" scope="row">
                        {path.node}
                      </TableCell>
                      <TableCell>
                        {Math.round(path.cost * 1000) / 1000}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            setter.setNodes(
                              state.nodes.map((node) =>
                                node.name === path.node
                                  ? { ...node, showInfo: !node.showInfo }
                                  : node
                              )
                            )
                          }
                        >
                          {state.nodes.filter(
                            (node) => node.name === path.node
                          )[0].showInfo ? (
                            <VisibilitySharp />
                          ) : (
                            <VisibilityOffSharp />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Table aria-label="node-table">
                <TableHead>
                  <TableRow>
                    <TableCell>No. </TableCell>
                    <TableCell>Node Name</TableCell>
                    <TableCell>Longitude (deg)</TableCell>
                    <TableCell>Lattitude (deg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.nodes.map((node, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {node.name}
                      </TableCell>
                      <TableCell>{node.position.lng}</TableCell>
                      <TableCell>{node.position.lat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Table aria-label="vertices-table">
                <TableHead>
                  <TableRow>
                    <TableCell>No. </TableCell>
                    <TableCell>Src. Node</TableCell>
                    <TableCell>Dest. Node</TableCell>
                    <TableCell>Est. Distance (m)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.lines.map((line, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {line.rel[0]}
                      </TableCell>
                      <TableCell>{line.rel[1]}</TableCell>
                      <TableCell>
                        {Math.round(line.distance * 1000) / 1000}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Form;
