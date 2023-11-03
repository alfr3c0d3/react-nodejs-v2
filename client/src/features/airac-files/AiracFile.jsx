import { createContext, useContext, useState } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import { ENV } from '../../app/utils/constants';
import AiracFileSearch from './AiracFileSearch';
import AiracFileList from './AiracFileList';
import { Paper } from "@mui/material";

const EnvContext = createContext();

export const useEnv = () => {
  return useContext(EnvContext);
};

const AiracFile = () => {
  const [env, setEnv] = useState(ENV.DEV);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchOption, setSearchOption] = useState({ active: true });

  return (
    <EnvContext.Provider value={{ env, setEnv, loading, setLoading, data, setData, searchOption, setSearchOption }}>
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress />
      </Backdrop>
      <Paper elevation={3} style={{ padding: "1.5em" }}>
        <AiracFileSearch style={{ marginBottom: "1.5em" }} />
        <AiracFileList />
      </Paper>
    </EnvContext.Provider>
  );
};

export default AiracFile
