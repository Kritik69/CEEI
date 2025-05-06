import { Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ user, isGridView }) => (
  <Card
    sx={{
      mb: isGridView ? 0 : 2,
      height: isGridView ? 200 : "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: isGridView ? "center" : "space-between",
      alignItems: isGridView ? "center" : "flex-start",
      overflow: "hidden",
      textAlign: isGridView ? "center" : "left",
      padding: isGridView ? 2 : 1,
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
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        {user.email}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        📞 {user.phone}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        🌐 {user.website}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        🏢 {user.company?.name}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: isGridView ? "normal" : "nowrap",
        }}
      >
        📍 {user.address?.street}, {user.address?.city}
      </Typography>
    </CardContent>
  </Card>
);

export default UserCard;
