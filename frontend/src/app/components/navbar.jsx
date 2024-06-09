'use client'
import { useState, useRef, useEffect } from "react"

// Profile Dropdown
const ProfileDropDown = (props) => {

    const [state, setState] = useState(false)
    const profileRef = useRef('/personal-details')

const navigation = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Blog", path: "/blog" },
    { title: "Videos", path: "/videos" },
    { title: "Contact Us", path: "/contact" },
];

    
    useEffect(() => {
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [])

    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="w-10 h-10 outline-none ring-offset-2"
                   onClick={() => window.location.href = '/personal-details'}
                >
                    <img
                        src="data:image/png;base64,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"
                        className="w-full h-full rounded-full"
                    />
                    
                </button>
                <button ref={profileRef} className="w-10 h-10 outline-none ring-offset-2 "
                    onClick={() => setState(!state)}
                >
                    <img
                        src="https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3041-thumb.png"
                        className="w-full h-full rounded-full" 
                    />
                </button>   
                <i class="ws-svg-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 21.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.25 21.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M0 3a.75.75 0 01.75-.75h1.577A1.5 1.5 0 013.77 3.338L4.53 6h16.256a.75.75 0 01.72.956l-2.474 8.662a2.25 2.25 0 01-2.163 1.632H7.88a2.25 2.25 0 01-2.163-1.632l-2.47-8.645a.738.738 0 01-.01-.033l-.91-3.19H.75A.75.75 0 010 3zm4.959 4.5l2.201 7.706a.75.75 0 00.721.544h8.988a.75.75 0 00.72-.544L19.792 7.5H4.96z"></path></svg></i>
                <div className="lg:hidden">
                    <span className="block">Micheal John</span>
                    <span className="block text-sm text-gray-500">john@gmail.com</span>
                </div>
            </div>
            <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {
                    navigation.map((item, idx) => (
                        <li>
                            <a key={idx} className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" href={item.path}>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default () => {

    const [menuState, setMenuState] = useState(false)

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Blog", path: "/blog" },
    { title: "Videos", path: "/videos" },
    { title: "Contact Us", path: "/contact" },
];

    return (
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">

                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                        <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="text-gray-600 hover:text-gray-900">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <ProfileDropDown 
                            class="mt-5 pt-5 border-t lg:hidden"
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        <form className="flex items-center space-x-2 border rounded-md p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                                type="text"
                                placeholder="Search"
                            />
                        </form>
                        <ProfileDropDown 
                            class="hidden lg:block"
                        />
                        <button 
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}