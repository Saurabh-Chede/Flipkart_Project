
export default function Footer() {
    return (
        <footer className="bg-[#212121] text-white">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">


                <div>
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">About</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
                        <li><a href="#" className="hover:underline">Press</a></li>
                        <li><a href="#" className="hover:underline">Corporate Information</a></li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">Group Companies</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:underline">Myntra</a></li>
                        <li><a href="#" className="hover:underline">Cleartrip</a></li>
                        <li><a href="#" className="hover:underline">Shopsy</a></li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">Help</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:underline">Payments</a></li>
                        <li><a href="#" className="hover:underline">Shipping</a></li>
                        <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
                        <li><a href="#" className="hover:underline">FAQ</a></li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">Consumer Policy</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
                        <li><a href="#" className="hover:underline">Terms Of Use</a></li>
                        <li><a href="#" className="hover:underline">Security</a></li>
                        <li><a href="#" className="hover:underline">Privacy</a></li>
                        <li><a href="#" className="hover:underline">Sitemap</a></li>
                        <li><a href="#" className="hover:underline">Grievance Redressal</a></li>
                        <li><a href="#" className="hover:underline">EPR Compliance</a></li>
                        <li><a href="#" className="hover:underline">FSSAI Food Safety Connect App</a></li>
                    </ul>
                </div>


                <div className="text-xs leading-6">
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">Mail Us</h4>
                    <p>
                        Flipkart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Devarabeesanahalli Village,<br />
                        Bengaluru, 560103,<br />
                        Karnataka, India
                    </p>
                </div>


                <div className="text-xs leading-6">
                    <h4 className="text-xs text-gray-400 mb-3 uppercase">
                        Registered Office Address
                    </h4>
                    <p>
                        Flipkart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Devarabeesanahalli Village,<br />
                        Bengaluru, 560103,<br />
                        Karnataka, India
                    </p>

                    <p className="mt-3 text-xs text-gray-300">
                        CIN : U51109KA2012PTC066107 <br />
                        Telephone: 044-45614700 / 044-67415800
                    </p>
                </div>

            </div>


            <div className="border-t border-gray-600">
                <div className="py-4 flex flex-col text-sm text-gray-300 gap-2 md:flex-row md:justify-between max-w-7xl mx-auto px-6">
                    <ul className="flex flex-col gap-2 md:flex-row md:gap-6 text-xs">
                        <li className="hover:underline"><a href="#">Become a seller</a></li>
                        <li className="hover:underline"><a href="#">Advertise</a></li>
                        <li className="hover:underline"><a href="#">Gift Cards</a></li>
                        <li className="hover:underline"><a href="#">Help Center</a></li>
                    </ul>
                    <div className="text-xs">
                        © 2007-2026 Flipkart.com
                    </div>
                </div>
            </div>
        </footer>

    )
}
