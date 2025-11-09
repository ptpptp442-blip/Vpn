import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const servers = [
  { name: 'United States - New York', ipPrefix: '64.233.160' },
  { name: 'Germany - Frankfurt', ipPrefix: '74.125.200' },
  { name: 'Japan - Tokyo', ipPrefix: '203.0.113' },
  { name: 'Brazil - São Paulo', ipPrefix: '172.217.160' },
  { name: 'Australia - Sydney', ipPrefix: '101.188.64' },
];

const PowerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1h-1zM3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
    </svg>
);


const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [ipAddress, setIpAddress] = useState('192.168.1.101');
  const [selectedServer, setSelectedServer] = useState(servers[0]);

  const generateRandomIp = (prefix) => {
    return `${prefix}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const handleConnectToggle = () => {
    if (isConnected) {
      setIsConnected(false);
      setIpAddress('192.168.1.101');
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        setIpAddress(generateRandomIp(selectedServer.ipPrefix));
      }, 2000); // Simulate connection time
    }
  };
  
  const getStatusText = () => {
      if(isConnecting) return "Connecting...";
      if(isConnected) return "Connected";
      return "Disconnected";
  }

  const getStatusClassName = () => {
      if(isConnecting) return "status-connecting";
      if(isConnected) return "status-connected";
      return "status-disconnected";
  }
  
  const getButtonClassName = () => {
      if(isConnecting) return "connecting";
      if(isConnected) return "connected";
      return "";
  }
  
  return (
    <div className="vpn-app">
      <h1 className="app-title">Gemini VPN</h1>

      <button
        className={`connection-button ${getButtonClassName()}`}
        onClick={handleConnectToggle}
        disabled={isConnecting}
        aria-label={isConnected ? "Disconnect from VPN" : "Connect to VPN"}
      >
          <PowerIcon />
      </button>

      <div className="status-container">
        <p className={`connection-status ${getStatusClassName()}`}>{getStatusText()}</p>
        <p className="ip-address">
            {isConnected || isConnecting ? `Your IP: ${ipAddress}` : 'Your IP is exposed'}
        </p>
      </div>

      <select
        className="server-select"
        value={selectedServer.name}
        onChange={(e) => {
            const server = servers.find(s => s.name === e.target.value);
            if (server) setSelectedServer(server);
        }}
        disabled={isConnected || isConnecting}
      >
        {servers.map((server) => (
          <option key={server.name} value={server.name}>
            {server.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);