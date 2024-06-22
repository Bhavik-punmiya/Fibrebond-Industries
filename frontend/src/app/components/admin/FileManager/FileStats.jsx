"use client"
import ChartOne from "@/components/Charts/ChartOne";

const FileStats = () => {
    return (
        <div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex justify-between border-b border-r border-stroke px-7.5 py-7 dark:border-strokedark xl:border-b-0">
                <div className="flex items-center gap-5.5">
                    <div className="flex h-15 w-14.5 items-center justify-center rounded-lg bg-[#9B51E0]/[0.08]">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.01313 5.3272C4.76381 5.3272 4.52469 5.42625 4.34839 5.60254C4.17209 5.77884 4.07305 6.01796 4.07305 6.26728V23.8154C4.07305 24.0648 4.17209 24.3039 4.34839 24.4802C4.52469 24.6565 4.76381 24.7555 5.01313 24.7555H25.0682C25.3175 24.7555 25.5566 24.6565 25.7329 24.4802C25.9092 24.3039 26.0082 24.0648 26.0082 23.8154V10.0276C26.0082 9.77828 25.9092 9.53916 25.7329 9.36286C25.5566 9.18656 25.3175 9.08752 25.0682 9.08752H13.7872C13.2633 9.08752 12.7741 8.82571 12.4835 8.38983L10.4418 5.3272H5.01313ZM2.13261 3.38676C2.89657 2.62279 3.93272 2.1936 5.01313 2.1936H11.2803C11.8042 2.1936 12.2934 2.45542 12.584 2.8913L14.6257 5.95392H25.0682C26.1486 5.95392 27.1847 6.38311 27.9487 7.14707C28.7126 7.91104 29.1418 8.94719 29.1418 10.0276V23.8154C29.1418 24.8958 28.7126 25.932 27.9487 26.696C27.1847 27.4599 26.1486 27.8891 25.0682 27.8891H5.01313C3.93272 27.8891 2.89657 27.4599 2.13261 26.696C1.36864 25.932 0.939453 24.8958 0.939453 23.8154V6.26728C0.939453 5.18688 1.36864 4.15072 2.13261 3.38676Z" fill="#9B51E0"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#9B51E0]">Design</p>
                        <span className="font-medium">17 files</span>
                    </div>
                </div>
                <div>
                    <p className="mt-1.5 font-medium text-black dark:text-white">459 MB</p>
                </div>
            </div>
            <div className="flex justify-between border-b border-r border-stroke px-7.5 py-7 dark:border-strokedark xl:border-b-0">
                <div className="flex items-center gap-5.5">
                    <div className="flex h-15 w-14.5 items-center justify-center rounded-lg bg-[#219653]/[0.08]">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.84516 5.3272C6.32597 5.3272 5.90508 5.74809 5.90508 6.26728V23.8154C5.90508 24.3346 6.32597 24.7555 6.84516 24.7555H24.3933C24.9125 24.7555 25.3334 24.3346 25.3334 23.8154V6.26728C25.3334 5.74809 24.9125 5.3272 24.3933 5.3272H6.84516ZM2.77148 6.26728C2.77148 4.01745 4.59533 2.1936 6.84516 2.1936H24.3933C26.6431 2.1936 28.467 4.01745 28.467 6.26728V23.8154C28.467 26.0653 26.6431 27.8891 24.3933 27.8891H6.84516C4.59533 27.8891 2.77148 26.0653 2.77148 23.8154V6.26728Z" fill="#219653"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2323 9.71414C10.7132 9.71414 10.2923 10.135 10.2923 10.6542C10.2923 11.1734 10.7132 11.5943 11.2323 11.5943C11.7515 11.5943 12.1724 11.1734 12.1724 10.6542C12.1724 10.135 11.7515 9.71414 11.2323 9.71414ZM8.41211 10.6542C8.41211 9.09665 9.67477 7.83398 11.2323 7.83398C12.7899 7.83398 14.0526 9.09665 14.0526 10.6542C14.0526 12.2118 12.7899 13.4745 11.2323 13.4745C9.67477 13.4745 8.41211 12.2118 8.41211 10.6542Z" fill="#219653"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.528 11.4264C20.1399 10.8146 21.1319 10.8146 21.7438 11.4264L28.011 17.6936C28.6228 18.3055 28.6228 19.2975 28.011 19.9094C27.3991 20.5213 26.4071 20.5213 25.7952 19.9094L20.6359 14.7501L7.95594 27.4301C7.34407 28.0419 6.35203 28.0419 5.74015 27.4301C5.12828 26.8182 5.12828 25.8261 5.74015 25.2143L19.528 11.4264Z" fill="#219653"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#219653]">Image</p>
                        <span className="font-medium">12 files</span>
                    </div>
                </div>
                <div>
                    <p className="mt-1.5 font-medium text-black dark:text-white">120 MB</p>
                </div>
            </div>
            <div className="flex justify-between border-b border-r border-stroke px-7.5 py-7 dark:border-strokedark sm:border-b-0">
                <div className="flex items-center gap-5.5">
                    <div className="flex h-15 w-14.5 items-center justify-center rounded-lg bg-[#2F80ED]/[0.08]">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9372 2.56492C28.2886 2.86261 28.4913 3.29985 28.4913 3.76041V20.0551C28.4913 20.9204 27.7898 21.6219 26.9245 21.6219C26.0592 21.6219 25.3577 20.9204 25.3577 20.0551V5.60996L13.45 7.59457V22.562C13.45 23.4273 12.7485 24.1288 11.8832 24.1288C11.0179 24.1288 10.3164 23.4273 10.3164 22.562V6.26729C10.3164 5.50138 10.8701 4.84773 11.6256 4.72181L26.6669 2.21493C27.1212 2.13922 27.5858 2.26722 27.9372 2.56492Z" fill="#2F80ED"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.12204 20.3685C6.91059 20.3685 5.92852 21.3505 5.92852 22.562C5.92852 23.7734 6.91059 24.7555 8.12204 24.7555C9.33349 24.7555 10.3156 23.7734 10.3156 22.562C10.3156 21.3505 9.33349 20.3685 8.12204 20.3685ZM2.79492 22.562C2.79492 19.6199 5.17995 17.2349 8.12204 17.2349C11.0641 17.2349 13.4492 19.6199 13.4492 22.562C13.4492 25.5041 11.0641 27.8891 8.12204 27.8891C5.17995 27.8891 2.79492 25.5041 2.79492 22.562Z" fill="#2F80ED"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1631 17.8615C21.9516 17.8615 20.9695 18.8436 20.9695 20.055C20.9695 21.2665 21.9516 22.2485 23.1631 22.2485C24.3745 22.2485 25.3566 21.2665 25.3566 20.055C25.3566 18.8436 24.3745 17.8615 23.1631 17.8615ZM17.8359 20.055C17.8359 17.1129 20.221 14.7279 23.1631 14.7279C26.1051 14.7279 28.4902 17.1129 28.4902 20.055C28.4902 22.9971 26.1051 25.3821 23.1631 25.3821C20.221 25.3821 17.8359 22.9971 17.8359 20.055Z" fill="#2F80ED"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#2F80ED]">Music</p>
                        <span className="font-medium">39 files</span>
                    </div>
                </div>
                <div>
                    <p className="mt-1.5 font-medium text-black dark:text-white">374 MB</p>
                </div>
            </div>
            <div className="flex justify-between px-7.5 py-7">
                <div className="flex items-center gap-5.5">
                    <div className="flex h-15 w-14.5 items-center justify-center rounded-lg bg-[#F2994A]/[0.08]">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.27128 2.13334C6.03524 1.36938 7.0714 0.940186 8.1518 0.940186H18.1793C18.5949 0.940186 18.9934 1.10526 19.2872 1.39909L26.8078 8.91973C27.1017 9.21356 27.2668 9.61208 27.2668 10.0276V25.0689C27.2668 26.1493 26.8376 27.1855 26.0736 27.9494C25.3096 28.7134 24.2735 29.1426 23.1931 29.1426H8.1518C7.0714 29.1426 6.03524 28.7134 5.27128 27.9494C4.50731 27.1855 4.07812 26.1493 4.07812 25.0689V5.01386C4.07812 3.93346 4.50731 2.8973 5.27128 2.13334ZM8.1518 4.07378C7.90248 4.07378 7.66337 4.17283 7.48707 4.34913C7.31077 4.52543 7.21172 4.76454 7.21172 5.01386V25.0689C7.21172 25.3182 7.31077 25.5573 7.48707 25.7336C7.66337 25.9099 7.90248 26.009 8.1518 26.009H23.1931C23.4424 26.009 23.6815 25.9099 23.8578 25.7336C24.0341 25.5573 24.1332 25.3182 24.1332 25.0689V10.6766L17.5303 4.07378H8.1518Z" fill="#F2994A"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1801 0.940186C19.0454 0.940186 19.7469 1.64167 19.7469 2.50698V8.46082H25.7007C26.566 8.46082 27.2675 9.1623 27.2675 10.0276C27.2675 10.8929 26.566 11.5944 25.7007 11.5944H18.1801C17.3148 11.5944 16.6133 10.8929 16.6133 10.0276V2.50698C16.6133 1.64167 17.3148 0.940186 18.1801 0.940186Z" fill="#F2994A"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0918 16.2947C9.0918 15.4294 9.79328 14.7279 10.6586 14.7279H20.6861C21.5514 14.7279 22.2529 15.4294 22.2529 16.2947C22.2529 17.16 21.5514 17.8615 20.6861 17.8615H10.6586C9.79328 17.8615 9.0918 17.16 9.0918 16.2947Z" fill="#F2994A"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0918 21.3085C9.0918 20.4432 9.79328 19.7417 10.6586 19.7417H20.6861C21.5514 19.7417 22.2529 20.4432 22.2529 21.3085C22.2529 22.1738 21.5514 22.8753 20.6861 22.8753H10.6586C9.79328 22.8753 9.0918 22.1738 9.0918 21.3085Z" fill="#F2994A"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0918 11.281C9.0918 10.4157 9.79328 9.71423 10.6586 9.71423H13.1655C14.0308 9.71423 14.7323 10.4157 14.7323 11.281C14.7323 12.1464 14.0308 12.8478 13.1655 12.8478H10.6586C9.79328 12.8478 9.0918 12.1464 9.0918 11.281Z" fill="#F2994A"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#F2994A]">Docs</p>
                        <span className="font-medium">78 files</span>
                    </div>
                </div>
                <div>
                    <p className="mt-1.5 font-medium text-black dark:text-white">237 MB</p>
                </div>
            </div>
        </div>
    </div>
    {/* FIle Total Stats  */}
    
    <div className = "mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
    <div className="col-span-12 xl:col-span-8">
        <ChartOne />
    </div>
    <div className="col-span-12 xl:col-span-4">
   <div className="flex flex-col gap-4 sm:flex-row md:gap-6 xl:flex-col xl:gap-7.5">
      <div className="relative rounded-sm border border-stroke bg-white py-8 pl-7.5 pr-12 shadow-default dark:border-strokedark dark:bg-boxdark xl:py-11 2xl:pl-12 2xl:pr-16">
         <div className="flex flex-col gap-3 2xsm:flex-row 2xsm:items-center 2xl:gap-9">
            <div className="relative flex items-center justify-center">
               <svg className="h-33 w-33 -rotate-90 transform">
                  <circle className="text-stroke dark:text-strokedark" stroke-width="16" stroke="currentColor" fill="transparent" r="58" cx="66" cy="66"></circle>
                  <circle className="text-primary" stroke-width="16" stroke-dasharray="364.424747816416" stroke-dashoffset="54.66371217246245" stroke="currentColor" fill="transparent" r="58" cx="66" cy="66"></circle>
               </svg>
               <span className="absolute text-xl font-bold text-black dark:text-white">85%</span>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-black dark:text-white">Available Storage</h3>
               <p className="mt-3.5 font-medium"><span className="text-black dark:text-white">150</span><span className="text-sm"> GB</span> /<span className="text-black dark:text-white">512</span><span className="text-sm"> GB</span></p>
            </div>
         </div>
         <button className="absolute -right-5 top-1/2 -translate-y-1/2 rotate-[270deg] rounded-t-lg bg-[#13C296] px-4 py-1 font-medium text-white">Clean</button>
      </div>
      <div className="flex-grow rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
         <div className="flex gap-4">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-md bg-[#F6F6F8] dark:bg-graydark">
               <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_608_17998)">
                     <path d="M23.1754 8.11967C22.8861 7.83042 22.4884 7.64963 22.0184 7.64963H17.6795V6.20336C17.6795 5.9141 17.5711 4.75708 16.0525 4.75708H7.66407C6.21779 4.75708 6.10932 5.9141 6.10932 6.20336V7.64963H1.77049C1.0112 7.64963 0.324219 8.33661 0.324219 9.09591V18.7498C0.324219 19.5091 1.0112 20.1961 1.77049 20.1961H22.0184C22.7777 20.1961 23.4646 19.5091 23.4646 18.7498V9.16822C23.4646 8.80665 23.3562 8.40893 23.1754 8.11967ZM21.5483 18.2436H2.24053V9.56595H6.10932C7.15787 9.56595 8.02564 8.69818 8.02564 7.64963V6.6734H15.7271V7.64963C15.7271 8.69818 16.5948 9.56595 17.6434 9.56595H21.5122V18.2436H21.5483Z" fill="#3056D3"></path>
                     <path d="M11.4251 9.56592C9.58109 9.56592 8.0625 11.1207 8.0625 12.9285C8.0625 14.8448 9.50878 16.2911 11.4251 16.2911C13.2691 16.2911 14.7877 14.7364 14.7877 12.9285C14.7877 11.1207 13.2329 9.56592 11.4251 9.56592ZM11.4251 14.4109C10.5573 14.4109 9.97882 13.8324 9.97882 12.9647C9.97882 12.2054 10.6658 11.5184 11.4251 11.5184C12.1844 11.5184 12.8714 12.2054 12.8714 12.9647C12.8714 13.6878 12.1844 14.4109 11.4251 14.4109Z" fill="#3056D3"></path>
                     <path d="M4.19303 12.4585C4.73219 12.4585 5.16927 12.0214 5.16927 11.4822C5.16927 10.9431 4.73219 10.506 4.19303 10.506C3.65387 10.506 3.2168 10.9431 3.2168 11.4822C3.2168 12.0214 3.65387 12.4585 4.19303 12.4585Z" fill="#3056D3"></path>
                  </g>
                  <defs>
                     <clipPath id="clip0_608_17998">
                        <rect width="23.1404" height="23.1404" fill="white" transform="translate(0.324219 0.924438)"></rect>
                     </clipPath>
                  </defs>
               </svg>
            </div>
            <div className="flex-grow">
               <div className="mb-3 flex items-center justify-between"><span className="font-medium text-black dark:text-white">Media</span><span className="text-sm font-medium">85 GB</span></div>
               <div className="relative h-1.5 w-full rounded-full bg-stroke dark:bg-strokedark"><span className="absolute left-0 block h-1.5 w-5/6 rounded-full bg-primary"></span></div>
            </div>
         </div>
         <div className="mt-5 flex gap-4">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-md bg-[#F6F6F8] dark:bg-graydark">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_608_18010)">
                     <path d="M22.1991 0.0314941H11.2074C10.5205 0.0314941 9.94196 0.610005 9.94196 1.29699V5.8166H1.58971C0.902729 5.8166 0.324219 6.39511 0.324219 7.08209V16.6275C0.324219 17.0976 0.505003 17.6761 0.902729 17.9653L5.63928 22.5934C6.03701 22.9911 6.50705 23.1719 6.97709 23.1719H12.5814C13.2684 23.1719 13.8469 22.5934 13.8469 21.9064V15.362L15.3293 16.8445C15.7271 17.2422 16.1971 17.423 16.6671 17.423H22.2715C22.9584 17.423 23.537 16.8445 23.537 16.1575V1.29699C23.4646 0.610005 22.8861 0.0314941 22.1991 0.0314941ZM3.03599 17.3868H6.10932V20.3878L3.03599 17.3868ZM11.8944 21.2556H8.02564V16.6998C8.02564 16.0128 7.44713 15.4343 6.76015 15.4343H2.24053V7.73291H11.8944V21.2556ZM13.8107 12.7587V12.5779H14.787V13.6265L13.8107 12.7587ZM21.5483 15.4705H16.7033V11.891C16.7033 11.204 16.1248 10.6255 15.4378 10.6255H13.8107V7.04593C13.8107 6.35895 13.2322 5.78044 12.5453 5.78044H11.8944V1.94781H21.5483V15.4705Z" fill="#F2994A"></path>
                  </g>
                  <defs>
                     <clipPath id="clip0_608_18010">
                        <rect width="23.1404" height="23.1404" fill="white" transform="translate(0.324219 0.0314941)"></rect>
                     </clipPath>
                  </defs>
               </svg>
            </div>
            <div className="flex-grow">
               <div className="mb-3 flex items-center justify-between"><span className="font-medium text-black dark:text-white">Documents</span><span className="text-sm font-medium">25 GB</span></div>
               <div className="relative h-1.5 w-full rounded-full bg-stroke dark:bg-strokedark"><span className="absolute left-0 block h-1.5 w-1/2 rounded-full bg-[#F2994A]"></span></div>
            </div>
         </div>
      </div>
   </div>
   </div>
</div>
    {/* Table */}
    <div className="col-span-12 mt-10">
    

    <div className="rounded-sm border border-stroke bg-white py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
       <div className="flex justify-between gap-2.5 px-6 py-3 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
          <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-3/12">
             <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                <svg className="fill-current" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z" fill=""></path>
                </svg>
             </div>
             <p className="font-medium text-black dark:text-white">Content-script.txt</p>
          </div>
          <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
             <p className="font-medium text-black dark:text-white">File size: 455KB</p>
          </div>
          <div className="hidden w-5/12 xl:block">
             <p className="font-medium text-black dark:text-white">Uploaded on: 25 Nov, 2025</p>
          </div>
          <div className="text-right sm:w-3/12 xl:w-2/12"><button className="inline-flex rounded bg-primary px-3 py-1 font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2.5">Download</button></div>
       </div>
       <div className="flex justify-between gap-2.5 px-6 py-3 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
          <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-3/12">
             <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                <svg className="fill-current" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <g clip-path="url(#clip0_608_18042)">
                      <path d="M12.2493 7.02488C12.6567 7.02488 12.9869 6.69465 12.9869 6.28728C12.9869 5.87992 12.6567 5.54968 12.2493 5.54968C11.842 5.54968 11.5117 5.87992 11.5117 6.28728C11.5117 6.69465 11.842 7.02488 12.2493 7.02488Z" fill=""></path>
                      <path d="M16.7181 7.02488C17.1254 7.02488 17.4557 6.69465 17.4557 6.28728C17.4557 5.87992 17.1254 5.54968 16.7181 5.54968C16.3107 5.54968 15.9805 5.87992 15.9805 6.28728C15.9805 6.69465 16.3107 7.02488 16.7181 7.02488Z" fill=""></path>
                      <path d="M24.3973 8.67366C24.0502 8.67366 23.7031 8.76044 23.356 8.8906L23.2692 8.63027C22.7051 6.89474 21.6638 5.41954 20.3188 4.37822L22.4014 2.25219C22.7051 1.94847 22.7051 1.4712 22.4014 1.16749C22.0977 0.863768 21.6204 0.863768 21.3167 1.16749L19.1473 3.38029C19.1039 3.42368 19.1039 3.46706 19.0605 3.46706C17.7589 2.72946 16.2403 2.33897 14.6349 2.33897C13.0729 2.33897 11.5977 2.72946 10.2961 3.42368C10.2527 3.42368 10.2527 3.38029 10.2093 3.38029L8.0399 1.16749C7.73618 0.863768 7.25891 0.863768 6.95519 1.16749C6.65147 1.4712 6.65147 1.94847 6.95519 2.25219L8.99444 4.29144C7.60601 5.37615 6.5647 6.85135 6.00065 8.58688L5.95726 8.71705C5.61015 8.54349 5.21966 8.45672 4.78578 8.45672C3.31057 8.45672 2.0957 9.67159 2.0957 11.1468V16.0931C2.0957 17.5683 3.31057 18.7831 4.78578 18.7831C5.21966 18.7831 5.61015 18.6964 5.95726 18.5228V21.6901C5.95726 22.2108 6.34775 22.6447 6.9118 22.6447H7.69279V25.812C7.69279 27.2872 8.90766 28.5021 10.3829 28.5021C11.8581 28.5021 13.0729 27.2872 13.0729 25.812V22.6447H15.763V25.812C15.763 27.2872 16.9779 28.5021 18.4531 28.5021C19.9283 28.5021 21.1432 27.2872 21.1432 25.812V22.6447H22.2279C22.7485 22.6447 23.1824 22.2542 23.1824 21.6901V18.6964C23.5295 18.8699 23.92 18.9567 24.3539 18.9567C25.8291 18.9567 27.044 17.7418 27.044 16.2666V11.3637C27.0874 9.88853 25.8725 8.67366 24.3973 8.67366ZM14.6349 3.85756C17.5419 3.85756 20.1886 5.50631 21.4469 8.06622H7.86634C9.08122 5.50631 11.6845 3.85756 14.6349 3.85756ZM4.78578 17.3079C4.13495 17.3079 3.61429 16.7873 3.61429 16.1364V11.1902C3.61429 10.5394 4.13495 10.0187 4.78578 10.0187C5.4366 10.0187 5.95726 10.5394 5.95726 11.1902V16.1364C5.95726 16.7439 5.4366 17.3079 4.78578 17.3079ZM11.5977 25.7686C11.5977 26.4195 11.0771 26.9401 10.4263 26.9401C9.77543 26.9401 9.25477 26.4195 9.25477 25.7686V22.6013H11.5977V25.7686ZM19.668 25.7686C19.668 26.4195 19.1473 26.9401 18.4965 26.9401C17.8456 26.9401 17.325 26.4195 17.325 25.7686V22.6013H19.668V25.7686ZM21.7072 21.1261H21.1865H20.3622H19.9717H15.8064H13.1163H8.99444H8.82089H7.69279H7.47585V16.0931V11.1902V9.6282H21.6638V11.4071V16.3534V21.1261H21.7072ZM25.5688 16.31C25.5688 16.9608 25.0481 17.4815 24.3973 17.4815C23.7465 17.4815 23.2258 16.9608 23.2258 16.31V11.3637C23.2258 10.7129 23.7465 10.1922 24.3973 10.1922C25.0481 10.1922 25.5688 10.7129 25.5688 11.3637V16.31Z" fill=""></path>
                   </g>
                   <defs>
                      <clipPath id="clip0_608_18042">
                         <rect width="27.7685" height="27.7685" fill="white" transform="translate(0.707031 0.820312)"></rect>
                      </clipPath>
                   </defs>
                </svg>
             </div>
             <p className="font-medium text-black dark:text-white">E-commerce.apk</p>
          </div>
          <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
             <p className="font-medium text-black dark:text-white">File size: 55MB</p>
          </div>
          <div className="hidden w-5/12 xl:block">
             <p className="font-medium text-black dark:text-white">Uploaded on: 13 Dec, 2025</p>
          </div>
          <div className="text-right sm:w-3/12 xl:w-2/12"><button className="inline-flex rounded bg-primary px-3 py-1 font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2.5">Download</button></div>
       </div>
       <div className="flex justify-between gap-2.5 px-6 py-3 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
          <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-3/12">
             <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                <svg className="fill-current" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z" fill=""></path>
                </svg>
             </div>
             <p className="font-medium text-black dark:text-white">Random-text.doc</p>
          </div>
          <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
             <p className="font-medium text-black dark:text-white">File size: 455KB</p>
          </div>
          <div className="hidden w-5/12 xl:block">
             <p className="font-medium text-black dark:text-white">Uploaded on: 12 Feb, 2025</p>
          </div>
          <div className="text-right sm:w-3/12 xl:w-2/12"><button className="inline-flex rounded bg-primary px-3 py-1 font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2.5">Download</button></div>
       </div>
       <div className="flex justify-between gap-2.5 px-6 py-3 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
          <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-3/12">
             <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                <svg className="fill-current" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z" fill=""></path>
                </svg>
             </div>
             <p className="font-medium text-black dark:text-white">Random-text.doc</p>
          </div>
          <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
             <p className="font-medium text-black dark:text-white">File size: 455KB</p>
          </div>
          <div className="hidden w-5/12 xl:block">
             <p className="font-medium text-black dark:text-white">Uploaded on: 05 Jan, 2025</p>
          </div>
          <div className="text-right sm:w-3/12 xl:w-2/12"><button className="inline-flex rounded bg-primary px-3 py-1 font-medium text-white hover:bg-opacity-90 sm:px-6 sm:py-2.5">Download</button></div>
       </div>
    </div>
 </div>
 </div>

)}

export default FileStats;