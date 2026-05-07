import type { CardSubscriptionListTs } from "../types";

const CardItemList = ({opcion,tipo}:CardSubscriptionListTs) => {
  return (
    <p className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        className="fill-current w-6 h-6"
      >
        <path d={tipo?"M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z":"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}/>
      </svg>
      {opcion}
    </p>
  );
};

export default CardItemList;
