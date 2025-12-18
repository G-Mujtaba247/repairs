import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const WebLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 pt-20 px-4 flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default WebLayout