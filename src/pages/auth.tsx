import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import { Button } from "~/components/common/Button";

function LoginForm() {
  return (
    <div>
      <Button color="primary" onClick={() => void signIn("discord")}>
        Login with discord
      </Button>
    </div>
  );
}

const AuthPage: NextPage = () => {
  return <LoginForm />;
};

export default AuthPage;
