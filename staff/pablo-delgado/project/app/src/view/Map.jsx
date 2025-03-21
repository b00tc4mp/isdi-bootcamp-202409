import Heading from '../library/Heading'
import Container from '../library/Container'
import SearchProvider from './Search'
import ResultsProvidersList from './ResultsProvidersList'

export default function Map() {
    return <>
        <section className="flex flex-col justify-center items-center gap-7 mb-6 z-40">
            <Container className="flex flex-col items-center h-28">
                <Heading className="text-[#C900CD] text-[20px] font-bold text-center mt-2">Pet providers</Heading>
                <SearchProvider />
            </Container>
        </section >

        <ResultsProvidersList />
    </>
}