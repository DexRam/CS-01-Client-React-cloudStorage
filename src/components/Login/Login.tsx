import { FC } from 'react';
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { ContentContainer, CardContainer, FormContainer } from "../UIComponents/Containers";
import { CardHeader } from "../UIComponents/Cards";
import { InputField } from "../UIComponents/InputFields";
import { ActionSubmit } from "../UIComponents/Actions";
import useLoginForm from "./useLoginForm";


const Login: FC = () => {
  useAuthRedirect('/fileManagement');

  const {
    state: { username, password, errors, isFormValid },
    passwordVisible,
    setPasswordVisible,
    handleFieldChange,
    handleSubmit
  } = useLoginForm();

  const inputFields = [
    { label: "Username", type: "text", value: username, onChange: handleFieldChange("username"), error: errors.username, required: true },
    { label: "Password", type: "password", value: password, onChange: handleFieldChange("password"), error: errors.password, required: true, passwordVisible, setPasswordVisible }
  ];

  return (
    <ContentContainer>
      <div className="max-w-96">
        <CardContainer>
          <CardHeader title="Login" />
          <FormContainer handleSubmit={handleSubmit}>
            {inputFields.map((fieldProps, index) => (
              <InputField key={index} {...fieldProps} />
            ))}
            <ActionSubmit
              isFormValid={isFormValid}
              color="bg-green-500"
              hoverColor="bg-green-600"
            >
              Submit
            </ActionSubmit>
          </FormContainer>
        </CardContainer>
      </div>
    </ContentContainer>
  );
};

export default Login;
