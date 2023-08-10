import { MainTemplate } from "../templates/MainTemplate";
import { OperationsList } from "../components/operation/OperationsList";

export const OperationsListView = () => {
  return (
    <MainTemplate>
      <OperationsList />
    </MainTemplate>
  );
};
