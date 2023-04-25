import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import MatePickerModal from "~/components/MatePickerModal/MatePickerModal";
import UserWeightModalForm from "~/components/UserWeightModalForm/UserWeightModalForm";
import type { WeightHistory } from "@prisma/client";

const Home: NextPage = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = api.user.getUserInfos.useQuery();

  const userId = userData?.id || "";

  const {
    data: weightHistoryData,
    isLoading: weightHistoryLoading,
    isError: weightHistoryError,
  } = api.weightHistory.getWeightHistoryByUserId.useQuery(
    {
      userId: userId,
    },
    { enabled: !!userId }
  );

  const {
    data: mateData,
    isLoading: mateLoading,
    isError: mateError,
  } = api.mate.getMateByUserId.useQuery(
    {
      userId: userId,
    },
    { enabled: !!userId }
  );

  const todaysWeight = (weightHistory: WeightHistory[]) => {
    const today = new Date();
    return weightHistory.find(
      (element) => element.created_at.getDate() == today.getDate()
    );
  };

  const yesterdaysWeight = (weightHistory: WeightHistory[]) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return weightHistory.find(
      (element) => element.created_at.getDate() == date.getDate()
    );
  };

  if (userLoading || weightHistoryLoading || mateLoading)
    return <div>Loading...</div>;

  if (userError || weightHistoryError || mateError)
    return <div>An error has occurred</div>;

  return (
    <div>
      {!mateData && <MatePickerModal />}
      {!todaysWeight(weightHistoryData) && mateData && (
        <UserWeightModalForm
          usersObjective={userData?.objective}
          matesLevel={mateData?.level}
          yesterdaysWeight={yesterdaysWeight(weightHistoryData)}}
        />
      )}
      <div className="flex justify-between p-2 font-semibold">
        <div>{userData?.name}</div>
        <div>
          <div>{userData?.age} ans</div>
          <div>{userData?.heightInCentimeters} cm</div>
          <div>{weightHistoryData[0]?.weight} kg</div>
        </div>
      </div>
      <div className="mt-24 flex justify-center">
        <Image
          className="rounded-full"
          src={`/images/${mateData?.color.toLowerCase() || ""}/stage${
            mateData?.level || 1
          }.png`}
          alt="mate"
          width={360}
          height={360}
        />
      </div>
    </div>
  );
};

export default Home;
