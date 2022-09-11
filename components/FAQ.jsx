import { useState } from 'react'
import styled from 'styled-components'
import { Title } from './Pages/Home/Header'

const qs = [
	{
		question: 'איך מקצרים קישור?',
		answer: (
			<>
				1. מעתיקים את הקישור שאתם רוצים לקצר
				<br />
				2. הדביקו את הקישור בתיבה המאפשרת זאת בעמוד הראשי
				<br />
				3. לחצו על כפתור "קצר את הכתובת" לאחר מספר שניות האתר
				<br />
				יספק לכם קישור מקוצר חדש שאותו תוכלו לשתף ישירות בווצאפ או בפייסבוק וכמובן להעתיק בלחיצת כפתור.
			</>
		),
	},
	{
		question: 'האם שירות קיצור הכתובות הוא עולה כסף?',
		answer: (
			<>
				השירות הינו חינמי לגמרי!
				<br />
				כל אדם יכול לקצר כתובות בכמות שהוא ירצה ויצטרך!
			</>
		),
	},
	{
		question: 'במה קישור קצר עוזר לי?',
		answer: (
			<>
				בדרך כלל קישורים רגילים של אתרי אינטרנט הם ארוכים מאוד, לוקחים הרבה מקום בתיבת הטקסט, לא מובנים
				ומסורבלים.
				<br />
				קישור רגיל יכול להגיע אפילו למאות תווים! בעיקר בקישורים שיש בהם טקסט בעברית.
			</>
		),
	},
]

const FAQ = () => {
	return (
		<div className='flex flex-col justify-center items-center py-20 border-t container mx-auto px-4 xl:px-24'>
			<Title>
				שאלות <span>נפוצות</span>
			</Title>
			<div className='flex flex-col items-start mb-12'>
				{qs.map(({ question, answer }) => (
					<AQ
						question={question}
						answer={answer}
						key={question}
					/>
				))}
			</div>
			<div>
				כשאנחנו רוצים לשתף את הקישור שלנו ברשתות החברתיות חשוב שההודעה תהיה קצרה, קולעת ומדוייק.
				<br />
				לינק קצר עונה על כל הצרכים!
				<br />
				<br />
				תאמינו לנו, קיצור כתובת קטנה בשבילכם אבל גדולה בשביל הגולש! 😎
			</div>
		</div>
	)
}

const Card = styled.div`
	border-bottom: 1px dashed #dfc39b;
	padding: 10px;
	background-color: #f5f5f5;
	width: 100%;

	& .title {
		-webkit-transition: all 0.3s ease 0s;
		-moz-transition: all 0.3s ease 0s;
		-o-transition: all 0.3s ease 0s;
		transition: all 0.3s ease 0s;
		padding: 5px;
		cursor: pointer;

		&:hover {
			padding-right: 15px;
		}

		& h3 {
			color: #312d2e;
			font-size: 1rem;
			font-weight: 500;

			@media (min-width: 640px) {
				font-size: 1.1rem;
			}

			&::before {
				content: '•';
				margin-left: 5px;
			}
		}
	}
`

const AQ = ({ question, answer }) => {
	const [open, setOpen] = useState(false)

	return (
		<Card onClick={() => setOpen((op) => !op)}>
			<div className='title'>
				<h3>{question}</h3>
			</div>
			<div
				className={`duration-300 h-auto ${
					open ? 'max-h-24' : 'max-h-0'
				} block overflow-hidden text-neutral-700`}
			>
				<div className='p-4'>{answer}</div>
			</div>
		</Card>
	)
}

export default FAQ
