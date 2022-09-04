import Results from '@/components/Results'
import styled from 'styled-components'
import { Title } from './Header'

const Button = styled.button`
	
`

const Main = () => {
	return (
		<div className=''>
			<div className='flex flex-col items-center container mx-auto px-32 py-24'>
				<Title>
					קצרו את <span style={{ color: 'unset' }}>הכתובת שלכם!</span>
				</Title>

				<span className='text-neutral-800 text-xl mb-8'>
					מלאו את השדה בכתובת הקיימת, לחצו על הכפתור "קצר את הכתובת" ותקבלו את הכתובת המקוצרת.
				</span>

				<div className='flex flex-row w-full items-center justify-center'>
					<Button className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-full ml-4'>קצר את הכתובת</Button>
					<input
						type='text'
						className='bg-neutral-200 border border-neutral-300 outline-none rounded-full py-2 px-4 w-96'
						placeholder='www.'
						style={{ direction: 'ltr' }}
					/>
				</div>

				<Results />
			</div>
		</div>
	)
}

export default Main
