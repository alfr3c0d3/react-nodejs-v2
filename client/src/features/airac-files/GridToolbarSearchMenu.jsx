import { Button, Menu, MenuItem, Switch } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import React, { useState } from "react";
import DateRangeSelector from "../../app/common/CustomDateRange";
import { useEnv } from "./AiracFile";
import { toast } from "react-toastify";

const emptySearchOption = {
  active: false,
  all: false,
  range: false
};

const GridToolbarSearchMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { searchOption, setSearchOption } = useEnv();
  const [selectedOption, setSelectedOption] = useState({ ...emptySearchOption, ...searchOption })

  const handleOpenFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
    setSearchOption(selectedOption);
  };

  const handleRangeSelection = async ({ from, to }) => {
    if (!from) {
      toast.warning("Invalid Range");
      setSearchOption({ ...emptySearchOption, active: true });
      return;
    }

    setSearchOption({ ...selectedOption, from: from.toLocaleDateString(), to: to.toLocaleDateString() });
    setAnchorEl(null);
  }

  return (
    <>
      <Button onClick={handleOpenFilterMenu} startIcon={<GridSearchIcon />}>
        Search Options
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseFilterMenu}
      >
        <MenuItem onClick={() => setSelectedOption({ ...emptySearchOption, active: true })}>
          <Switch edge="start" checked={selectedOption.active} />
          Active Records
        </MenuItem>
        <MenuItem onClick={() => setSelectedOption({ ...emptySearchOption, all: true })}>
          <Switch edge="start" checked={selectedOption.all} />
          All Records
        </MenuItem>
        <MenuItem onClick={() => setSelectedOption({ ...emptySearchOption, range: true })}>
          <Switch edge="start" checked={selectedOption.range} />
          Range
        </MenuItem>
        {selectedOption.range && (
          <MenuItem>
            <DateRangeSelector onSubmit={handleRangeSelection} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default GridToolbarSearchMenu;
