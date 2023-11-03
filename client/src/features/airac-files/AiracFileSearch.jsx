import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { ENV } from "../../app/utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import { airacFiles } from "../../app/api/services";
import { useEnv } from "./AiracFile";

const AiracFileSearch = () => {
  const { env, setEnv, setLoading, searchOption, setData } = useEnv();
  const [options] = useState(Object.values(ENV));

  const handleSearch = async () => {
    setLoading(true);

    try {
      const { active, all, from, to } = searchOption;

      const { data } = active ?
        await airacFiles.active(env) :
        all ? await airacFiles.list(env) :
          await airacFiles.range(env, from, to);

      setData(data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setEnv(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1.5em",
      }}
    >
      <FormControl
        variant="outlined"
        fullWidth
        size="small"
        style={{ width: "15rem", marginRight: "0.5em" }}
      >
        <InputLabel>Select environment</InputLabel>
        <Select
          value={env}
          onChange={handleChange}
          label="Select environment"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </div>
  );
};

export default AiracFileSearch;
