import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Zigzgasection from '../Components/Zigzgasection'
import image_fi from '@/public/fi_2.jpg'
import image_cw from '@/public/cw_2.jpg'
import image_sv from '@/public/sv_1.jpg'

const page = () => {
    return (
        <div>
            <Navbar currentpage='Nature-based solutions'></Navbar>
            <Banner></Banner>
            <div className='w-full px-2 mt-4'>
                <Zigzgasection
                    item_index={1}
                    section_image={image_cw}
                    heading="Constructed wetland"
                    content="Constructed wetlands (CW) are engineered systems that mimic the functions 
            of natural wetlands to treat various types of wastewater and runoff. These systems utilise a 
            combination of plants, soil, and microorganisms to naturally remove contaminants and enhance the quality of water. Wastewater flows through the basin-either over the surface or through the substrate-allowing for the removal of contaminants via integrated physical, chemical, and biological processes. The primary goal of a CW is to optimise these natural treatment mechanisms, thereby maximising pollutant removal efficiency and overall treatment performance. CW are valued for their low cost, ease of implementation, environmental sustainability, and reliable performance, especially in decentralised wastewater treatment applications."/>

                <Zigzgasection
                    item_index={2}
                    section_image={image_fi}
                    heading="Floating island"
                    content="A floating island (FI), also known as a floating treatment wetland (FTW), is an engineered ecological system designed to enhance water quality in lakes and other aquatic environments. It consists of buoyant platforms that support the growth of specially selected emergent macrophytes (plants adapted to grow partially submerged in water). Unlike conventional wetlands, these plants are not rooted in sediment but float on the water surface, with their roots extending into the water column. The primary mechanisms for water quality improvement in FIs are phytoremediation and microbial bioremediation. The dense root systems provide extensive surfaces for microbial colonisation, forming biofilms that play a critical role in nutrient cycling by degrading pollutants and assimilating nutrients like nitrogen and phosphorus. This process helps mitigate eutrophication and improve overall water quality."/>

                <Zigzgasection
                    item_index={3}
                    section_image={image_sv}
                    heading="Shoreline rehabilitation"
                    content="Shoreline rehabilitation refers to the restoration and enhancement of the transitional area between land and water bodies, known as the shoreline. This area includes overlapping but distinct zones such as the littoral (aquatic), riparian (transitional), and upland zones. Shorelines are among the most ecologically productive areas on earth, playing a crucial role in maintaining the health of water bodies. Rehabilitation efforts focus on restoring native vegetation, stabilising soil, improving habitat quality, and enhancing ecosystem services. Effective shoreline rehabilitation involves systematic site assessment, categorisation of shoreline area into functional zones (Figure 3), removal of invasive species, soil preparation, planting of suitable native species, and ongoing monitoring. The goal is to maintain or restore the ecological integrity of the shoreline, support biodiversity, reduce erosion, and improve water quality."/>


            </div>

        </div>
    )
}

export default page
