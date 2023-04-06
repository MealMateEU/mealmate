import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../common/Select";
import {
  UserInfos,
  UserInfosENUM,
  type UserInfosType,
} from "~/types/userInfos.type";
import Image from "next/image";

const UserDataForm: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfosType>({
    resolver: zodResolver(UserInfos),
  });

  const onSubmit: SubmitHandler<UserInfosType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={void handleSubmit(onSubmit)}
      className="flex h-screen flex-col items-center justify-center space-y-4 p-4"
    >
      <Input
        type="number"
        name={UserInfosENUM.heightInCentimeters}
        spanValue="cm"
        placeholder="Your height in centimeters"
        register={register}
        required
      />
      {errors.heightInCentimeters && (
        <p className="text-red-500">{errors.heightInCentimeters.message}</p>
      )}
      <Input
        type="number"
        name={UserInfosENUM.age}
        spanValue="years"
        placeholder="Your age"
        register={register}
        required
      />
      {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      <Select
        register={register}
        name={UserInfosENUM.objective}
        options={["LOSE_WEIGHT", "GAIN_MUSCLE", "MAINTAIN_WEIGHT"]}
        selectName="Pick one ?"
        required
      />
      {errors.objective && (
        <p className="text-red-500">{errors.objective.message}</p>
      )}
      <input type="submit" />
    </form>
  );
};

export default UserDataForm;
