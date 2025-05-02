import { useEffect, useState } from "react";
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
  Pagination,
  Box,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import UserCard from "../components/UserCard";
import { useUserStore } from "./../store/useUserStore";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#1976d2",
          },
        },
      },
    },
  },
});

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const { setUsers, search, sort, setSearch, setSort, getFilteredSortedUsers } =
    useUserStore();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Change this to adjust pagination length

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const users = getFilteredSortedUsers();
  const paginatedUsers = users.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Users
        </Typography>

        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />

        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">Error fetching users</Alert>}

        {paginatedUsers.map((user) => (
          <Box
            key={user.id}
            sx={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <UserCard user={user} />
          </Box>
        ))}

        {users.length === 0 && !isLoading && !error && (
          <Typography>No users found.</Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(users.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
