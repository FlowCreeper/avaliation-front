import { Box, Paper } from "@mui/material";

export default function Rfc() {
  return (
    <Box height="90.9vh" alignContent="center">
      <Paper sx={{ width: "fit-content", margin: "auto", paddingLeft: 1, paddingRight: 1, background: "rgb(42, 42, 42)", color: "rgb(200,200,200)" }}>
        <pre>
          <code>
{`+---------------------------------------------------------------+
|                         HTTP/1.1 Message                      |
+---------------------------------------------------------------+
|                         Start-Line                            |
|  (Request-Line or Status-Line)                                |
+---------------------------------------------------------------+
|                         Header Fields                         |
|  (0 or more header fields)                                    |
+---------------------------------------------------------------+
|                                                               |
|                         Message Body                          |
|  (optional, based on the request or response)                 |
|                                                               |
+---------------------------------------------------------------+`}
          </code>
        </pre>
      </Paper>
    </Box>
  );
}
