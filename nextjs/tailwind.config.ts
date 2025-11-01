import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* 🔹 Mantido o que já existia */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1c1c1c",
        secondary: "#454545",

        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLight: "#FEFCE8",

        /* 🔸 Novas cores do layout Ethos */
        EthosPrimary: "#003366",
        EthosSecondary: "#fb1",
        accent: "#fcffff",
        dark: "#000003",
        error: "#ff4444",
      },
      textColor: {
        primary: "#f5f5f5",
        secondary: "#6f6f6f",

        /* 🔸 Textos Ethos */
        EthosPrimary: "#003366",
        EthosSecondary: "#fb1",
        error: "#ff4444",
      },
      borderColor: {
        secondary: "#454545",
      },

      /* 🔸 Fontes adicionadas */
      fontFamily: {
        inter: ["var(--font-inter)","Inter", "sans-serif"],
        chathura: ["var(--font-chathura)","Chathura", "cursive"],
        openSans: ["var(--font-open-sans)","Open Sans", "sans-serif"],
        roboto: ["var(--font-roboto)","Roboto", "sans-serif"],

      },

      /* 🔸 Adições de layout, tamanho e z-index */
      borderRadius: {
        custom: "20% 0", // para welcome-box
      },
      spacing: {
        "10rem": "10rem",
      },
      opacity: {
        80: "0.8",
      },
      zIndex: {
        100: "100",
        5: "5",
        2: "2",
      },
      fontSize: {
        "6xl": "6rem",
        "5xl": "5rem",
        "2xl": "2rem",
        xl: "1.5rem",
        base: "1rem",
      },
      letterSpacing: {
        wide: "0.2rem",
        wider: "2rem",
      },
      minWidth: {
        "25rem": "25rem",
      },
    },
  },
  plugins: [],
};

export default config;
