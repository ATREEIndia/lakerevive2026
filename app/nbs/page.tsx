'use client'
import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Zigzgasection from '../Components/Zigzgasection'
import image_fi from '@/public/fi_2.jpg'
import image_cw from '@/public/cw_2.jpg'
import image_sv from '@/public/sv_1.jpg'
import { currentlanguage } from '../Components/Languagecontex'

const page = () => {
    const { isEng, setisEng } = currentlanguage();
    return (
        <div>
            <Navbar currentpage='NbS'></Navbar>
            <Banner title={isEng?'Nature-based solutions': 'ಪ್ರಕೃತಿ ಆಧಾರಿತ ಪರಿಹಾರಗಳು'}></Banner>

            {/* kannada and english */}
            {/* english */}
            <div className={`${isEng?'block':'hidden'} w-full px-2 mt-4`}>
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
                    content="A floating island (FI), also known as a floating treatment wetland (FTW), is an engineered ecological system designed to enhance water quality in lakes and other aquatic environments. It consists of buoyant platforms that support the growth of specially selected emergent macrophytes (plants adapted to grow partially submerged in water). Unlike conventional wetlands, these plants are not rooted in sediment but float on the water surface, with their roots extending into the water column. The primary mechanisms for water quality improvement in FIs are phytoremediation and microbial bioremediation. The dense root systems provide extensive surfaces for microbial colonisation, forming biofilms that play a critical role in nutrient cycling by degrading pollutants and assimilating nutrients like nitrogen and phosphorus. This process helps mitigate eutrophication and improve overall water quality." />

                <Zigzgasection
                    item_index={3}
                    section_image={image_sv}
                    heading="Shoreline rehabilitation"
                    content="Shoreline rehabilitation refers to the restoration and enhancement of the transitional area between land and water bodies, known as the shoreline. This area includes overlapping but distinct zones such as the littoral (aquatic), riparian (transitional), and upland zones. Shorelines are among the most ecologically productive areas on earth, playing a crucial role in maintaining the health of water bodies. Rehabilitation efforts focus on restoring native vegetation, stabilising soil, improving habitat quality, and enhancing ecosystem services. Effective shoreline rehabilitation involves systematic site assessment, categorisation of shoreline area into functional zones, removal of invasive species, soil preparation, planting of suitable native species, and ongoing monitoring. The goal is to maintain or restore the ecological integrity of the shoreline, support biodiversity, reduce erosion, and improve water quality." />


            </div>




            {/* kanada version */}
            <div className={`${isEng?'hidden':'block'} w-full px-2 mt-4`}>
                 <Zigzgasection
                    item_index={1}
                    section_image={image_cw}
                    heading="ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶ"
                    content="ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶಗಳು (CW) ವಿವಿಧ ರೀತಿಯ ತ್ಯಾಜ್ಯ ನೀರು ಮತ್ತು ಹರಿವನ್ನು ಸಂಸ್ಕರಿಸಲು ನೈಸರ್ಗಿಕ ಜೌಗು ಪ್ರದೇಶಗಳ ಕಾರ್ಯಗಳನ್ನು ಅನುಕರಿಸುವ ಎಂಜಿನಿಯರಿಂಗ್ ವ್ಯವಸ್ಥೆಗಳಾಗಿವೆ. ಈ ವ್ಯವಸ್ಥೆಗಳು ಸಸ್ಯಗಳು, ಮಣ್ಣು ಮತ್ತು ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳ  ಸಂಯೋಜನೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಮಾಲಿನ್ಯಕಾರಕಗಳನ್ನು ನೈಸರ್ಗಿಕ ರೀತಿಯಲ್ಲಿ ತೆಗೆದುಹಾಕುತ್ತವೆ ಮತ್ತು ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ. ತ್ಯಾಜ್ಯ ನೀರು ಜಲಾನಯನ ಪ್ರದೇಶದ ಮೂಲಕ ಹರಿಯುತ್ತದೆ - ಮೇಲ್ಮೈ ಮೇಲೆ ಅಥವಾ ತಲಾಧಾರದ ಮೂಲಕ - ಸಂಯೋಜಿತ ಭೌತಿಕ, ರಾಸಾಯನಿಕ ಮತ್ತು ಜೈವಿಕ ಪ್ರಕ್ರಿಯೆಗಳ ಮೂಲಕ ಮಾಲಿನ್ಯಕಾರಕಗಳನ್ನು ತೆಗೆದುಹಾಕಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ. ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶದ ಪ್ರಾಥಮಿಕ ಗುರಿ ಈ ನೈಸರ್ಗಿಕ ಸಂಸ್ಕರಣಾ ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ಅತ್ಯುತ್ತಮವಾಗಿಸುವುದು, ಇದರಿಂದ ಮಾಲಿನ್ಯಕಾರಕಗಳನ್ನು ತೆಗೆಯುವ ದಕ್ಷತೆ ಮತ್ತು ಒಟ್ಟಾರೆ ಸಂಸ್ಕರಣಾ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು. ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶಗಳು ಕಡಿಮೆ ವೆಚ್ಚ, ಸುಲಭ ಅನುಷ್ಠಾನ, ಪರಿಸರದ ಸುಸ್ಥಿರತೆ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ, ವಿಶೇಷವಾಗಿ ವಿಕೇಂದ್ರೀಕೃತ ತ್ಯಾಜ್ಯನೀರಿನ ಸಂಸ್ಕರಣಾ ಅನ್ವತ ವಿಧಾನಗಳಿಗೆ ಹೆಸರಾಗಿವೆ.  
"/>

                <Zigzgasection
                    item_index={2}
                    section_image={image_fi}
                    heading="ತೇಲುವ ದ್ವೀಪ"
                    content="ತೇಲುವ ಸಂಸ್ಕರಣಾ ಜೌಗು ಪ್ರದೇಶ (FTW) ಎಂದೂ ಕರೆಯಲ್ಪಡುವ ತೇಲುವ ದ್ವೀಪ (FI) ಕೆರೆಗಳು ಮತ್ತು ಇತರ ಜಲಚರ ಪರಿಸರಗಳಲ್ಲಿ ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಎಂಜಿನಿಯರಿಂಗ್ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ. ಇದು ವಿಶೇಷವಾಗಿ ಆಯ್ಕೆಮಾಡಿದ ಮ್ಯಾಕ್ರೋಫೈಟ್‌ಗಳ (ನೀರಿನಲ್ಲಿ ಭಾಗಶಃ ಮುಳುಗಿ ಬೆಳೆಯಲು ಹೊಂದಿಕೊಳ್ಳುವ ಸಸ್ಯಗಳು) ಬೆಳವಣಿಗೆಯನ್ನು ಬೆಂಬಲಿಸುವ ತೇಲುವ ಪ್ರದೇಶಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಸಾಂಪ್ರದಾಯಿಕ ಜೌಗು ಪ್ರದೇಶಗಳಿಗಿಂತ ಭಿನ್ನವಾಗಿ ಈ ಸಸ್ಯಗಳು ಕೆಸರಿನಲ್ಲಿ ಬೇರೂರುವುದಿಲ್ಲ   ಆದರೆ ನೀರಿನ ಮೇಲ್ಮೈಯಲ್ಲಿ ತೇಲುತ್ತವೆ, ಅವುಗಳ ಬೇರುಗಳು ನೀರಿಗೆ   ವಿಸ್ತರಿಸುತ್ತವೆ. ತೇಲುವ ದ್ವೀಪಗಳಲ್ಲಿ ನೀರಿನ ಗುಣಮಟ್ಟ ಸುಧಾರಣೆಗೆ ಪ್ರಾಥಮಿಕ ಕಾರ್ಯವಿಧಾನಗಳು ಫೈಟೊರೆಮೀಡಿಯೇಶನ್ ಮತ್ತು ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳ ಜೈವಿಕ ಪುನರ್ವಸತಿಗಳಾಗಿವೆ. ದಟ್ಟವಾದ ಬೇರಿನ ವ್ಯವಸ್ಥೆಗಳು ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳ ಉಳಿವಿಗೆ ವ್ಯಾಪಕವಾದ ಮೇಲ್ಮೈಗಳನ್ನು ಒದಗಿಸುತ್ತವೆ, ಮಾಲಿನ್ಯಕಾರಕಗಳನ್ನು ಕೆಡಿಸುವ ಮೂಲಕ ಮತ್ತು ಸಾರಜನಕ ಮತ್ತು ರಂಜಕದಂತಹ ಪೋಷಕಾಂಶಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುವ ಮೂಲಕ ಪೋಷಕಾಂಶಗಳ ಚಕ್ರದಲ್ಲಿ ನಿರ್ಣಾಯಕ ಪಾತ್ರ ವಹಿಸುವ ಜೈವಿಕ ವಲಯಗಳನ್ನು ರೂಪಿಸುತ್ತವೆ. ಈ ಪ್ರಕ್ರಿಯೆಯು ಯುಟ್ರೋಫಿಕೇಷನನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಒಟ್ಟಾರೆಯಾಗಿ ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ." />

                <Zigzgasection
                    item_index={3}
                    section_image={image_sv}
                    heading="ತೀರ ಪ್ರದೇಶದ ಪುನರ್ವಸತಿ"
                    content="ತೀರ ಪ್ರದೇಶದ ಪುನರ್ವಸತಿ ಎಂದರೆ ಭೂಮಿ ಮತ್ತು ಜಲಮೂಲಗಳ ನಡುವಿನ ಪರಿವರ್ತನೆಯ ಪ್ರದೇಶದ ಪುನರುಜ್ಜೀವನ ಮತ್ತು ವರ್ಧನೆ. ಈ ಪ್ರದೇಶವು ಅತಿಕ್ರಮಿಸುವ ಆದರೆ ವಿಭಿನ್ನ ವಲಯಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಉದಾಹರಣೆಗೆ ಲಿಟೋರಲ್ (ಜಲವಾಸಿ), ನದಿತೀರದ (ಪರಿವರ್ತನಾ) ಮತ್ತು ಎತ್ತರದ ವಲಯಗಳು. ತೀರ ಪ್ರದೇಶಗಳು ಭೂಮಿಯ ಮೇಲಿನ ಅತ್ಯಂತ ಪರಿಸರ ಉತ್ಪಾದಕ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸೇರಿವೆ, ಜಲಮೂಲಗಳ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ನಿರ್ಣಾಯಕ ಪಾತ್ರ ವಹಿಸುತ್ತವೆ. ತೀರ ಪ್ರದೇಶದ ಪುನರ್ವಸತಿ ಪ್ರಯತ್ನಗಳು ಸ್ಥಳೀಯ ಸಸ್ಯವರ್ಗವನ್ನು ಪುನರುಜ್ಜೀವನಗೊಳಿಸುವುದು, ಮಣ್ಣನ್ನು ಸ್ಥಿರಗೊಳಿಸುವುದು, ಆವಾಸಸ್ಥಾನದ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುವುದು ಮತ್ತು ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ಸೇವೆಗಳನ್ನು ಹೆಚ್ಚಿಸುವುದರ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸುತ್ತವೆ. ಪರಿಣಾಮಕಾರಿ ತೀರ ಪ್ರದೇಶ ಪುನರ್ವಸತಿಯು ವ್ಯವಸ್ಥಿತ ಸ್ಥಳ ಮೌಲ್ಯಮಾಪನ, ತೀರ ಪ್ರದೇಶವನ್ನು ಕ್ರಿಯಾತ್ಮಕ ವಲಯಗಳಾಗಿ ವರ್ಗೀಕರಿಸುವುದು, ಆಕ್ರಮಣಕಾರಿ ಪ್ರಭೇದಗಳನ್ನು ತೆಗೆದುಹಾಕುವುದು, ಮಣ್ಣಿನ ತಯಾರಿಕೆ, ಸೂಕ್ತವಾದ ಸ್ಥಳೀಯ ಪ್ರಭೇದಗಳನ್ನು ನೆಡುವುದು ಮತ್ತು ನಿರಂತರ ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ. ತೀರ ಪ್ರದೇಶದ ಪರಿಸರ ಸಮಗ್ರತೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು ಅಥವಾ ಪುನಃಸ್ಥಾಪಿಸುವುದು, ಜೀವವೈವಿಧ್ಯತೆಯನ್ನು ಬೆಂಬಲಿಸುವುದು, ಸವೆತವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು ಮತ್ತು ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುವುದು ಇದರ ಗುರಿಯಾಗಿದೆ." />


            </div>

        </div>
    )
}

export default page
