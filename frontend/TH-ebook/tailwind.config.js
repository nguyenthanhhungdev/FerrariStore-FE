/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "custom-xl": "4.5rem", // Thêm kích thước font 4.5rem
      },
      colors: {
        "custom-orange": "rgb(255, 103, 64)",
      },
      gridTemplateAreas: {
        "product-detail": [
          "left cover title right",
          "left cover buttons right",
          "left cover info right",
          "left cover stats right",
          "left cover padding right",
          "left synopsis synopsis right",
          "left content content right",
        ],
        "product-detail-mobile": [
          "cover    title   ",
          "cover    stats   ",
          "info     info    ",
          "buttons  buttons ",
          "synopsis synopsis",
          "content  content ",
        ],
        "product-list-comp-dense": [
          "cover title author stats status",
          "cover tags tags tags tags",
          "cover description description description description",
        ],
        "product-list-comp-sparse": [
          "cover title title",
          "cover stats status",
          "cover tags tags",
          "cover description description",
        ],
      },
      // screens: {
      //   xxlg: { max: "1920px" },
      //   xlg: { max: "1440px" },
      //   lg: { max: "960px" },
      //   md: { max: "768px" },
      //   sm: { max: "480px" },
      //   xsm: { max: "320px" },
      // },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
};

export default withMT(config);
