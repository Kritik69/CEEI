import { TextField } from "@mui/material";

const SearchBar = ({ value, onChange }) => (
  <TextField
    label="Search by name or email"
    variant="outlined"
    fullWidth
    margin="normal"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
