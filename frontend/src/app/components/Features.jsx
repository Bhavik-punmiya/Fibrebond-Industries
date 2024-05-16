const FeatureComponent = () => {

    const features = [
        {
            icon:
            <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon1-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width="80" height="80" />,
            title: "Empowering Skills",
            desc: "Transform lives with comprehensive skill training, breaking gender barriers for equal, high-paying opportunities and reshaping norms"
        },
        {
            icon:
            <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon2-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width="80" height="80" />,
            title: "Fashion Beyond Borders",
            desc: "Experience our stand design and belt collection at retail partners. Uniting style and quality, we redefine fashion trends together."
        },
        {
            icon:
                <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon3-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width="80" height="80" />,     
            title: "State-of-the-Art Infrastructure",
            desc: "With facilities spanning 65,000 sqft. in Navi Mumbai, Aligarh, and Vasai, our manufacturing unit leads India's fashion belt production."
        },
        {
            icon:
                <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon4-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width="80" height="80" />, 
            title: "Expertise Empowers: Skills Breaking Barriers",
            desc: "Our dedicated team of 350+ professionals undergoes regular training, guaranteeing top-tier craftsmanship and service excellence."
        },
        {
            icon:
                 <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon5-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width="80" height="80" />,
            title: "Supreme Belt Range",
            desc: "From PU coated fabric to vegan leather, our collection includes ladies', children's, and gents' belts. Craftsmanship that sets trends."
        },
        {
            icon:
                <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/icon6-1.jpg?fit=80%2C80&ssl=1" alt="Description of the image" width= "80" height="80" />,
            title: "In-House Belt Buckles",
            desc: "Elevate your accessory collection with our in-house designed belt buckles, Combining impeccable quality, strength, and customization."
        },
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            What We Offer ?
                        </h3>
                        <p className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.
                        </p>
                    </div>
                    <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="bg-white space-y-3 p-4 border rounded-lg">
                                    <div className="text-indigo-600 pb-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default FeatureComponent;