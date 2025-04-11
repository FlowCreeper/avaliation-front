'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function ConsolePage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);

  // Lista de comandos possíveis
  const possibleCommands = [
    'ping <ip/dominio>',
    'tracert <ip/dominio>',
    'ipconfig/ifconfig',
    'netstat',
    'nslookup <dominio>',
    'route print',
    'clear', // Limpar histórico
  ];

  const handleCommand = async () => {
    if (!input.trim()) return;
  
    const cmd = input.trim();
  
    // Limpa o histórico se o comando for "clear"
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
  
    try {
      // Adicionar o comando ao histórico imediatamente
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: 'Executando comando...' },
      ]);
  
      // Enviar o comando para a API NestJS
      const response = await fetch('http://localhost:5000/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao executar comando');
      }
  
      // Obter a resposta do servidor
      const data = await response.json();
  
      // Exibe a resposta completa para o comando executado
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: data.response || 'Erro desconhecido' },
      ]);
    } catch (error: unknown) {
      // Verifica se o erro é uma instância de Error
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  
      // Adicionar o erro ao histórico
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: errorMessage },
      ]);
    }
  
    // Limpar o campo de input
    setInput('');
  };
  

  const handleClear = () => {
    setHistory([]);
    setInput('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terminal de Comandos
      </Typography>

      {/* Lista de Comandos Possíveis */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comandos Disponíveis:
        </Typography>
        <List>
          {possibleCommands.map((cmd, index) => (
            <ListItem key={index}>
              <ListItemText primary={cmd} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Terminal */}
      <Paper
        sx={{
          p: 2,
          height: '300px',
          overflowY: 'auto',
          bgcolor: '#000',
          color: '#0f0',
          fontFamily: 'monospace',
          mb: 2,
        }}
      >
        {history.map((item, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography component="div">
              <span style={{ color: '#0ff' }}>C:\</span> {item.command}
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {item.output}
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* Campo de Input e Botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Digite seu comando"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
        />
        <Button variant="contained" onClick={handleCommand}>
          Executar
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Limpar
        </Button>
      </Box>
    </Box>
  );
}
