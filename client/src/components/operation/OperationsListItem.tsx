import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IOperation } from "../../lib/types/IOperation";

export const OperationsListItem = ({
  operation,
}: {
  operation: IOperation;
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <Box>
        <CardContent
          sx={{
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Link
            to={`/operation/${operation._id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h5">{operation.name}</Typography>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};
