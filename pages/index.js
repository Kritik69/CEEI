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
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { keyframes } from "@mui/system"; // Import keyframes from Material-UI

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

const backgroundAnimation = keyframes`
  0% { background-color: #f8f9fa; } /* Light pastel color */
  50% { background-color: #e8f5e9; } /* Soft green pastel */
  100% { background-color: #f8f9fa; } /* Back to original */
`;

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  console.log(data, "data");

  const { setUsers, search, sort, setSearch, setSort, getFilteredSortedUsers } =
    useUserStore();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSplash(false), 1000);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  const users = getFilteredSortedUsers();
  const paginatedUsers = users.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewToggle = () => {
    setIsGridView((prev) => !prev);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {showSplash ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 1s ease-in-out",
          }}
        >
          Loading...
        </Box>
      ) : (
        <Container
          maxWidth="md"
          sx={{
            mt: 5,
            opacity: 1,
            transition: "opacity 1s ease-in-out",
            position: "relative",
            // animation: `${backgroundAnimation} 10s infinite`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isGridView}
                  onChange={handleViewToggle}
                  color="primary"
                />
              }
              label={isGridView ? "Grid View" : "List View"}
            />
          </Box>

          <Typography variant="h4" align="center" gutterBottom>
            Users
          </Typography>

          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />

          {isLoading && <CircularProgress />}
          {error && <Alert severity="error">Error fetching users</Alert>}

          <Box
            sx={{
              display: isGridView ? "grid" : "block",
              gridTemplateColumns: isGridView
                ? {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }
                : "none",
              gap: isGridView ? 2 : 0,
            }}
          >
            {paginatedUsers.map((user) => (
              <Box
                key={user.id}
                onClick={() => handleUserClick(user)}
                sx={{
                  cursor: "pointer",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    filter: "invert(1)",
                  },
                }}
              >
                <UserCard user={user} isGridView={isGridView} />
              </Box>
            ))}
          </Box>

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

          <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    component="img"
                    src="https://imgs.search.brave.com/PuFB9Y5WQMsiRnXkOjG-2jRmjPdoVfhnTfJkvHXB70o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0LzA0LzMzLzE5/LzM2MF9GXzE0MDQz/MzE5MDdfTHR5UkVw/YnZEa2l0VFhiZmRN/V3hLWEZaSFF3NWlN/TWouanBn" // Provided image URL
                    alt="Profile"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <Box>
                    <Typography variant="h6">{selectedUser.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      @{selectedUser.username}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.email}
                    </Typography>

                    <Typography variant="body2">
                      📞{" "}
                      <a
                        href={`tel:${selectedUser.phone}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {selectedUser.phone}
                      </a>
                    </Typography>

                    <Typography variant="body2">
                      🌐{" "}
                      <a
                        href={`https://${selectedUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {selectedUser.website}
                      </a>
                    </Typography>

                    <Typography variant="body2">
                      🏢 {selectedUser.company?.name}
                    </Typography>
                    <Typography variant="body2">
                      📍 {selectedUser.address?.street},{" "}
                      {selectedUser.address?.city}
                    </Typography>
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </ThemeProvider>
  );
}
