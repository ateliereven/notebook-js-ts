interface IconButtonProps {
   icon: string;
   onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
   return <button
      className="button is-outlined is-danger is-small"
      onClick={onClick}
   >
      <span className="icon">
         <i className={icon}></i>
</span>
   </button>
}

export default IconButton;