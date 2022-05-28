interface IconButtonProps {
   icon: string;
   onClick: () => void;
   tooltipText?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, tooltipText }) => {
   return <button
      className="button is-outlined is-danger is-small has-tooltip-top"
      onClick={onClick}
      data-tooltip={tooltipText}
   >
      <span className="icon">
         <i className={icon}></i>
</span>
   </button>
}

export default IconButton;