import Layout from '@/components/UI/Layout'
import MainBlock from '@/components/Pages/Home/Main'
import FAQ from '@/components/FAQ'

const Index = () => {
	return (
		<Layout title='קיצור כתובות'>
			<div className='pt-8'>
				<MainBlock />
			</div>
			<FAQ />
		</Layout>
	)
}

export default Index
