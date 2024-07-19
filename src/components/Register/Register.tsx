import { FC } from "react";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useUserContext } from '../../contexts/useUserContext';
import { ContentContainer, CardContainer, FormContainer } from "../UIComponents/Containers";
import { CardHeader } from "../UIComponents/Cards";
import { InputField } from "../UIComponents/InputFields";
import { ActionSubmit } from "../UIComponents/Actions";
import { useRegisterForm } from "./useRegisterForm";

const Register: FC = () => {
  const userContext = useUserContext();
  useAuthRedirect(`/fileManagement/${userContext.userId}`);

  const {
    state: { username, fullname: fullname, email, password, errors, isFormValid },
    passwordVisible,
    setPasswordVisible,
    handleFieldChange,
    handleSubmit
  } = useRegisterForm();

  const inputFieldProps = [
    { label: "Username", type: "text", value: username, onChange: handleFieldChange("username"), error: errors.username },
    { label: "Fullname", type: "text", value: fullname, onChange: handleFieldChange("fullname"), error: errors.fullname },
    { label: "Email", type: "text", value: email, onChange: handleFieldChange("email"), error: errors.email },
    { label: "Password", type: "password", value: password, onChange: handleFieldChange("password"), error: errors.password, passwordVisible, setPasswordVisible }
  ];


  return (
    <ContentContainer>
      <div className="max-w-96">
        <CardContainer>
          <CardHeader title="Register" />
          <FormContainer handleSubmit={(event) => handleSubmit(event, true)}>
            {inputFieldProps.map((props, index) => (
              <InputField key={index} {...props} />
            ))}
            <ActionSubmit
              isFormValid={isFormValid}
              color="bg-blue-500"
              hoverColor="bg-blue-600"
            >
              Submit
            </ActionSubmit>
          </FormContainer>
        </CardContainer>
      </div>
    </ContentContainer>
  );
};

export default Register;
