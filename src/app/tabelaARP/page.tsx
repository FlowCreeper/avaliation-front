'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

type ArpEntry = {
  ip: string;
  mac: string;
};

export default function ArpTablePage() {
  const [arpTable, setArpTable] = useState<ArpEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArpTable = async () => {
      try {
        const response = await fetch('http://localhost:5000/network/arp');
        const data = await response.json();

        // Tratamento da saída do comando `arp -a`
        const entries = data.output
          .split('\n')
          .filter((line: string) => line.includes('.'))
          .map((line: string) => {
            const parts = line.trim().split(/\s+/);
            return {
              ip: parts[0] || '-',
              mac: parts[1] || '-',
            };
          });

        setArpTable(entries);
      } catch (error) {
        console.error('Erro ao buscar tabela ARP:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArpTable();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tabela ARP
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Endereço IP</strong></TableCell>
                <TableCell><strong>MAC Address</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arpTable.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.ip}</TableCell>
                  <TableCell>{entry.mac}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
