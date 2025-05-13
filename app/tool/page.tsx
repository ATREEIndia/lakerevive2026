'use client'
import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import deadfishimage from '@/public/deadFish.jpg'
import algalbloomimage from '@/public/algalBloom.jpg'
import swageimage from '@/public/sewage_lake.jpg'
import waterhyacinthimage from '@/public/waterhyacinth.jpg'
import foamimage from '@/public/foam.jpg'
import Image from 'next/image'
import ObservationsTab from '../Components/ObservationsTab'
import Inputitem from '../Components/Inputitem'
import fi_img from '@/public/floating-island_ILLUSTRATION.png'
import CW_img from '@/public/Cw_illustration.png'
import Head from 'next/head'
import { Shojumaru } from 'next/font/google'

const page = () => {
  const [lakename, Setlakename] = useState("");
  const [inflowrate, Setinflowrate] = useState(0);
  const [inflowtp, Setinflowtp] = useState(0);
  const [laketp, Setlaketp] = useState(0.0);

  const [depth, Setdepth] = useState(0);
  const [feasible_depth, Setfeasible_depth] = useState(0.0);
  const [lakearea, SetlakeArea] = useState(0);
  const [cwArea, SetcwArea] = useState(0);
  const [secchidepth, Setsecchidepth] = useState(0);

  const [isdepthAvaiable, Setisdepthvailabe] = useState(true);
  const [isareaavaiable, Setisareaavailabe] = useState(true);
  const [isinflowavilable, Setisinflowavilable] = useState(true);

  const [islakenamevalid, Setisleknamevalid] = useState(true)

  const [isinlethoveropen, Setisinlethoveropne]=useState(false)

  //results
  const [showfi, Setshowfi] = useState(false);
  const [showcw, Setshowcw] = useState(false);
  const [final_no_fi, Set_final_no_fi] = useState(0)
  const [aditional_load_after_fi, Set_aditional_load_after_fi] = useState(0)
  const [area_consumed_fi, Set_area_consumed_fi] = useState(0)
  const [Max_load_removed, Set_max_load_removed] = useState(0)
  const [Load_for_CW, Set_Load_for_CW] = useState(0)


  const [Area_of_the_CW, Set_Area_of_the_CW] = useState(0)
  const [Cout_based_on_area_available_at_site, Set_Cout_based_on_area_available_at_site] = useState(0)
  const [load_outflow_CW, Set_load_outflow_CW] = useState(0)
  const [load_uptaken_by_new_CW, Set_load_uptaken_by_new_CW] = useState(0)
  const [Load_for_FI, Set_Load_for_FI] = useState(0)

  function updateLakeName(e: React.ChangeEvent<HTMLInputElement>) {
    const val = (e.target.value);
    Setlakename(val);
  }
  function updateInflowrate(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setinflowrate(isNaN(val) ? 0 : val);
  }
  function updateInflowtp(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setinflowtp(isNaN(val) ? 0 : val);
  }
  function updateLaketp(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setlaketp(isNaN(val) ? 0 : val);
  }
  function updatedepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setdepth(isNaN(val) ? 0 : val);
  }
  function updateLakeArea(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    SetlakeArea(isNaN(val) ? 0 : val);
  }
  function updateCWArea(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    SetcwArea(isNaN(val) ? 0 : val);
  }
  function updatesechidepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setsecchidepth(isNaN(val) ? 0 : val);
  }
  function updatefeasibledepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    Setfeasible_depth(isNaN(val) ? 0 : val);
  }

  useEffect(() => {


  }, [])

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [showcw, showfi]);



  function calculate() {

    if (lakename.length < 1) {
      alert('Enter Name of the lake');
      Setisleknamevalid(false)

      return;
    } else {
      Setisleknamevalid(true)
    }

    Setshowcw(false);
    Setshowfi(false)

    if (!isareaavaiable && isinflowavilable) {
      console.log('Calculating direct flow')

      //direct inflow
      const target_secchi_depth = 0.8;
      const initial_load = inflowrate * inflowtp;
      const asimilation_factor = initial_load / laketp
      const req_inlet_conc = asimilation_factor * target_secchi_depth / inflowrate;
      const req_inlet_load = req_inlet_conc * inflowrate
      const removal_req = initial_load - req_inlet_load;
      const removal_const = 1.7
      const number_of_fi = removal_req / removal_const
      const area_fi = 4;
      const area_required = number_of_fi * area_fi;
      const _25_percent_of_lake_area = 0.25 * lakearea
      const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_fi
      const area_sufficient_indicator = area_required < _25_percent_of_lake_area ? 1 : 0;
      const max_possible_load_removal = area_sufficient_indicator === 0 ? max_fi_in_25_percent_lake_area * removal_const : removal_req;
      const final_no_fi = area_required > _25_percent_of_lake_area ? max_fi_in_25_percent_lake_area : number_of_fi
      const aditional_load_after_fi = removal_req - max_possible_load_removal


      console.log('Initial Load:', initial_load);
      console.log('Assimilation Factor:', asimilation_factor);
      console.log('Required Inlet Concentration:', req_inlet_conc);
      console.log('Required Inlet Load:', req_inlet_load);
      console.log('Removal Required:', removal_req);
      console.log('Removal Constant:', removal_const);
      console.log('Number of Floating Islands (FI):', number_of_fi);
      console.log('Area per FI:', area_fi);
      console.log('Total Area Required for FIs:', area_required);
      console.log('25% of Lake Area:', _25_percent_of_lake_area);
      console.log('Maximum FI Units in 25% Lake Area:', max_fi_in_25_percent_lake_area);
      console.log('Area Sufficient Indicator (1 = Yes, 0 = No):', area_sufficient_indicator);
      console.log('Maximum Possible Load Removal:', max_possible_load_removal);
      console.log('Final Number of FIs:', final_no_fi);
      console.log('Additional Load Remaining After FI:', aditional_load_after_fi);

      Setshowfi(true)
      Set_Load_for_FI(removal_req)
      Set_final_no_fi(Number.parseInt(final_no_fi.toFixed(0)))
      Set_aditional_load_after_fi(Number.parseInt(aditional_load_after_fi.toFixed(2)))
      Set_area_consumed_fi(Number.parseInt((final_no_fi * area_fi).toFixed(2)))
      Set_max_load_removed(Number.parseInt(max_possible_load_removal.toFixed(2)))
      return;

    }
    console.log(isdepthAvaiable)

    if (!isdepthAvaiable && !isinflowavilable) {
      console.log('calculating no flow')
      // no flow ---->lake tp , area , depth
      const volume = depth * lakearea * 1000;
      const loss_due_to_percolation = 12;
      const percolation_evaporation_outflow = (loss_due_to_percolation / 1000 * lakearea) * 1000;
      const hrt = volume / percolation_evaporation_outflow;
      const target_secchi_depth = 0.8;
      const load_in_lake = (volume * laketp) / 1000;
      const req_load_for_healthy_lake = volume * target_secchi_depth / 1000;
      const removal_req = load_in_lake - req_load_for_healthy_lake;
      const removal_req_per_day = removal_req / hrt;
      const removal_const = 1.7;
      const number_of_fi_required = removal_req_per_day / removal_const;
      const area_per_fi = 4;
      const area_required_fi = area_per_fi * number_of_fi_required;
      const _25_percent_of_lake_area = 0.25 * lakearea;
      const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_per_fi;
      const area_sufficient_indicator_fi = area_required_fi > _25_percent_of_lake_area ? 0 : 1;
      const max_load_removal_possible_fi = area_sufficient_indicator_fi === 0 ? _25_percent_of_lake_area * removal_const : removal_req;
      const final_number_of_fi_required = _25_percent_of_lake_area > area_required_fi ? number_of_fi_required : max_fi_in_25_percent_lake_area;
      const aditional_load_after_fi = removal_req - max_load_removal_possible_fi;

      console.log('Lake TP:', laketp);
      console.log('Lake Volume (m³):', volume);
      console.log('Loss due to Percolation (mm/day):', loss_due_to_percolation);
      console.log('Outflow due to Percolation & Evaporation (m³/day):', percolation_evaporation_outflow);
      console.log('Hydraulic Retention Time (days):', hrt);
      console.log('Target Secchi Depth (m):', target_secchi_depth);
      console.log('Current Load in Lake (mg):', load_in_lake);
      console.log('Required Load for Healthy Lake (mg):', req_load_for_healthy_lake);
      console.log('Total Removal Required (mg):', removal_req);
      console.log('Daily Removal Requirement (mg/day):', removal_req_per_day);
      console.log('Removal Rate per FI per Day (mg/day):', removal_const);
      console.log('Number of Floating Islands Required:', number_of_fi_required);
      console.log('Area per Floating Island (m²):', area_per_fi);
      console.log('Total Area Required for FIs (m²):', area_required_fi);
      console.log('25% of Lake Area (m²):', _25_percent_of_lake_area);
      console.log('Maximum FI Units in 25% Lake Area:', max_fi_in_25_percent_lake_area);
      console.log('Area Sufficient Indicator for FI (1 = Yes, 0 = No):', area_sufficient_indicator_fi);
      console.log('Max Load Removal Possible by FI (mg):', max_load_removal_possible_fi);
      console.log('Final Number of FIs to Use:', final_number_of_fi_required);
      console.log('Additional Load Remaining After FI (mg):', aditional_load_after_fi)

      Setshowfi(true)
      Set_Load_for_FI(removal_req)
      Set_final_no_fi(Number.parseInt(final_number_of_fi_required.toFixed(0)))
      Set_aditional_load_after_fi(Number.parseInt(aditional_load_after_fi.toFixed(2)))
      Set_area_consumed_fi(Number.parseInt((final_number_of_fi_required * area_per_fi).toFixed(2)))
      Set_max_load_removed(Number.parseInt(max_load_removal_possible_fi.toFixed(2)))

      return;
    }

    console.log('calulating cw and fi')



    const self_assimilation_factor = (inflowrate * inflowtp) / laketp;
    const self_assimilation_load = self_assimilation_factor * 0.8;
    const incoming_load = inflowrate * inflowtp
    const reduction_of_load_for_CW = incoming_load - self_assimilation_load;
    const CW_outlet_conc = (incoming_load - reduction_of_load_for_CW) / inflowrate;

    const k_TP = isdepthAvaiable ? 0.1 : 0.07;
    const area_of_CW = (inflowrate * Math.log(inflowtp) - Math.log(CW_outlet_conc)) / k_TP;

    console.log("self_assimilation_factor= " + self_assimilation_factor)
    console.log("self_assimilation_load= " + self_assimilation_load)
    console.log("incoming_load= " + incoming_load)
    console.log("reduction_of_load_for_CW= " + reduction_of_load_for_CW)
    console.log("CW_outlet_conc= " + CW_outlet_conc)

    console.log("Area of the CW(m2)= " + area_of_CW)
    let expval;

    let count_based_on_area;
    let load_outflow;
    let outletLoad = 0;
    let load_uptaken;
    let incoming_load_for_FI;


    if (area_of_CW > cwArea) {
      expval = Math.exp((cwArea * k_TP) / inflowrate)
    } else {
      expval = Math.exp((area_of_CW * k_TP) / inflowrate)

    }
    count_based_on_area = inflowtp / expval;
    load_outflow = count_based_on_area * inflowrate;

    let load_for_FI;

    if (area_of_CW > cwArea) {
      load_for_FI = load_outflow
    } else {
      load_for_FI = 0;
    }
    if (count_based_on_area > CW_outlet_conc) {
      outletLoad = load_outflow - self_assimilation_load
    }
    load_uptaken = reduction_of_load_for_CW - outletLoad;

    incoming_load_for_FI = (outletLoad).toFixed(3);

    console.log('count_based_on_area= ' + count_based_on_area)
    console.log('incoming_load_for_FI= ' + incoming_load_for_FI)

    Setshowcw(true)



    // floating island calculation
    if (Number.parseFloat(incoming_load_for_FI) > 0.0) {
      console.log('calculating for floating island')
      const incoming_load_from_CW = Number.parseFloat(incoming_load_for_FI)
      const removal_const_fi = 1.7;
      const number_of_fi_required = incoming_load_from_CW / removal_const_fi
      const area_per_fi = 4;
      const area_required_fi = number_of_fi_required * area_per_fi;
      const _25_percent_of_lake_area = 0.25 * lakearea;
      const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_per_fi;
      const area_sufficient_indicator_fi = area_required_fi < _25_percent_of_lake_area ? 1 : 0;
      const max_load_removal_possible_fi = area_sufficient_indicator_fi === 0 ? max_fi_in_25_percent_lake_area * removal_const_fi : incoming_load_from_CW;
      const final_number_of_fi_required = area_required_fi > _25_percent_of_lake_area ? max_fi_in_25_percent_lake_area : number_of_fi_required;
      const aditional_load_remaining_fi = incoming_load_from_CW - max_load_removal_possible_fi;

      console.log("Incoming Load from CW:", incoming_load_from_CW);
      console.log("Removal Constant (FI):", removal_const_fi);
      console.log("Number of FI Required:", number_of_fi_required);
      console.log("Area per FI:", area_per_fi);
      console.log("Area Required for FI:", area_required_fi);
      console.log("25% of Lake Area:", _25_percent_of_lake_area);
      console.log("Max FI in 25% Lake Area:", max_fi_in_25_percent_lake_area);
      console.log("Area Sufficient Indicator (FI):", area_sufficient_indicator_fi);
      console.log("Max Load Removal Possible (FI):", max_load_removal_possible_fi);
      console.log("Final Number of FI Required:", final_number_of_fi_required);
      console.log("Additional Load Remaining (FI):", aditional_load_remaining_fi);

      Setshowfi(true)
      Set_final_no_fi(Number.parseInt(final_number_of_fi_required.toFixed(0)))
      Set_aditional_load_after_fi(Number.parseInt(aditional_load_remaining_fi.toFixed(2)))
      Set_area_consumed_fi(Number.parseInt((final_number_of_fi_required * area_per_fi).toFixed(2)))
      Set_max_load_removed(Number.parseInt(max_load_removal_possible_fi.toFixed(2)))

    } else {
      Setshowfi(false)


    }
    Set_Area_of_the_CW(area_of_CW)
    Set_Cout_based_on_area_available_at_site(count_based_on_area)
    Set_load_outflow_CW(load_outflow_CW)
    Set_Load_for_FI(Number.parseInt(incoming_load_for_FI))
    Set_load_uptaken_by_new_CW(load_uptaken)
    Set_Load_for_CW(reduction_of_load_for_CW)



  }


  return (
    <div className='w-full'>
      <Banner></Banner>
      <div className='w-full p-4 flex flex-col gap-2 sm:flex-row justify-between bg-[#fffdfc] '>
        {/* conatiner left */}
        <div className=' lg:w-[40%] w-full  lg:justify-start items-center flex flex-col pt-2 '>
          <div className='flex justify-center items-center px-4'>
            <Heading text='Lake Health Assesment Parameters'></Heading>
          </div>


          <div className={`lg:w-[95%] bg-white shadow-xl rounded-xl mt-4 lg:mt-12 p-2 border-2 flex flex-col items-center border-[#c8c6c4] `}>
            <div className='w-full flex flex-col my-4 gap-6'>
              <Inputitem title={'Name of the lake'} type='text' value={lakename} updatefunction={updateLakeName} custom_class={`${islakenamevalid ? '' : 'border-red-400'}`}></Inputitem>
            </div>


            <div className='mt-5'>
              <SubHeading text='LAKE MORPHOLOGY DETAILS' customClassName='font-semibold underline'></SubHeading>
            </div>


            <div className='w-full flex flex-col my-4 gap-6'>
              <Inputitem title={'Lake Area (m²)'} value={lakearea} updatefunction={updateLakeArea}></Inputitem>

              <Inputitem title={'Lake Depth (m)'} value={depth} updatefunction={updatedepth}></Inputitem>


              <div className='w-full border-2 border-gray-100 rounded-xl shadow-lg p-4 '>
                <div className={` flex flex-col w-full`}>
                  <Inputitem title={'Feasible Depth for Wetland (m)'} disable_status={!isdepthAvaiable} value={feasible_depth} updatefunction={updatefeasibledepth}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${feasible_depth > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisdepthvailabe(!isdepthAvaiable)} >{isdepthAvaiable ? 'CW Sufficent Depth Not Available' : 'CW Sufficent Depth Available'}</p>
                </div>
              </div>

              <div className='w-full border-2 border-gray-100 rounded-xl shadow-lg p-4 '>
                <div className={` flex flex-col w-full`}>
                  <Inputitem title={'Available CW Area (m²)'} disable_status={!isareaavaiable} value={cwArea} updatefunction={updateCWArea}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${cwArea > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisareaavailabe(!isareaavaiable)} >{isareaavaiable ? 'CW Area Not Available' : 'CW Area Available'}</p>
                </div>
              </div>


            </div>



            <div className='mt-5'>
              <SubHeading text='WATER QUALITY DETAILS' customClassName='font-semibold underline'></SubHeading>
            </div>



            <div className='w-full flex flex-col my-4 gap-6'>

              <div className='relative w-full border-2 border-gray-100 rounded-xl shadow-lg p-4 '>
                <div className={` flex flex-col w-full`}>
                  <div className={`absolute top-0 right-0 bg-white border-2 shadow-2xl border-blue-100 px-4 flex ${isinlethoveropen?'flex':'hidden'}`}>
                    <p className='p-8'>Note: For Multiple inlets, enter the details individiually to determine intervention for each inlet. Incase you wish to combine multiple 
                    inltes you may consider weighted averages for the inlets using the formula; <br></br> ( (Q₁ × C₁ + Q₂ × C₂ + … + Qₙ × Cₙ) ÷ (Q₁ + Q₂ + … + Qₙ) )
                  </p>
                  <p className='text-red-600 text-xl cursor-pointer' onClick={()=>{Setisinlethoveropne(false)}}>x</p>
                  </div>
                  <p className='flex flex-row-reverse w-full text-end px-8 font-bold text-blue-600 cursor-pointer' onClick={()=>{Setisinlethoveropne(true)}}>Note</p>
                  <Inputitem title={'Inflow Rate (m³/day)'} disable_status={!isinflowavilable} value={inflowrate} updatefunction={updateInflowrate}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${inflowrate > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisinflowavilable(!isinflowavilable)} >{isinflowavilable ? 'Inflow Not Available' : 'Inflow Available'}</p>
                </div>
              </div>


              <Inputitem title={'Inflow TP Conc (mg/L)'} value={inflowtp} updatefunction={updateInflowtp}></Inputitem>

              <Inputitem title={'Lake TP Conc (mg/L)'} value={laketp} updatefunction={updateLaketp}></Inputitem>



              <Inputitem title={'Secchi Depth (m)'} value={secchidepth} updatefunction={updatesechidepth}></Inputitem>

            </div>


          </div>


        </div>


        {/* container right */}
        <div className=' lg:w-[60%] w-full lg:items-center flex flex-col sm:pt-2 pt-8 '>
          <Heading text='What do You Observe'></Heading>
          <SubHeading text='Tell us what did you see'></SubHeading>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-1 lg:px-4'>

            <ObservationsTab title='Fish kills'
              explanation='Did you observed any dead fish floating on the surface or gathering near the shore.'
              image={deadfishimage}></ObservationsTab>

            <ObservationsTab title='Algal Bloom'
              explanation=' Seen green or coloured patches spreading across the lake? '
              image={algalbloomimage}></ObservationsTab>

            <ObservationsTab title='Sewage Inflow or Bad Odour'
              explanation='Have you observed any strong, unpleasant smells around the lake, or seen pipes or drains discharging into it? '
              image={swageimage}></ObservationsTab>


            <ObservationsTab title='Floating Vegetation'
              explanation='Have you noticed thick clusters of floating plants like water hyacinth or duckweed covering parts of the lake?'
              image={waterhyacinthimage}></ObservationsTab>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-1 lg:px-4'>

            <ObservationsTab title='Foaming on the Water'
              explanation='Have you seen foam forming along the edges or surface of the lake?'
              image={foamimage}></ObservationsTab>
          </div>

        </div>


      </div>
      <div className='w-full py-4 flex flex-col justify-center items-center'>
        <button onClick={calculate}
          className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
        >
          Analyse
        </button>
      </div>


      {/* Result section */}
      <div className='w-full flex justify-around items-center py-4 flex-col '>

        <h1>Result </h1>
        <div className='w-[95%] bg-white  rounded-xl mt-12 p-2  flex gap-5 items-center border-[#c8c6c4] flex-col sm:flex-row justify-center'>


          <div className={` lg:w-[50%] border-2 rounded-xl border-gray-200 p-4 flex-col ${showcw ? 'flex' : 'hidden'}`}>
            <div className=' flex justify-center items-center '>
              <Heading text='Constructed Wetland'></Heading>
            </div>
            <div className='flex h-full items-center justify-center flex-col lg:flex-row'>
              <Image src={CW_img} width={200} alt=''></Image>
              <div className='p-4 w-fill h-full flex flex-col gap-5 justify-center'>
                <div>Required Area for CW: {Area_of_the_CW.toFixed(2)} </div>
                <div>Availabe Area: {cwArea.toFixed(2)} </div>
                <div>Total Load: {Load_for_CW} </div>
                <div>Load uptaken: {load_uptaken_by_new_CW.toFixed(2)} </div>
                <div>Aditional Load for FI: {Load_for_FI.toFixed(2)} </div>
                <div className='w-full flex justify-center'>
                  <button className='px-5 cursor-pointer py-2 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                  >
                    Know More
                  </button> </div>

              </div>
            </div>



          </div>





          <div className={` lg:w-[50%] border-2 rounded-xl border-gray-200 p-4 flex-col ${showfi ? 'flex' : 'hidden'}`}>
            <div className=' flex justify-center items-center'>
              <Heading text='Floating Island'></Heading>
            </div>
            <div className='flex h-full items-center justify-center flex-col lg:flex-row'>
              <Image src={fi_img} width={200} alt=''></Image>
              <div className='p-4 w-fill h-full flex flex-col gap-5 justify-center'>
                <div>Load: {Load_for_FI.toFixed(2)} </div>
                <div>Number of FI Required: {final_no_fi} </div>
                <div>Area Consumed: {area_consumed_fi} </div>
                <div>Max Load can be Removed: {Max_load_removed} </div>
                <div>Aditional Load Remaining: {aditional_load_after_fi} </div>
                <div className='w-full flex justify-center'>
                  <button
                    className='px-5 cursor-pointer py-2 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
                  >
                    Know More
                  </button> </div>

              </div>
            </div>



          </div>


        </div>

        {/* <p>Area of the CW(m2): {Area_of_the_CW}</p>
        <p>Cout based on area available at site (mg/l): {Cout_based_on_area_available_at_site}</p>
        <p>Load outflow CW(g/day): {load_outflow_CW}</p>
        <p>Load uptaken by new CW(g/d): {load_uptaken_by_new_CW}</p>
        <p>Load for FI(g/d): {Load_for_FI}</p> */}

      </div>
    </div>

  )
}

export default page
