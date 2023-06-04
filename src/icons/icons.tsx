// const LinkedInIcon = () => (

// }

// const GitHubIcon = () => (

// }

// const TwitterIcon = () => (

// }

// const LogoIcon = () => (

// }

const LineIcon = () => {
  return (
    <svg
      width="32"
      height="4"
      viewBox="0 0 32 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="32" height="3" fill="#D9D9D9" />
    </svg>
  );
};

const PointedArrow = ({ color }: { color: string }) => {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5371 10L0.459473 8.92308L7.8489 1.53846H1.2292V0H10.466V9.23077H8.92652V2.61538L1.5371 10Z"
        fill={color}
      />
    </svg>
  );
};
export { LineIcon, PointedArrow };
