import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import UserCard from "../components/UserCard";
import { useUserStore } from "./../store/useUserStore";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const { setUsers, search, sort, setSearch, setSort, getFilteredSortedUsers } =
    useUserStore();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const users = getFilteredSortedUsers();

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Directory
        </Typography>

        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />

        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">Error fetching users</Alert>}

        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {users.length === 0 && !isLoading && !error && (
          <Typography>No users found.</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}
