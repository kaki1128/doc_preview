import React from "react";
import { Button, Grid, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./DocTemplate/Preview";
import Setting from "./DocTemplate/Setting";

function App() {

    return (
        <Router>
            <Toolbar>
                <Grid container spacing={6}>
                    <Grid item>
                        <Button href="/"><b>Preview</b></Button>
                    </Grid>
                    <Grid item>
                        <Button href="/preview"><b>Preview</b></Button>
                    </Grid>
                </Grid>
            </Toolbar>
            <Routes>
                <Route exact path="/" element={<Setting />} />
                <Route exact path="/preview" element={<Preview />} />
            </Routes>
        </Router >
    )
}

export default App;