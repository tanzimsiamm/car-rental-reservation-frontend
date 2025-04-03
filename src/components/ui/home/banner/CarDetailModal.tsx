import { ClipLoader } from "react-spinners";
import { useGetSingleCarQuery } from "../../../../redux/features/car/carApi";
import { TCar } from "../../../../types";

type TModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  carId: string;
};

export default function CarDetailModal({ setIsOpen, carId }: TModalProps) {
  const { data, isLoading: dataLoading } = useGetSingleCarQuery(carId);
  const car: TCar = data?.data;

  if (dataLoading) {
    return (
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center">
        <ClipLoader
          color="#000002"
          //  loading={dataLoading || updateLoading}
          size={35}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
        />
      </div>
    );
  }

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 flex justify-center items-center">
      <div className="w-[400px] md:w-[500px] p-7 bg-white rounded-xl">
        {/* detail section  */}
        <section>
          <div className="block rounded-md w-full font-play">
            <div className="p-6 pb-4 flex items-center justify-center dz-media">
              <img
                className="border-4 border-gray-100 rounded-lg w-40 h-44 md:w-44 md:h-44 object-contain  p-3 shadow-2xl"
                src={car?.images[0]}
              />
            </div>

            <div className="p-6 pt-0 ">
              <h5 className="mb-4 text-2xl font-semibold leading-tight text-neutral-600 dark:text-neutral-50 text-center">
                {car?.name}
              </h5>

              <h5 className="mb-4 text-[20px] flex items-center justify-center gap-2 font-semibold leading-tight text-gray-500 italic dark:text-neutral-50 text-center ">
                {" "}
                COST :
                <span className="text-xl text-amber-500 font-racing not-italic">
                  {car.pricePerHour}$ Per Hour
                </span>
              </h5>

              <div className="flex gap-3 items-center justify-center">
                <span className="text-zinc-600 inter-regular text-lg">
                  Location : {car.location}
                </span>
              </div>

              <div className="flex gap-3 items-center justify-center">
                <span className="text-zinc-600 inter-regular text-lg">
                  {" "}
                  Status : {car.status}
                </span>
              </div>

              <div className="flex gap-3 flex-grow"></div>
            </div>
          </div>
        </section>

        <button
          onClick={() => setIsOpen(false)}
          className="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {" "}
          Close{" "}
        </button>
      </div>
    </section>
  );
}
