'use client'

import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function Backbone() {
  const [flipped, setFlipped] = useState(false)
  return(
    <Box height='90.9vh' alignContent="center">
      <img src={flipped ? "/Backbone.jpg" : "https://www.targetso.com/wp-content/uploads/2017/03/HierarquiaRedes.png"} style={{ margin: "auto", display: "block" }} />
      <Box margin="2vw" position="absolute" right={0} bottom={0}  >
        <Button variant="outlined" onClick={() => setFlipped(!flipped)}>Flip</Button>
      </Box>
    </Box>
  )
}