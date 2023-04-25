import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "~/components/common/Input";
import { WeightHistory, WeightHistoryENUM } from "~/types/weightHistory.type";
import { api, type RouterInputs } from "~/utils/api";

const UserWeightModalForm: React.FC = () => {
  const session = useSession();
  const { refetch } = api.weightHistory.getWeightHistoryByUserId.useQuery(
    { userId: session.data?.user.id || "" },
    { enabled: false }
  );
  const { mutate: addWeightHistory } = api.weightHistory.create.useMutation({
    onSuccess: async () => {
      await refetch();
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
