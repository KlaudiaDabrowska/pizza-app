import { MainTemplate } from "../templates/MainTemplate";
import { List } from "../components/common/List";

export const OperationsListView = () => {
  return (
    <MainTemplate>
      <List itemName="operation" />
    </MainTemplate>
  );
};
