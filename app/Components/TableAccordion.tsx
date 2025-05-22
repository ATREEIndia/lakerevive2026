'use client'
import { useState } from 'react';
import SubHeading from './SubHeading';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200 transition rounded-t cursor-pointer"
      >
        {title}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden px-4 py-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TablesAccordion = () => {
    return (
        <div className="w-full  px-2 lg:px-8 my-8 ">            

            {/* Table 1: Secchi Depth */}
            <AccordionItem title="Table 1: Secchi Depth Scores">
                <div className='w-full lg:px-8'>
                    <div className="overflow-x-auto my-6">

                        <table className="table-auto w-full border border-gray-300 text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Secchi depth (cm)</th>
                                    <th className="border border-gray-300 px-4 py-2">Secchi depth interpretation</th>
                                    <th className="border border-gray-300 px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">0–20</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Very Low — Poor condition with severe pollution and algal blooms</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">1</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">20–40</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Low — Poor condition</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">2</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">40–60</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Medium — Fairly good condition</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">60–80</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">High — Good condition</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">4</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">80–100</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Very High — Extremely good considering urban context</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </AccordionItem>

            {/* Table 2: Total Phosphorus */}
            <AccordionItem title="Table 2: Total Phosphorus Scores">
                <div className='w-full lg:px-8'>
                    <div className="overflow-x-auto my-6">

                        <table className="table-auto w-full border border-gray-300 text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Total phosphorus levels (mg/l)</th>
                                    <th className="border border-gray-300 px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">0 to 0.05</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">5</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">0.05 to 0.2</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">4</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">0.2 to 1.0</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">1.0 to 2.0</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">2</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">&gt;2.0</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </AccordionItem>

            {/* Table 3: Algal Presence */}
            <AccordionItem title="Table 3: Algal Presence Scores">
                <div className='w-full lg:px-8'>
                    <div className="overflow-x-auto my-6">

                        <table className="table-auto w-full border border-gray-300 text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Qualitative description of algae presence</th>
                                    <th className="border border-gray-300 px-4 py-2">Water Quality Interpretation</th>
                                    <th className="border border-gray-300 px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Dense algal mats or blooms of blue-green algae covering most of the lake; water is green, turbid, or foul-smelling; frequent fish kills
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Very poor (heavily polluted)</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">1</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Large patches of visible algae; water often discoloured; occasional odour or surface scum
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Poor (high organic pollution)</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">2</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Moderate algal presence; visible patches in some areas; water sometimes slightly discoloured; occasional mild odour
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Moderate (some organic pollution)</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Sparse, patchy algae; mostly clear water with occasional small algal spots; no persistent odour or scum
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Good (low organic pollution)</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">4</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Little to no visible algae; clear water; no odour, scum, or discolouration; healthy aquatic life observed
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Excellent (unpolluted/healthy)</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </AccordionItem>

            {/* Table 4: Shoreline Condition */}
            <AccordionItem title="Table 4: Shoreline Condition Scores">
                <div className='w-full lg:px-8'>
                    <div className="overflow-x-auto my-6">

                        <table className="table-auto w-full border border-gray-300 text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Qualitative description</th>
                                    <th className="border border-gray-300 px-4 py-2">Shoreline condition</th>
                                    <th className="border border-gray-300 px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Shoreline is concretised (stone pitching) with no vegetation and bare soil; very few or no trees, shrubs, or presence of invasive species
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Very poor</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">1</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Shoreline has limited vegetation with some scattered shrubs or isolated trees; dominated by lawn or non-native vegetation
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Poor</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">2</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Shoreline has a mix of lawn and natural vegetation; about 50% of the shoreline area is vegetated but dominated by non-native species
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Fair</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Most of the shoreline has native trees and shrubs; small areas may include lawn or show some disturbance
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Good</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">4</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">
                                        Shoreline has a diversity of natural vegetation consisting of aquatic plants, grasses, herbaceous plants, shrubs, and trees; presence of structural complexities such as fallen logs and rocks providing microhabitats
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">Excellent</td>
                                    <td className="border border-gray-300 px-4 py-2 lg:text-lg">5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </AccordionItem>
        </div>
    );
};

export default TablesAccordion;
