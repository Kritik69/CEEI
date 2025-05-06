import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const UserCard = ({ user, isGridView }) => (
  <Card
    sx={{
      mb: isGridView ? 0 : 2,
      height: isGridView ? 150 : 150,
      display: "flex",
      flexDirection: "column",
      justifyContent: isGridView ? "center" : "space-between",
      alignItems: isGridView ? "center" : "flex-start",
      overflow: "hidden",
      textAlign: isGridView ? "center" : "left",
    }}
  >
    <CardContent
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: isGridView ? "normal" : "nowrap",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        {user.name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        @{user.username}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        {user.email}
      </Typography>
    </CardContent>
  </Card>
);

export default UserCard;
