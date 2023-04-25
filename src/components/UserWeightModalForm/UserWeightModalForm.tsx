import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "~/components/common/Input";
import { WeightHistory, WeightHistoryENUM } from "~/types/weightHistory.type";
import { api, type RouterInputs } from "~/utils/api";
import { lose_fat, gain_muscle, maintain_weight } from "~/utils/levelManager";
import { type Objective } from "@prisma/client";
import type { WeightHistory as WeightHistoryType } from "@prisma/client";

interface IUserWeightModalFormProps {
  usersObjective: Objective;
  matesLevel: number;
  yesterdaysWeight: WeightHistoryType;
}

const UserWeightModalForm: React.FC<IUserWeightModalFormProps> = (
  props: IUserWeightModalFormProps
) => {
  const session = useSession();
  const ctx = api.useContext();
  const obectives = [lose_fat, gain_muscle, maintain_weight];

  const { mutate: addWeightHistory } = api.weightHistory.create.useMutation({
    onSuccess: async () => {
      await ctx.weightHistory.getWeightHistoryByUserId.invalidate({
        userId: session.data?.user.id || "",
      });
      await ctx.mate.getMateByUserId.invalidate({
        userId: session.data?.user.id || "",
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RouterInputs["weightHistory"]["create"]>({
    resolver: zodResolver(WeightHistory),
  });

  const weight = watch(WeightHistoryENUM.weight);

  const onSubmit = (v: RouterInputs["weightHistory"]["create"]) => {
    addWeightHistory(v);
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" checked />
      <div className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}
          className="modal-box"
        >
          <h3 className="mb-4 text-lg font-bold">What is your weight today?</h3>

          <Input
            type="number"
            name={WeightHistoryENUM.weight}
            spanValue="kg"
            placeholder="Your weight"
            register={register}
            required
          />
          {errors.weight && (
            <p className="text-red-500">{errors.weight.message}</p>
          )}

          <div className="modal-action">
            <button type="submit" className="btn" disabled={!weight}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserWeightModalForm;
