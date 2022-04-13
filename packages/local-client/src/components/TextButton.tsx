interface TextButtonProps {
   icon: string;
   text: string;
   onClick: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ icon, text, onClick }) => {
   return <button
      className="button is-danger is-rounded is-small"
      onClick={onClick}
   >
      <span className="icon is small">
         <i className={icon} />
      </span>
      <span>{text}</span>
   </button>
}

export default TextButton;