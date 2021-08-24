import { useRouter } from 'next/dist/client/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {format} from "date-fns"
import InfoCard from '../components/InfoCard';

function Search({ searchResults }) {

    const router = useRouter();

    const {location, startDate, endDate, noOfGuests} = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`}/>
                <main className="flex">
                    <section className="flex-grow pt-14 p-4">
                        <p className="text-xs">300+ stays for 5 number of {noOfGuests}</p>
                        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                        <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                            <p className="button">Cancelattion Flexibility</p>
                            <p className="button">Uploads</p>
                            <p className="button">Long Term</p>
                            <p className="button">Short Term</p>
                            <p className="button">Mid Term</p>
                        </div>

                        <div className="flex flex-col">
                            {searchResults.map(({img, location, title, description, star, price, total}) => (
                                <InfoCard
                                key={img} 
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}                            
                                />
                            ))} 
                        </div>

                    </section>
                </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());

    return {
        props: {
            searchResults,
        },
    };
}