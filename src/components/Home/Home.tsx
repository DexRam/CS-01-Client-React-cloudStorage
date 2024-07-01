import { FC } from "react";
import { ContentContainer, ActionContainer, CardContainer } from "../UIComponents/Containers";
import { CardHeader, CardBody } from "../UIComponents/Cards";
import { ActionLink } from "../UIComponents/Actions";

const Home: FC = () => {
  return (
    <ContentContainer>
      <CardContainer>
        <CardHeader title="Welcome to Your Personal Cloud Storage" />
        <CardBody text="Access and manage your files securely from anywhere. Start by registering or logging in." />
        <ActionContainer>
          <ActionLink
            to="/register"
            color="bg-blue-500"
            hoverColor="bg-blue-600"
          >
            Register
          </ActionLink>
          <ActionLink
            to="/login"
            color="bg-green-500"
            hoverColor="bg-green-600"
          >
            Login
          </ActionLink>
        </ActionContainer>
      </CardContainer>
    </ContentContainer>
  );
};

export default Home;
