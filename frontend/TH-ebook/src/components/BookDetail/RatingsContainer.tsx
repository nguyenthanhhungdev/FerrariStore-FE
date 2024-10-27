function RatingsContainer() {
  return (
      <div className="ml-2 mt-4 flex gap-3">
          <span className="flex">
            <svg
                data-v-9ba4cb7e=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="feather feather-star icon rel text-primary mr-1 mt-1 text-custom-orange"
                viewBox="0 0 24 24"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path>
            </svg>
            <span className=" text-custom-orange">7.67</span>
          </span>
          <span className="flex">
            <svg
                data-v-9ba4cb7e=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="icon rel mr-1 mt-1"
            >
              <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span>3,374</span>
          </span>
          <span className="flex">
            <svg
                data-v-9ba4cb7e=""
                data-v-89359c03=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="icon small text-icon-contrast text-undefined mr-1 mt-1"
            >
              <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span>30</span>
          </span>
          <span className="flex text-gray-500 font-bold">
            <svg
                data-v-9ba4cb7e=""
                data-v-65e4b371=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="feather feather-eye icon rel mr-1 mt-1"
                viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>N/A</span>
          </span>
      </div>
  );
}

export default RatingsContainer;