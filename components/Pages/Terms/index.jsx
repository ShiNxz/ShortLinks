import styled from 'styled-components'
import { Title } from '../Home/Header'

const TermsParagraph = styled.div`
	font-size: 1.2rem;
	color: #312d2e;
	display: flex;
	flex-direction: column;

	& > span::before {
		content: '• ';
	}
`

const TermsofService = () => {
	return (
		<div className='bg-neutral-200 px-8 md:px-16 lg:px-40 pt-12 pb-40'>
			<Title>תקנון האתר</Title>
			<TermsParagraph>
				<span>האתר SHRT.co.il מופעל ע"י אופק עפרון ואמיר אליז ומשתמש אתר לשירות קיצור כתובות ברשת</span>
				<span>האמור בתקנון נרשם בלשון זכר אך הוא פונה לבני שני המינים באופן שווה</span>
				<span>עצם יצירת קיצור באתר תהווה הצהרה מצד הלקוח כי קרא את הוראות תקנון זה, הבין אותן והסכים להן</span>
				<span>
					יש ליצור קישורים תקינים וחוקיים, האתר שומר לעצמו את הזכות להסיר קישורים לא חוקיים, לינקים שבורים,
					קיצור לספאם
				</span>
				<span>
					ולינקים אשר מפירים זכויות יוצרים ו/או סימן רשום או כל הפרה של קניין רוחני בכל עת וכן לשלול שימוש
					ממשתמש שאינו עומד בתקנון על פי שיקול דעתנו ובכל עת
				</span>
				<span>
					האתר אינו אחראי לכל תקלה ו/או עיכוב ו/או מחיקה שנגרמה כתוצאה מכוח עליון ו/או מאירועים שאינם בשליטתה
				</span>
				<span>לכל שאלה, בקשה אוהצעה ניתן לפנות אל הנהלת האתר דרך טופס צור קשר</span>
				<span>
					האתר אינו אחראי לכל נזק שונובע מהשימוש או השימוש השגוי באתר לרבות כל נזק מקרי, מיוחד, עקיף או תוצאתי
					- ככל שהחוק מתיר זאת
				</span>
				<span>על משתמשי האתר חלה האחראיות המלאה על שימוש באופציית קיצור התכתובות</span>
				<span>לחיצה על כפתור "קצר את הכתובת" מהווה אישור לתקנון זה</span>
				<span>כל זכויות הקניין הרוחני באתר הינן רכושה הבלעדי של החברה</span>
				<span>
					אין להעתיק, להפיץ, לפרסם לשכל או להשתמש בכל דרך אחרת במידע כלשהו מן האתר, למעט קיצורים שנוצרו
					ומותרים להפצה חופשית, אלא אם ניתנה הסכמה לכך מראש ובכתה מטעם האתר
				</span>
				<span>כלל המוצג מטעם האתר מוגן בזכויות יוצרים ע"י בעלי האתר</span>
				<span>
					כל עבירה על תקנון זה הינה באחריות המשתמש בלבד, במידה ותתבצע עבירה טיפול בנושא יעשה בהתאם לדין מדינת
					ישראל בלבד ולרשות השופטת במדינה והינה בעלת סמכות השיפוט הבלעדית
				</span>
			</TermsParagraph>
		</div>
	)
}

export default TermsofService
