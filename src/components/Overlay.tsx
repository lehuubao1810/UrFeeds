type Props = {
  // Define your props here
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  action?: () => void;
};

export const Overlay: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-opacity-50 bg-black z-30 flex justify-center items-center"
      onClick={() => {
        props.setStatus(!props.status);
        if (props.action) {
          props.action();
        }
      }}
    ></div>
  );
};
