interface IAddCellButtonProps {
	onClick: () => void;
	caption: string;
}

const AddCellButton: React.FC<IAddCellButtonProps> = ({
	onClick,
	caption,
}): JSX.Element => {
	return (
		<button
			className="button is-primary is-rounded is-small"
			onClick={onClick}
		>
			<span className="icon is-small">
				<i className="fas fa-plus"></i>
			</span>
			<span>{caption}</span>
		</button>
	);
};

export default AddCellButton;
