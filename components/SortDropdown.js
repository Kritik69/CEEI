import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortDropdown = ({ value, onChange }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>Sort By</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Sort By"
    >
      <MenuItem value="name-asc">Name (A-Z)</MenuItem>
      <MenuItem value="name-desc">Name (Z-A)</MenuItem>
      <MenuItem value="username-asc">Username (A-Z)</MenuItem>
      <MenuItem value="username-desc">Username (Z-A)</MenuItem>
    </Select>
  </FormControl>
);

export default SortDropdown;
