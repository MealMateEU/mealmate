import { Color } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const colors = Object.values(Color)
  .filter((c) => c !== "UNSET" && c !== "EASTEREGG")
  .map((c) => c.toLocaleLowerCase());

const MatePickerModal: React.FC = () => {
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" checked />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Choose your mate</h3>
          <div className="carousel mt-4 w-full">
            {colors.map((color, index) => (
              <div
                id={`slide${index}`}
                key={index}
                className="carousel-item relative w-full"
              >
                <Image
                  className="rounded-full"
                  src={`/images/${color}/stage1.png`}
                  alt={`${color} mate`}
                  width={360}
                  height={360}
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${idx}`}
                    className="btn-circle btn"
                    onClick={() => {
                      setIdx(idx > 0 ? idx - 1 : idx);
                    }}
                  >
                    ❮
                  </a>

                  <a
                    href={`#slide${idx}`}
                    className="btn-circle btn"
                    onClick={() => {
                      const next = idx + 1 === colors.length ? idx : idx + 1;
                      setIdx(next);
                    }}
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatePickerModal;
