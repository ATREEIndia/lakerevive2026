import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Textbox from '../Components/Textbox'
import Heading from '../Components/Heading'
import HomeRowsection from '../Components/HomeRowsection'
import image_userfriendly from '@/public/userfireldy.jpg'
import image_climate_resilience from '@/public/climate resillience.jpg'
import image_secchi_disk from '@/public/secchi_disk.jpg'
import image_algal from '@/public/algalBloom.jpg'
import image_urban_Lake_crisis from '@/public/ulc.jpg'
import image_democratic_lake_conservation from '@/public/democartic_lake_conservation.jpg'
import image_knowledge_gap from '@/public/knowledge.jpg'
import image_clean_lake from '@/public/clean_lake.jpg'
import Link from 'next/link'
import SubHeading from '../Components/SubHeading'
import TablesAccordion from '../Components/TableAccordion'

const page = () => {
    return (
        <div>
            <Navbar currentpage='Lake health index'></Navbar>
            <Banner></Banner>

            <div className='flex flex-col gap-4 p-4 lg:px-8'>
                <Textbox Content='To effectively track the performance of restoration interventions over time, 
                it is essential to equip communities and stakeholders with a simple yet robust tool that can reflect changes in lake health. 
                Drawing on both primary and secondary research, ATREE has developed a Lake Health Index (LHI), which has been fully integrated into the 
                LakeRevive tool. This index serves multiple purposes: it assesses the existing condition of the lake on the basis of water clarity, nutrient 
                levels, algal presence and the shoreline condition, supports the identification of appropriate restoration solutions, enables monitoring of 
                intervention performance over time and guides the incorporation of new frameworks to enhance the ecological and use value of the lake. 
                The tool is a practical resource for ongoing monitoring, evaluation and adaptive learning, empowering local communities to make informed, 
                evidence-based decisions.'></Textbox>
            </div>

            <div className="w-full flex justify-center items-center">
                <Heading customClassname="text-3xl" text=" How to use this tool?"></Heading>
            </div>

            <div className="w-full mt-4 lg:px-4 flex flex-col gap-4">
                <HomeRowsection
                    section_image={image_secchi_disk}
                    heading="Water clarity (Secchi Depth):"
                    content={
                        <>
                            <p>
                                Users should enter the Secchi depth (SD) measured at the centre of the lake. In case the centre of the lake is not accessible,
                                the Secchi depth can be measured at the outlet. However, users must ensure that the SD is measured at the same spot to get consistent data for
                                interpretation and decision-making. This value, representing water transparency, is obtained by lowering a Secchi disk into the water and noting the
                                depth at which it disappears from view.{' '}
                                <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                    Refer to this video on Secchi depth.
                                </Link>
                                {' '}The measured Secchi depth is then scored from 1 to 5 according to the criteria presented in Table 1.
                            </p>
                        </>
                    }>

                </HomeRowsection>


                <HomeRowsection
                    section_image={image_knowledge_gap}
                    heading="Nutrient levels (Total Phosphorus levels):"
                    content="Users should enter the total phosphorus(TP) concentration in the lake, as reported in the 
                    detailed project report or can get a water sample tested in the accredited water testing laboratory. The 
                    TP data collected/reported should coincide with the location of SD measurements. This parameter is also scored on a 
                    scale of 1 to 5 based on predefined scoring guidelines shown in table 2.">

                </HomeRowsection>



                <HomeRowsection
                    section_image={image_democratic_lake_conservation}
                    heading="Democratising Lake Conservation"
                    content="Lake restoration has traditionally required specialised expertise that is often inaccessible to local communities and smaller organisations. 
                          LakeRevive democratises this process by making scientific decision-making available to a wider audience, empowering local stakeholders to take meaningful 
                          action for their neighborhood lakes."></HomeRowsection>

                <HomeRowsection
                    section_image={image_algal}
                    heading="Algal presence:"
                    content="For this parameter, users assign a score from 1 to 5, selecting the value that best matches the current condition of the 
                    lake according to descriptive categories provided in table 3.">

                </HomeRowsection>


                <HomeRowsection
                    section_image={image_clean_lake}
                    heading="Shoreline condition:"
                    content={<>
                        <p>Similarly, users evaluate and score the shoreline condition from 1 to 5, based on the description that most closely reflects the actual state of the lake as shown in table 4.
                            {''} <Link href="https://youtu.be/QGAwMq_VobI?si=db27C2PY9ThdhmMa" className="text-green-600 underline" target="_blank">
                                Refer to this video on  understand importance of shoreline.
                            </Link> {''}
                        </p>
                    </>}></HomeRowsection>

            </div>

            <div>
                <SubHeading customClassName='w-full flex justify-center items-center text-xl mt-5' text="Assessment Tables" />
                <div className='cursor-pointer'>
                    <TablesAccordion></TablesAccordion>
                </div>

            </div>
            <div className='w-full py-4 flex flex-col justify-center items-center pb-10'>
                <Link href={"https://docs.google.com/spreadsheets/d/1NMARjNp-02n8yQpHoSy2yTaX2p_SrgDM/export?format=xlsx"} target='_blank'>

                    <button
                        className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                    >
                        Downlaod the file
                    </button>
                </Link>
            </div>






        </div>
    )
}

export default page
