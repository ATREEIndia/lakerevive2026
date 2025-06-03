'use client'
import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Textbox from '../Components/Textbox'
import Heading from '../Components/Heading'
import HomeRowsection from '../Components/HomeRowsection'
import image_userfriendly from '@/public/userfireldy.jpg'
import image_climate_resilience from '@/public/climate resillience.jpg'
import image_secchi_disk from '@/public/secchi_disk.jpg'
import image_algal from '@/public/algalBloom2.jpg'
import image_urban_Lake_crisis from '@/public/ulc.jpg'
import image_democratic_lake_conservation from '@/public/democartic_lake_conservation.jpg'
import image_knowledge_gap from '@/public/knowledge.jpg'
import image_sv from '@/public/sv_2.jpg'
import image_tp from '@/public/tp.jpg'
import Link from 'next/link'
import SubHeading from '../Components/SubHeading'
import TablesAccordion from '../Components/TableAccordion'
import { currentlanguage } from '../Components/Languagecontex'

const page = () => {
    const { isEng } = currentlanguage()
    return (
        <div>
            <Navbar currentpage='Lake Health Index'></Navbar>
            <Banner title={isEng?`Lake health index`:'ಕೆರೆಯ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ'}></Banner>

            {/* kannda and english */}
            {/* english */}
            <div className={` ${isEng ? "block" : 'hidden'}`}>


                <div className={` flex-col gap-4 p-4 lg:px-8`}>
                    <Textbox Content='To effectively track the performance of restoration interventions over time, 
                it is essential to equip communities and stakeholders with a simple yet robust tool that can reflect changes in lake health. 
                Drawing on both primary and secondary research, ATREE has developed a Lake Health Index (LHI), which has been fully integrated into the 
                LakeRevive tool. This index serves multiple purposes: it assesses the existing condition of the lake on the basis of water clarity, nutrient 
                levels, algal presence and the shoreline condition, supports the identification of appropriate restoration solutions, enables monitoring of 
                intervention performance over time and guides the incorporation of new frameworks to enhance the ecological and use value of the lake. 
                The tool is a practical resource for ongoing monitoring, evaluation and adaptive learning, empowering local communities to make informed, 
                evidence-based decisions.'></Textbox>
                </div>
                <div className='w-full p-8 flex flex-col justify-center items-center bg-gray-200'>
                    <Link href={"https://docs.google.com/spreadsheets/d/1NMARjNp-02n8yQpHoSy2yTaX2p_SrgDM/export?format=xlsx"} target='_blank'>

                        <button
                            className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                        >
                            Download the lake health index sheet
                        </button>
                    </Link>
                </div>

                <div className="w-full flex justify-center items-center mt-4">
                    <Heading customClassname="text-3xl" text=" How to use this?"></Heading>
                </div>

                <div className="w-full mt-4 lg:px-4 flex flex-col gap-4">
                    <HomeRowsection
                        section_image={image_secchi_disk}
                        heading="Water clarity (secchi depth):"
                        content={
                            <>
                                <p>
                                    Users should enter the Secchi Depth (SD) measured at the centre of the lake. In case the centre of the lake is not accessible,
                                    the SD can be measured at the outlet. However, users must ensure that the SD is measured at the same spot to get consistent data for
                                    interpretation and decision-making. This value, representing water transparency, is obtained by lowering a Secchi disk into the water and noting the
                                    depth at which it disappears from view.{' '}
                                    <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                        Refer to this video on Secchi depth.
                                    </Link>
                                    {' '}The measured SD is then scored from 1 to 5 according to the criteria presented in {''}<Link href="#table" className="text-green-600 underline scroll-smooth">Table 1.</Link>{''}
                                </p>
                            </>
                        }>

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_tp}
                        heading="Nutrient levels (Total phosphorus levels):"
                        content={<>
                            <p>Users should enter the Total Phosphorus (TP) concentration in the lake, as reported in the
                                detailed project report or can get a water sample tested in the accredited water testing laboratory. The
                                TP data collected/reported should coincide with the location of SD measurements. This parameter is also scored on a
                                scale of 1 to 5 based on predefined scoring guidelines shown in {''}<Link href="#table" className="text-green-600 underline scroll-smooth">Table 2.</Link>{''}</p>
                        </>}
                    >

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_algal}
                        heading="Algal presence:"
                        content={<>
                            <p>For this parameter, users assign a score from 1 to 5, selecting the value that best matches the current condition of the
                                lake according to descriptive categories provided in {''}<Link href="#table" className="text-green-600 underline scroll-smooth">Table 3.</Link>{''}</p>
                        </>}
                    >

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_sv}
                        heading="Shoreline condition:"
                        content={<>
                            <p>Similarly, users evaluate and score the shoreline condition from 1 to 5, based on the description that most closely reflects the actual state of the lake as shown in {''}<Link href="#table" className="text-green-600 underline scroll-smooth">Table 4.</Link>{''}
                                {''}<br></br> <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                    Refer to this video on  understand importance of shoreline.
                                </Link> {''}
                            </p>
                        </>}></HomeRowsection>

                </div>

                <div>
                    <SubHeading customClassName='w-full flex justify-center items-center text-xl mt-5' text="Assessment Tables" />
                    <div id='table' className='cursor-pointer'>
                        <TablesAccordion></TablesAccordion>
                    </div>

                </div>
            </div>

            {/* kannada version */}
            <div className={` ${isEng?"hidden":'block'}`}>

                
                <div className={` flex-col gap-4 p-4 lg:px-8`}>
                    <Textbox Content='ಪುನಶ್ಚೇತನ ಹಸ್ತಕ್ಷೇಪಗಳ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಮಯದೊಂದಿಗೆ ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಅನುಸರಿಸಲು, ಕೆರೆಗಳ ಆರೋಗ್ಯದಲ್ಲಿ ಸಂಭವಿಸಿದ ಬದಲಾವಣೆಗಳನ್ನು ತೋರಿಸಲು ಸಮುದಾಯಗಳು ಮತ್ತು ಹಿತಾಸಕ್ತ ಪಕ್ಷಗಳಿಗೆ ಸರಳವಾದರೂ ಬಲಿಷ್ಠವಾದ ಸಾಧನವನ್ನು ಒದಗಿಸುವುದು ಅಗತ್ಯವಾಗಿದೆ. ಮೂಲ ಹಾಗೂ ದ್ವಿತೀಯಿಕ ಸಂಶೋಧನೆ ಆಧರಿಸಿ, ATREE ಸಂಸ್ಥೆಯು ಕೆರೆ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕವನ್ನು (LHI) ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ್ದು, ಇದನ್ನು ಲೇಕ್‌ ರಿವೈವ್ ಸಾಧನದಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ಏಕೀಕರಿಸಲಾಗಿದೆ.ಈ ಸೂಚ್ಯಂಕ ಹಲವಾರು ಉದ್ದೇಶಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತದೆ:ಜಲಪಾರದರ್ಶಕತೆ, ಪೋಷಕಾಂಶ ಮಟ್ಟ, ಶೈವಲಗಳ ಹಾಜರಾತಿ ಮತ್ತು ತೀರದ ಪರಿಸ್ಥಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಕೆರೆಯ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಯನ್ನು ಅಳೆಯುವುದು.ಸೂಕ್ತ ಪುನಶ್ಚೇತನ ಪರಿಹಾರಗಳ ಗುರುತಿಸುವಿಕೆಗೆ ಬೆಂಬಲ ನೀಡುವುದು.ಹಸ್ತಕ್ಷೇಪಗಳ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸಮಯದೊಂದಿಗೆ ಗಮನಿಸುವುದು.ಪರಿಸರೀಯ ಮತ್ತು ಉಪಯೋಗ ಮೌಲ್ಯವನ್ನು ಸುಧಾರಿಸಲು ಹೊಸ ರೂಪರೇಖೆಗಳ ಜಾರಿಗೊಳಿಸುವಿಕೆಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವುದು.ಈ ಸಾಧನವು ನಿರಂತರ ಮೌಲ್ಯಮಾಪನ, ನಿಗಾವಣೆಗೆ ಹಾಗೂ ಜ್ಞಾನ ಆಧಾರಿತ ನಿರ್ಧಾರಗಳಿಗೆ ಸಮುದಾಯಗಳನ್ನು ಸಶಕ್ತಗೊಳಿಸುವ ಉಪಯುಕ್ತ ಸಂಪನ್ಮೂಲವಾಗಿದೆ.'></Textbox>
                </div>
                <div className='w-full p-8 flex flex-col justify-center items-center bg-gray-200'>
                    <Link href={"https://docs.google.com/spreadsheets/d/1NMARjNp-02n8yQpHoSy2yTaX2p_SrgDM/export?format=xlsx"} target='_blank'>

                        <button
                            className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                        >
                            ಕೆರೆಯ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ
                        </button>
                    </Link>
                </div>

                <div className="w-full flex justify-center items-center mt-4">
                    <Heading customClassname="text-3xl" text="ಇದನ್ನು ಹೇಗೆ ಉಪಯೋಗಿಸಬೇಕು?"></Heading>
                </div>

                <div className="w-full mt-4 lg:px-4 flex flex-col gap-4">
                    <HomeRowsection
                        section_image={image_secchi_disk}
                        heading=" ಜಲಪಾರದರ್ಶಕತೆ (ಸೆಚ್ಚಿ ಆಳ):"
                        content={
                            <>
                                <p>
                                    ಕೆರೆಯ ಮಧ್ಯಭಾಗದಲ್ಲಿ ಅಳೆಯಲ್ಪಟ್ಟ ಸೆಚ್ಚಿ ಆಳವನ್ನು(SD) ನಮೂದಿಸಬೇಕು. ಮಧ್ಯಭಾಗ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ, ಸೆಚ್ಚಿ ಡೆಪ್ತ್ ಅನ್ನು ಔಟ್‌ಲೆಟ್‌ನಲ್ಲಿ ಅಳೆಯಬಹುದು. ಆದಾಗ್ಯೂ, ವ್ಯಾಖ್ಯಾನ ಮತ್ತು ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವಿಕೆಗೆ ಸ್ಥಿರ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ಬಳಕೆದಾರರು SD ಅನ್ನು ಅದೇ ಸ್ಥಳದಲ್ಲಿ ಅಳೆಯುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು. ನೀರಿನ ಪಾರದರ್ಶಕತೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಈ ಮೌಲ್ಯವನ್ನು ಸೆಚ್ಚಿ ಡಿಸ್ಕ್ ಅನ್ನು ನೀರಿನಲ್ಲಿ ಇಳಿಸಿ ಮತ್ತು ಅದು ನೋಟದಿಂದ ಕಣ್ಮರೆಯಾಗುವ ಆಳವನ್ನು ಗಮನಿಸುವ ಮೂಲಕ ಪಡೆಯಲಾಗುತ್ತದೆ{' '}
                                    <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                        (ಉತ್ತಮ ತಿಳುವಳಿಕೆಗಾಗಿ ಈ ವೀಡಿಯೊವನ್ನು ನೋಡಿ: ಸೆಚ್ಚಿಆಳ ವೀಡಿಯೊ). 
                                    </Link>
                                    {' '}ಅಳೆಯಲಾದ ಸೆಚ್ಚಿ ಡೆಪ್ತ್ ಅನ್ನು ನಂತರ{''}<Link href="#tableka" className="text-green-600 underline scroll-smooth"> ಪಟ್ಟಿ 1</Link>{''}ರಲ್ಲಿ ಪ್ರಸ್ತುತಪಡಿಸಲಾದ ಮಾನದಂಡಗಳ ಪ್ರಕಾರ 1 ರಿಂದ 5 ರವರೆಗೆ ಸ್ಕೋರ್ ಮಾಡಲಾಗುತ್ತದೆ.

                                </p>
                            </>
                        }>

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_tp}
                        heading=" ಪೋಷಕಾಂಶ ಮಟ್ಟ (ಒಟ್ಟು ರಂಜಕ ಮಟ್ಟ):"
                        content={<>
                            <p>ಬಳಕೆದಾರರು ವಿವರವಾದ ಯೋಜನಾ ವರದಿಯಲ್ಲಿ ವರದಿಯಾದಂತೆ  ಕೆರೆಯಲ್ಲಿನ ಒಟ್ಟು ರಂಜಕ ಮಟ್ಟ (TP) ಸಾಂದ್ರತೆಯನ್ನು ನಮೂದಿಸಬೇಕು ಅಥವಾ ಮಾನ್ಯತೆ ಪಡೆದ ನೀರಿನ ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ ನೀರಿನ ಮಾದರಿಯನ್ನು ಪರೀಕ್ಷಿಸಿಸಬಹುದು. ಸಂಗ್ರಹಿಸಲಾದ/ವರದಿಯಾದ TP ಡೇಟಾವು SD ಮಾಪನಗಳ ಸ್ಥಳದೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು. {''}<Link href="#tableka" className="text-green-600 underline scroll-smooth"> ಪಟ್ಟಿ 2 </Link>{''}ರಲ್ಲಿ ತೋರಿಸಲಾದ ಪೂರ್ವನಿರ್ಧರಿತ ಸ್ಕೋರಿಂಗ್ ಮಾರ್ಗಸೂಚಿಗಳ ಆಧಾರದ ಮೇಲೆ ಈ ಪ್ಯಾರಾಮೀಟರ್ ಅನ್ನು ಸಹ 1 ರಿಂದ 5 ರ ಪ್ರಮಾಣದಲ್ಲಿ ಸ್ಕೋರ್ ಮಾಡಲಾಗುತ್ತದೆ.
</p>
                        </>}
                    >

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_algal}
                        heading="ಶೈವಲದ ಹಾಜರಾತಿ:"
                        content={<>
                            <p>ಈ ನಿಯತಾಂಕಕ್ಕಾಗಿ, ಬಳಕೆದಾರರು 1 ರಿಂದ 5 ರವರೆಗೆ ಅಂಕಗಳನ್ನು ನಿಗದಿಪಡಿಸುತ್ತಾರೆ,{''}<Link href="#tableka" className="text-green-600 underline scroll-smooth"> ಪಟ್ಟಿ 3 </Link>{''}ರಲ್ಲಿ ಒದಗಿಸಲಾದ ವಿವರಣಾತ್ಮಕ ವರ್ಗಗಳ ಪ್ರಕಾರ ಸರೋವರದ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಗೆ ಉತ್ತಮವಾಗಿ ಹೊಂದಿಕೆಯಾಗುವ ಮೌಲ್ಯವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.</p>
                        </>}
                    >

                    </HomeRowsection>


                    <HomeRowsection
                        section_image={image_sv}
                        heading="ತೀರದ/ತಟದ ಪರಿಸ್ಥಿತಿ:"
                        content={<>
                            <p> {''}<Link href="#tableka" className="text-green-600 underline scroll-smooth">ಪಟ್ಟಿ 4 </Link>{''}ರಲ್ಲಿ ತೋರಿಸಿರುವಂತೆ ಸರೋವರದ ನಿಜವಾದ ಸ್ಥಿತಿಯನ್ನು ಹೆಚ್ಚು ನಿಕಟವಾಗಿ ಪ್ರತಿಬಿಂಬಿಸುವ ವಿವರಣೆಯ ಆಧಾರದ ಮೇಲೆ ಬಳಕೆದಾರರು ತಟದ ಸ್ಥಿತಿಯನ್ನು 1 ರಿಂದ 5 ರವರೆಗೆ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ಸ್ಕೋರ್ ಮಾಡುತ್ತಾರೆ
                                {''}<br></br> <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                    (ತಟದ ಪ್ರಾಮುಖ್ಯತೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಈ ವೀಡಿಯೊವನ್ನು ನೋಡಿ: ತಟದ ವೀಡಿಯೊ)

                                </Link> {''}
                            </p>
                        </>}></HomeRowsection>

                </div>

                <div>
                    <SubHeading customClassName='w-full flex justify-center items-center text-xl mt-5' text="Assessment Tables" />
                    <div id='tableka' className='cursor-pointer'>
                        <TablesAccordion></TablesAccordion>
                    </div>

                </div>


            </div>







        </div>
    )
}

export default page
