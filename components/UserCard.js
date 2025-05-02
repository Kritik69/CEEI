import { Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ user }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        @{user.username}
      </Typography>
      <Typography variant="body1">{user.email}</Typography>
    </CardContent>
  </Card>
);

export default UserCard;
