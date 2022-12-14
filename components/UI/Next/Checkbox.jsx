import NextCheckbox from '@nextui-org/react/checkbox'
import Spacer from '@nextui-org/react/spacer'

const Checkbox = (props) => {
	return (
		<>
			<NextCheckbox {...props}>
				<span className='mr-1.5 text-base'>{props.children}</span>
			</NextCheckbox>
			<Spacer y='0.1' />
		</>
	)
}

export default Checkbox
