import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/common/Button";
import UserDataForm from "~/components/UserDataForm/UserDataForm";
import { api } from "~/utils/api";

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
  const userLoggedIn = useSession().status === "authenticated";
  const [isNewUser, setIsNewUser] = useState(false);
  const { data } = api.user.getUserInfos.useQuery();

  // Here we check if the user is new or not
  useEffect(() => {
    if (data) {
      if (
        data.age === 0 &&
        data.heightInCentimeters === 0 &&
        data.objective === "UNSET"
      ) {
        setIsNewUser(true);
        console.log(data.name, "-> Is a new user");
      } else {
        // redirect to home if user is not new
        redirect("/");
      }
    }
  }, [data]);

  // return part
  if (!userLoggedIn) return <LoginForm />;

  if (isNewUser) return <UserDataForm />;

  return <></>;
};

export default AuthPage;
