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
import Result from '../Components/Result'


import { Fi_imgs, CW_imgs, vegitation_imgs, shoreline_know_more } from '../Constants'
import SingleSlider from '../Components/SingleSlider'
import Navbar from '../Components/Navbar'

import cwandfi_img from '@/public/cw_fi.jpg'
import cwonly_img from '@/public/cw_only.jpg'
import fionly_img from '@/public/fi_only.jpg'


const page = () => {
  //input
  const [Input_lakename, Setlakename] = useState("");
  const [Input_inflowrate, Setinflowrate] = useState(0);
  const [Input_inflowtp, Setinflowtp] = useState(0);
  const [Input_laketp, Setlaketp] = useState(0.0);

  const [Input_lakedepth, Setdepth] = useState(0);
  const [Input_feasible_depth, Setfeasible_depth] = useState(0.0);
  const [Input_lakearea, SetlakeArea] = useState(0);
  const [Input_cwArea, SetcwArea] = useState(0);
  const [Input_secchidepth, Setsecchidepth] = useState(0);

  const [isdepthAvaiable, Setisdepthvailabe] = useState(true);
  const [isareaavaiable, Setisareaavailabe] = useState(true);
  const [isinflowavilable, Setisinflowavilable] = useState(true);

  const [islakenamevalid, Setisleknamevalid] = useState(true)

  const [isinlethoveropen, Setisinlethoveropne] = useState(false)
  const [isfeasible_depthnote_open, Setisfeasible_depthnote_open] = useState(false)

  //results
  // const [showfi, Setshowfi] = useState(false);
  // const [showcw, Setshowcw] = useState(false);
  // const [final_no_fi, Set_final_no_fi] = useState(0)
  // const [aditional_load_after_fi, Set_aditional_load_after_fi] = useState(0)
  // const [area_consumed_fi, Set_area_consumed_fi] = useState(0)
  // const [Max_load_removed, Set_max_load_removed] = useState(0)
  // const [Load_for_CW, Set_Load_for_CW] = useState(0)


  // const [Area_of_the_CW, Set_Area_of_the_CW] = useState(0)
  // const [Cout_based_on_area_available_at_site, Set_Cout_based_on_area_available_at_site] = useState(0)
  // const [load_outflow_CW, Set_load_outflow_CW] = useState(0)
  // const [load_uptaken_by_new_CW, Set_load_uptaken_by_new_CW] = useState(0)
  // const [Load_for_FI, Set_Load_for_FI] = useState(0)

  const [result_fi_area, Set_result_fi_area] = useState('0')
  const [result_CW_area, Set_result_CW_area] = useState('0')
  const [result_fi_percent, Set_result_fi_percent] = useState('0')
  const [result_CW_percent, Set_result_CW_percent] = useState('0')
  const [showfi, Setshowfi] = useState(true);
  const [showcw, Setshowcw] = useState(true);
  const [showresult, Setshowresult] = useState(true);
  const [showsingleslider, Setshowsingleslider] = useState(false);
  const [single_slider_imgs, Setsingle_slider_imgs] = useState<any[]>([]);

  function handle_singleslide(images: any[]) {
    Setsingle_slider_imgs(images)
    console.log("handle_singleslide triggred")

    Setshowsingleslider(!showsingleslider);
  }

  function updateLakeName(e: React.ChangeEvent<HTMLInputElement>) {
    const val = (e.target.value);
    Setlakename(val);
  }
  function updateInflowrate(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setinflowrate(isNaN(val) ? 0 : val);
  }
  function updateInflowtp(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setinflowtp(isNaN(val) ? 0 : val);
  }
  function updateLaketp(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setlaketp(isNaN(val) ? 0 : val);
  }
  function updatedepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setdepth(isNaN(val) ? 0 : val);
  }
  function updateLakeArea(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    SetlakeArea(isNaN(val) ? 0 : val);
  }
  function updateCWArea(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    SetcwArea(isNaN(val) ? 0 : val);
  }
  function updatesechidepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setsecchidepth(isNaN(val) ? 0 : val);
  }
  function updatefeasibledepth(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseFloat(e.target.value);
    if (val < 0) {
      return;
    }
    Setfeasible_depth(isNaN(val) ? 0 : val);
  }



  // checking all valid files are filled
  function isfieldsvalid() {

    if (Input_lakename.length < 1) {
      alert('Enter Name of the lake');
      Setisleknamevalid(false)


      return false;
    } else {
      Setisleknamevalid(true)
    }

    if (Input_lakearea < 1 || Input_lakedepth < 0.01 || Input_laketp < 0.01) {
      alert('Input valid data');
      return false;
    }

    if (Input_inflowrate < 1 && isinflowavilable) {
      alert('Input inflow data or click on No dry-weather inflow to skip the field');
      return false;
    }
    if (Input_feasible_depth < .5 && isdepthAvaiable) {
      alert('Input Feasible depth or click on Feasible depth not available to skip the field');
      return false;
    }
    if (Input_cwArea < 1 && isareaavaiable) {
      alert('Input Area available or click on Area not available to skip the field');
      return false;
    }
    return true;
  }

  function calculation2() {
    console.log('calculating')
    Set_result_fi_area('0')
    Set_result_CW_area('0')
    Set_result_fi_percent('0')
    Set_result_CW_percent('0')
    Setshowfi(false);
    Setshowcw(false);
    Setshowresult(false)



    if (isfieldsvalid()) {
      let Result_area_req_fi;
      let Result_percent_area_of_lake_covered_by_fi = 0;



      if (isinflowavilable && !isareaavaiable) {
        console.log('on f1 condition')
        //fi condition 1
        const target_conc = 0.8;
        const initial_load = Input_inflowrate * Input_inflowtp;
        const assimilationfactor = initial_load / Input_laketp;
        const req_inlet_conc = (assimilationfactor * target_conc) / Input_inflowrate;
        const req_inlet_load = req_inlet_conc * Input_inflowrate;
        const removal_required = initial_load - req_inlet_load;
        const removal_per_Fi = 1.7;
        const number_of_fi = removal_required / removal_per_Fi;
        const area_per_fi = 4;
        const area_required_fi = area_per_fi * number_of_fi;
        const _25_percent_of_lake_area = 0.25 * Input_lakearea;

        console.log("initial_load =", initial_load);
        console.log("assimilationfactor =", assimilationfactor);
        console.log("required_inlet_concentration =", req_inlet_conc);
        console.log("required_inlet_load =", req_inlet_load);
        console.log("removal_required =", removal_required);
        console.log("number_of_fi =", number_of_fi);
        console.log("area_required_fi =", area_required_fi);
        console.log("25% of lake area =", _25_percent_of_lake_area);

        //--------------result-----------------------//
        Result_area_req_fi = area_required_fi;
        Result_percent_area_of_lake_covered_by_fi = area_required_fi < _25_percent_of_lake_area ? (area_required_fi / Input_lakearea) * 100 : 0;

        Set_result_fi_area(Math.ceil(Result_area_req_fi).toFixed(0))
        Set_result_fi_percent (Result_percent_area_of_lake_covered_by_fi.toFixed(1))
        Setshowfi(true);
        Setshowcw(false);
        Setshowresult(true)


        console.log('Result_area_req_fi= ' + Result_area_req_fi)
        console.log('Result_percent_area_of_lake_covered_by_fi= ' + Result_percent_area_of_lake_covered_by_fi)

        return
      }

      if (!isinflowavilable) {
        //fi condition 2
        console.log('on f2 condition')
        const volume = (Input_lakedepth * Input_lakearea) * 1000
        const loss_percolation = 12;
        const assumed_percolation_evaporation_outflow = loss_percolation * Input_lakearea;
        const HRT = volume / assumed_percolation_evaporation_outflow;
        const target_conc = 0.8;
        const load_in_lake = (volume * Input_laketp) / 1000;
        const req_load = volume * target_conc / 1000;
        const removal_required = load_in_lake - req_load;
        const req_perday = removal_required / HRT;
        const removal_per_island = 1.7;
        const number_of_fi_req = req_perday / removal_per_island;
        const area_per_fi = 4;
        const area_req_by_fi = area_per_fi * number_of_fi_req;
        const _25_percent_lake_area = 0.25 * Input_lakearea;

        console.log("volume (litres) =", volume);
        console.log("assumed_percolation_evaporation_outflow =", assumed_percolation_evaporation_outflow);
        console.log("HRT (days) =", HRT);
        console.log("load_in_lake =", load_in_lake);
        console.log("required load (req_load) =", req_load);
        console.log("removal_required =", removal_required);
        console.log("req_perday =", req_perday);
        console.log("number_of_fi_req =", number_of_fi_req);
        console.log("area_req_by_fi =", area_req_by_fi);
        console.log("25% of lake area =", _25_percent_lake_area);

        //----------------result-----------------------//
        Result_area_req_fi = area_req_by_fi;
        Result_percent_area_of_lake_covered_by_fi = area_req_by_fi < _25_percent_lake_area ? (area_req_by_fi / Input_lakearea) * 100 : 0;

        Set_result_fi_area(Math.ceil(Result_area_req_fi).toFixed(0))
        Set_result_fi_percent (Result_percent_area_of_lake_covered_by_fi.toFixed(1))
        Setshowfi(true);
        Setshowcw(false);
        Setshowresult(true)

        console.log('Result_area_req_fi= ' + Result_area_req_fi)
        console.log('Result_percent_area_of_lake_covered_by_fi= ' + Result_percent_area_of_lake_covered_by_fi)
        return
      }


      // calculating for CW
      console.log('on CW_calculation')

      let awailable_area_restricted_to_25p = Input_cwArea > 0.25 * Input_lakearea ? 0.25 * Input_lakearea : Input_cwArea;
      const self_assimilation_factor = (Input_inflowrate * Input_inflowtp) / Input_laketp;
      const self_assimilation_load = self_assimilation_factor * 0.8;
      const incoming_load = Input_inflowrate * Input_inflowtp;
      const reduction_of_load_for_CW = incoming_load - self_assimilation_load;
      const CW_outlet_conc = self_assimilation_load / Input_inflowrate;
      let TP_constant = isdepthAvaiable ? 0.1 : 0.07;
      const area_of_CW = (Input_inflowrate * (Math.log(Input_inflowtp) - Math.log(CW_outlet_conc))) / TP_constant;
      const exponent = (awailable_area_restricted_to_25p * TP_constant) / Input_inflowrate;
      const Cout_based_on_area_available_at_site = Input_inflowtp / Math.exp(exponent);
      const load_outflow_CW = Cout_based_on_area_available_at_site * Input_inflowrate;
      const removal_by_CW = incoming_load - load_outflow_CW;
      const load_for_FI = awailable_area_restricted_to_25p > area_of_CW ? 0 : (reduction_of_load_for_CW > removal_by_CW ? reduction_of_load_for_CW - removal_by_CW : 0);

      console.log("available_area_restricted_to_25p =", awailable_area_restricted_to_25p);
      console.log("self_assimilation_factor =", self_assimilation_factor);
      console.log("self_assimilation_load =", self_assimilation_load);
      console.log("incoming_load =", incoming_load);
      console.log("reduction_of_load_for_CW =", reduction_of_load_for_CW);
      console.log("CW_outlet_conc =", CW_outlet_conc);
      console.log("area_of_CW =", area_of_CW);
      console.log("exponent =", exponent);
      console.log("Cout_based_on_area_available_at_site =", Cout_based_on_area_available_at_site);
      console.log("load_outflow_CW =", load_outflow_CW);
      console.log("removal_by_CW =", removal_by_CW);
      console.log("load_for_FI =", load_for_FI);

      //---------result---------------------// 
      const Result_area_of_CW = load_for_FI > 0 ? awailable_area_restricted_to_25p : area_of_CW;
      const Result_percent_area_covered_bt_CW = (Result_area_of_CW / Input_lakearea) * 100;

      //calculte for FI 

      let Remarks = 'NbS is sufficient';
      if (load_for_FI > 0) {
        console.log('on CW_calculation ++ fi')
        const removal_required_fi = load_for_FI;
        const removal_const_fi = 1.70;
        const number_of_fi_required = removal_required_fi / removal_const_fi;
        const area_per_fi = 4;
        const area_required_fi = number_of_fi_required * area_per_fi;
        const percent_of_area_covered_by_fi = (area_required_fi / Input_lakearea) * 100;

        //----------result-----------------------//
        Result_area_req_fi = area_required_fi;
        Result_percent_area_of_lake_covered_by_fi = percent_of_area_covered_by_fi;
        Set_result_fi_area(Math.ceil(Result_area_req_fi).toFixed(0))
        Set_result_fi_percent(Result_percent_area_of_lake_covered_by_fi.toFixed(1))
        Setshowfi(true);
        Setshowresult(true);

      }

      //--------------Overall result------------//
      const Result_percent_total_area_covered = (Result_percent_area_of_lake_covered_by_fi + Result_percent_area_covered_bt_CW);
      Remarks = Result_percent_total_area_covered > 25 ? 'NbS Not sufficient' : "NbS is sufficient";
      Set_result_CW_area(isNaN(Result_area_of_CW) ? '0' : Math.ceil(Result_area_of_CW).toFixed(0))  //round up
      Set_result_CW_percent(isNaN(Result_percent_area_covered_bt_CW) ? '0' : Result_percent_area_covered_bt_CW.toFixed(1))

      if (Result_percent_total_area_covered > 25) {
        Setshowfi(false);
        Setshowresult(false);
      } else {
        Setshowcw(true);
      }
      Setshowresult(true)





      console.log("Result_percent_total_area_covered= " + Result_percent_total_area_covered)
      console.log("Remarks= " + Remarks)




    };
  }















  // function calculate() {

  //   if (Input_lakename.length < 1) {
  //     alert('Enter Name of the lake');
  //     Setisleknamevalid(false)

  //     return;
  //   } else {
  //     Setisleknamevalid(true)
  //   }

  //   Setshowcw(false);
  //   Setshowfi(false)

  //   if (!isareaavaiable && isinflowavilable) {
  //     console.log('Calculating direct flow')

  //     //direct inflow
  //     const target_secchi_depth = 0.8;
  //     const initial_load = inflowrate * inflowtp;
  //     const asimilation_factor = initial_load / laketp
  //     const req_inlet_conc = asimilation_factor * target_secchi_depth / inflowrate;
  //     const req_inlet_load = req_inlet_conc * inflowrate
  //     const removal_req = initial_load - req_inlet_load;
  //     const removal_const = 1.7
  //     const number_of_fi = removal_req / removal_const
  //     const area_fi = 4;
  //     const area_required = number_of_fi * area_fi;
  //     const _25_percent_of_lake_area = 0.25 * lakearea
  //     const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_fi
  //     const area_sufficient_indicator = area_required < _25_percent_of_lake_area ? 1 : 0;
  //     const max_possible_load_removal = area_sufficient_indicator === 0 ? max_fi_in_25_percent_lake_area * removal_const : removal_req;
  //     const final_no_fi = area_required > _25_percent_of_lake_area ? max_fi_in_25_percent_lake_area : number_of_fi
  //     const aditional_load_after_fi = removal_req - max_possible_load_removal


  //     console.log('Initial Load:', initial_load);
  //     console.log('Assimilation Factor:', asimilation_factor);
  //     console.log('Required Inlet Concentration:', req_inlet_conc);
  //     console.log('Required Inlet Load:', req_inlet_load);
  //     console.log('Removal Required:', removal_req);
  //     console.log('Removal Constant:', removal_const);
  //     console.log('Number of Floating Islands (FI):', number_of_fi);
  //     console.log('Area per FI:', area_fi);
  //     console.log('Total Area Required for FIs:', area_required);
  //     console.log('25% of Lake Area:', _25_percent_of_lake_area);
  //     console.log('Maximum FI Units in 25% Lake Area:', max_fi_in_25_percent_lake_area);
  //     console.log('Area Sufficient Indicator (1 = Yes, 0 = No):', area_sufficient_indicator);
  //     console.log('Maximum Possible Load Removal:', max_possible_load_removal);
  //     console.log('Final Number of FIs:', final_no_fi);
  //     console.log('Additional Load Remaining After FI:', aditional_load_after_fi);

  //     Setshowfi(true)
  //     Set_Load_for_FI(removal_req)
  //     Set_final_no_fi(Number.parseInt(final_no_fi.toFixed(0)))
  //     Set_aditional_load_after_fi(Number.parseInt(aditional_load_after_fi.toFixed(2)))
  //     Set_area_consumed_fi(Number.parseInt((final_no_fi * area_fi).toFixed(2)))
  //     Set_max_load_removed(Number.parseInt(max_possible_load_removal.toFixed(2)))
  //     return;

  //   }
  //   console.log(isdepthAvaiable)

  //   if (!isdepthAvaiable && !isinflowavilable) {
  //     console.log('calculating no flow')
  //     // no flow ---->lake tp , area , depth
  //     const volume = depth * lakearea * 1000;
  //     const loss_due_to_percolation = 12;
  //     const percolation_evaporation_outflow = (loss_due_to_percolation / 1000 * lakearea) * 1000;
  //     const hrt = volume / percolation_evaporation_outflow;
  //     const target_secchi_depth = 0.8;
  //     const load_in_lake = (volume * laketp) / 1000;
  //     const req_load_for_healthy_lake = volume * target_secchi_depth / 1000;
  //     const removal_req = load_in_lake - req_load_for_healthy_lake;
  //     const removal_req_per_day = removal_req / hrt;
  //     const removal_const = 1.7;
  //     const number_of_fi_required = removal_req_per_day / removal_const;
  //     const area_per_fi = 4;
  //     const area_required_fi = area_per_fi * number_of_fi_required;
  //     const _25_percent_of_lake_area = 0.25 * lakearea;
  //     const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_per_fi;
  //     const area_sufficient_indicator_fi = area_required_fi > _25_percent_of_lake_area ? 0 : 1;
  //     const max_load_removal_possible_fi = area_sufficient_indicator_fi === 0 ? _25_percent_of_lake_area * removal_const : removal_req;
  //     const final_number_of_fi_required = _25_percent_of_lake_area > area_required_fi ? number_of_fi_required : max_fi_in_25_percent_lake_area;
  //     const aditional_load_after_fi = removal_req - max_load_removal_possible_fi;

  //     console.log('Lake TP:', laketp);
  //     console.log('Lake Volume (m³):', volume);
  //     console.log('Loss due to Percolation (mm/day):', loss_due_to_percolation);
  //     console.log('Outflow due to Percolation & Evaporation (m³/day):', percolation_evaporation_outflow);
  //     console.log('Hydraulic Retention Time (days):', hrt);
  //     console.log('Target Secchi Depth (m):', target_secchi_depth);
  //     console.log('Current Load in Lake (mg):', load_in_lake);
  //     console.log('Required Load for Healthy Lake (mg):', req_load_for_healthy_lake);
  //     console.log('Total Removal Required (mg):', removal_req);
  //     console.log('Daily Removal Requirement (mg/day):', removal_req_per_day);
  //     console.log('Removal Rate per FI per Day (mg/day):', removal_const);
  //     console.log('Number of Floating Islands Required:', number_of_fi_required);
  //     console.log('Area per Floating Island (m²):', area_per_fi);
  //     console.log('Total Area Required for FIs (m²):', area_required_fi);
  //     console.log('25% of Lake Area (m²):', _25_percent_of_lake_area);
  //     console.log('Maximum FI Units in 25% Lake Area:', max_fi_in_25_percent_lake_area);
  //     console.log('Area Sufficient Indicator for FI (1 = Yes, 0 = No):', area_sufficient_indicator_fi);
  //     console.log('Max Load Removal Possible by FI (mg):', max_load_removal_possible_fi);
  //     console.log('Final Number of FIs to Use:', final_number_of_fi_required);
  //     console.log('Additional Load Remaining After FI (mg):', aditional_load_after_fi)

  //     Setshowfi(true)
  //     Set_Load_for_FI(removal_req)
  //     Set_final_no_fi(Number.parseInt(final_number_of_fi_required.toFixed(0)))
  //     Set_aditional_load_after_fi(Number.parseInt(aditional_load_after_fi.toFixed(2)))
  //     Set_area_consumed_fi(Number.parseInt((final_number_of_fi_required * area_per_fi).toFixed(2)))
  //     Set_max_load_removed(Number.parseInt(max_load_removal_possible_fi.toFixed(2)))

  //     return;
  //   }

  //   console.log('calulating cw and fi')



  //   const self_assimilation_factor = (inflowrate * inflowtp) / laketp;
  //   const self_assimilation_load = self_assimilation_factor * 0.8;
  //   const incoming_load = inflowrate * inflowtp
  //   const reduction_of_load_for_CW = incoming_load - self_assimilation_load;
  //   const CW_outlet_conc = (incoming_load - reduction_of_load_for_CW) / inflowrate;

  //   const k_TP = isdepthAvaiable ? 0.1 : 0.07;
  //   const area_of_CW = (inflowrate * (Math.log(inflowtp) - Math.log(CW_outlet_conc))) / k_TP; //edited

  //   console.log("self_assimilation_factor= " + self_assimilation_factor)
  //   console.log("self_assimilation_load= " + self_assimilation_load)
  //   console.log("incoming_load= " + incoming_load)
  //   console.log("reduction_of_load_for_CW= " + reduction_of_load_for_CW)
  //   console.log("CW_outlet_conc= " + CW_outlet_conc)

  //   console.log("Area of the CW(m2)= " + area_of_CW)
  //   let expval;

  //   let count_based_on_area;
  //   let load_outflow;
  //   let outletLoad = 0;
  //   let load_uptaken;
  //   let incoming_load_for_FI;


  //   if (area_of_CW > cwArea) {
  //     expval = Math.exp((cwArea * k_TP) / inflowrate)
  //   } else {
  //     expval = Math.exp((area_of_CW * k_TP) / inflowrate)

  //   }
  //   count_based_on_area = inflowtp / expval;
  //   load_outflow = count_based_on_area * inflowrate;

  //   let load_for_FI;

  //   if (area_of_CW > cwArea) {
  //     load_for_FI = load_outflow
  //   } else {
  //     load_for_FI = 0;
  //   }
  //   if (count_based_on_area > CW_outlet_conc) {
  //     outletLoad = load_outflow - self_assimilation_load
  //   }
  //   load_uptaken = reduction_of_load_for_CW - outletLoad;

  //   incoming_load_for_FI = (outletLoad).toFixed(3);

  //   console.log('count_based_on_area= ' + count_based_on_area)
  //   console.log('incoming_load_for_FI= ' + incoming_load_for_FI)

  //   Setshowcw(true)



  //   // floating island calculation
  //   if (Number.parseFloat(incoming_load_for_FI) > 0.0) {
  //     console.log('calculating for floating island')
  //     const incoming_load_from_CW = Number.parseFloat(incoming_load_for_FI)
  //     const removal_const_fi = 1.7;
  //     const number_of_fi_required = incoming_load_from_CW / removal_const_fi
  //     const area_per_fi = 4;
  //     const area_required_fi = number_of_fi_required * area_per_fi;
  //     const _25_percent_of_lake_area = 0.25 * lakearea;
  //     const max_fi_in_25_percent_lake_area = _25_percent_of_lake_area / area_per_fi;
  //     const area_sufficient_indicator_fi = area_required_fi < _25_percent_of_lake_area ? 1 : 0;
  //     const max_load_removal_possible_fi = area_sufficient_indicator_fi === 0 ? max_fi_in_25_percent_lake_area * removal_const_fi : incoming_load_from_CW;
  //     const final_number_of_fi_required = area_required_fi > _25_percent_of_lake_area ? max_fi_in_25_percent_lake_area : number_of_fi_required;
  //     const aditional_load_remaining_fi = incoming_load_from_CW - max_load_removal_possible_fi;

  //     console.log("Incoming Load from CW:", incoming_load_from_CW);
  //     console.log("Removal Constant (FI):", removal_const_fi);
  //     console.log("Number of FI Required:", number_of_fi_required);
  //     console.log("Area per FI:", area_per_fi);
  //     console.log("Area Required for FI:", area_required_fi);
  //     console.log("25% of Lake Area:", _25_percent_of_lake_area);
  //     console.log("Max FI in 25% Lake Area:", max_fi_in_25_percent_lake_area);
  //     console.log("Area Sufficient Indicator (FI):", area_sufficient_indicator_fi);
  //     console.log("Max Load Removal Possible (FI):", max_load_removal_possible_fi);
  //     console.log("Final Number of FI Required:", final_number_of_fi_required);
  //     console.log("Additional Load Remaining (FI):", aditional_load_remaining_fi);

  //     Setshowfi(true)
  //     Set_final_no_fi(Number.parseInt(final_number_of_fi_required.toFixed(0)))
  //     Set_aditional_load_after_fi(Number.parseInt(aditional_load_remaining_fi.toFixed(2)))
  //     Set_area_consumed_fi(Number.parseInt((final_number_of_fi_required * area_per_fi).toFixed(2)))
  //     Set_max_load_removed(Number.parseInt(max_load_removal_possible_fi.toFixed(2)))

  //   } else {
  //     Setshowfi(false)


  //   }
  //   Set_Area_of_the_CW(area_of_CW)
  //   Set_Cout_based_on_area_available_at_site(count_based_on_area)
  //   Set_load_outflow_CW(load_outflow_CW)
  //   Set_Load_for_FI(Number.parseInt(incoming_load_for_FI))
  //   Set_load_uptaken_by_new_CW(load_uptaken)
  //   Set_Load_for_CW(reduction_of_load_for_CW)



  // }


  return (
    <div className='w-full relative'>
      <Navbar currentpage='Tool'></Navbar>

      <Banner title=''></Banner>
      <div className='w-full p-4 flex flex-col gap-2 sm:flex-row justify-between bg-[#fffdfc] '>

        {/* conatiner left */}
        <div className=' lg:w-[40%] w-full  lg:justify-start items-center flex flex-col pt-2 '>
          <div className='flex justify-center items-center px-4'>
            <Heading text='NbS design -Input parameters '></Heading>
          </div>

          {/* Name of the lake */}
          <div className={`lg:w-[95%] bg-white shadow-xl rounded-xl mt-4 lg:mt-12 p-2 border-2 flex flex-col items-center border-[#c8c6c4] `}>
            <div className='w-full flex flex-col my-4 gap-6'>
              <Inputitem title={'Name of the lake'} type='text' value={Input_lakename} updatefunction={updateLakeName} custom_class={`${islakenamevalid ? '' : 'border-red-400'}`}></Inputitem>
            </div>


            <div className='mt-5'>
              <SubHeading text='MORPHOLOGY' customClassName='font-semibold underline'></SubHeading>
            </div>

            {/* MORPHOLOGY ITEMS */}
            <div className='w-full flex flex-col my-4 gap-6'>

              <Inputitem title={'Lake - Water spread area (m²)'} value={Input_lakearea > 0 ? Input_lakearea : ''} updatefunction={updateLakeArea}></Inputitem>
              <Inputitem title={'Lake - Average depth (m)'} value={Input_lakedepth > 0 ? Input_lakedepth : ''} updatefunction={updatedepth}></Inputitem>

              {/*Available area */}
              <div className='w-full border-2 border-gray-100 rounded-xl shadow-lg py-4 '>
                <div className={` flex flex-col w-full`}>
                  <Inputitem title={'Area available - Constructed wetland (m²)'} disable_status={!isareaavaiable} value={Input_cwArea > 0 ? Input_cwArea : ''} updatefunction={updateCWArea}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${Input_cwArea > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisareaavailabe(!isareaavaiable)} >{isareaavaiable ? 'Area not available' : 'Area available'}</p>
                </div>
              </div>

              {/* Feasible depth */}
              <div className='relative w-full border-2 border-gray-100 rounded-xl shadow-lg py-4 '>
                <div className={` flex flex-col w-full`}>
                  <div className={`absolute top-0 right-0 bg-white border-2 shadow-2xl border-blue-100 px-4 flex ${isfeasible_depthnote_open ? 'flex' : 'hidden'}`}>
                    <p className='p-8'> If sufficient depth of 0.5 meters above lake's full tank level is available, horizontal constructed wetland (CW) is considered for calculations. If not, free-water surface CW would be considered.
                    </p>
                    <p className='text-red-600 text-xl cursor-pointer' onClick={() => { Setisfeasible_depthnote_open(false) }}>x</p>
                  </div>
                  <p className='flex flex-row-reverse w-full text-end px-8 font-bold text-blue-600 cursor-pointer' onClick={() => { Setisfeasible_depthnote_open(true) }}>Note</p>
                  <Inputitem title={'Feasible depth -  Constructed wetland (m)'} disable_status={!isdepthAvaiable} value={Input_feasible_depth >= 0.5 ? Input_feasible_depth : ""} updatefunction={updatefeasibledepth}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${Input_feasible_depth > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisdepthvailabe(!isdepthAvaiable)} >{isdepthAvaiable ? 'Feasible depth not available' : 'Feasible depth available'}</p>
                </div>
              </div>

            </div>



            <div className='mt-5'>
              <SubHeading text='HYDROLOGY AND WATER QUALITY' customClassName='font-semibold underline'></SubHeading>
            </div>


            {/* HYDROLOGY AND WATER QUALITY ITEMS */}
            <div className='w-full flex flex-col my-4 gap-6'>

              {/* Inflow Rate */}
              <div className='relative w-full border-2 border-gray-100 rounded-xl shadow-lg py-4 '>
                <div className={` flex flex-col w-full gap-6`}>
                  <div className={`absolute top-0 right-0 bg-white border-2 shadow-2xl border-blue-100 px-4 flex ${isinlethoveropen ? 'flex' : 'hidden'}`}>
                    {/* <p className='p-8'>Note: For Multiple inlets, enter the details individually to determine intervention for each inlet. Incase you wish to combine multiple
                      inltes you may consider weighted averages for the inlets using the formula; <br></br> ( (Q₁ × C₁ + Q₂ × C₂ + … + Qₙ × Cₙ) ÷ (Q₁ + Q₂ + … + Qₙ) ) <br></br> where  Q is inflow rate of inlets and C is Concentration.
                    </p> */}
                    <p className='p-8'>For multiple inlets, enter the details individually to determine intervention for each inlet. If multiple inlets are to be combined, the inflow rate for the combined inlets will be the sum of individual inflow rates. For TP concentration of combined inlets, consider weighted averages using the formula; ((Q₁ × C₁ + Q₂ × C₂ + … + Qₙ × Cₙ) ÷ (Q₁ + Q₂ + … + Qₙ)) <br></br> where Qᵢ is inflow rate of inlets and Cᵢ is TP concentration of inlets.

                    </p>
                    <p className='text-red-600 text-xl cursor-pointer' onClick={() => { Setisinlethoveropne(false) }}>x</p>
                  </div>
                  <p className='flex flex-row-reverse w-full text-end px-8 font-bold text-blue-600 cursor-pointer' onClick={() => { Setisinlethoveropne(true) }}>Note</p>
                  <Inputitem title={'Inflow rate (m³/day)'} disable_status={!isinflowavilable} value={Input_inflowrate > 0 ? Input_inflowrate : ''} updatefunction={updateInflowrate}></Inputitem>
                  <Inputitem title={'Total phosphorus (TP) level (mg/L) - Inflow'} disable_status={!isinflowavilable} value={Input_inflowtp > 0 ? Input_inflowtp : ''} updatefunction={updateInflowtp}></Inputitem>
                </div>
                <div className={` justify-end px-8 mt-4 ${Input_inflowrate > 0 ? 'hidden' : 'flex'}`}>
                  <p className='text-blue-600 cursor-pointer' onClick={() => Setisinflowavilable(!isinflowavilable)} >{isinflowavilable ? 'No dry-weather inflow' : 'Dry-weather inflow available'}</p>
                </div>
              </div>

              {/* Total phospherous */}


              <Inputitem title={'Total phosphorus (TP) level (mg/L) - Inlake'} value={Input_laketp > 0 ? Input_laketp : ''} updatefunction={updateLaketp}></Inputitem>

              <Inputitem title={'Secchi depth (m)'} value={Input_secchidepth > 0 ? Input_secchidepth : ''} updatefunction={updatesechidepth}></Inputitem>

            </div>


          </div>


        </div>


        {/* container right */}
        <div className=' lg:w-[60%] w-full lg:items-center flex flex-col sm:pt-2 pt-8 '>
          <Heading text='What do You Observe?'></Heading>
          <SubHeading text='Tell us what did you see in your lakes'></SubHeading>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-1 lg:px-4'>

            <ObservationsTab title='Fish kills'
              explanation='Have you seen any dead fish floating on the surface or gathering near the shore?'
              image={deadfishimage}></ObservationsTab>

            <ObservationsTab title='Algal bloom'
              explanation=' Have you observed green or coloured patches spreading across the lake? '
              image={algalbloomimage}></ObservationsTab>

            <ObservationsTab title='Sewage inflow or bad odour'
              explanation='Have you felt any strong, unpleasant smell around the lake, or seen pipes or drains discharging sewage into it? '
              image={swageimage}></ObservationsTab>


            <ObservationsTab title='Floating vegetation'
              explanation='Have you noticed thick clusters of floating plants like water hyacinth or duckweed covering significant area of the lake?'
              image={waterhyacinthimage}></ObservationsTab>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-1 lg:px-4'>

            <ObservationsTab title='Foaming on the lake'
              explanation='Have you observed foam forming along the edges or surface of the lake?'
              image={foamimage}></ObservationsTab>
          </div>

        </div>


      </div>
      <div className='w-full py-4 flex flex-col justify-center items-center pb-10'>
        <button onClick={calculation2}
          className='px-10 cursor-pointer py-3 bg-[#1e8989] text-white font-semibold rounded-xl shadow-md hover:bg-[#60adad] active:scale-95 transition transform duration-150'
        >
          Analyse
        </button>
      </div>


      {/* Result section */}
      <div className={` ${showresult ? 'flex' : 'hidden'}  w-full  justify-center items-center  `}>

        {/* Show only CW ---------------------------------------------------------------------------- */}
        <div className={`${(showcw && !showfi) ? 'flex flex-col ' : 'hidden'} justify-center items-center  `}>

          <p className='w-full text-center text-xl font-semibold' >Only CW is sufficient</p>
          <div className='w-full flex justify-center items-center'>
            <div className='mt-2'>
              <p className='w-full text-start px-4 text-lg '>CW as the sole intervention is recommended when:
                <br></br>• Sufficient area is available for CW implementation
                <br></br>• CW alone can achieve the required nutrient removal
                <br></br>• Calculated area requirements for CW are below 25% of the lake area


              </p>
            </div>

          </div>

           {/* resulting image */}
          <div className='relative w-[100%] h-[500px] flex justify-around overflow-clip mt-4 p-4'>
             <Image 
             className='object-cover'
             fill
             src={cwonly_img}
             alt='cw and fi'></Image>
          </div>


          <div className='flex gap-4 flex-col lg:flex-row mt-4'>
            <Result
              title='Constructed Wetland'
              description={`• Sufficient area is available for CW implementation\n• CW alone can achieve the required nutrient removal\n• Calculated area requirements for CW are below 25% of the lake area`}
              images={Fi_imgs}
              btn_link={''}
              percent={`${result_CW_percent} %`}
              area={`${result_CW_area} m²`}
              handlesingleslide={() => handle_singleslide(CW_imgs)}  />

            <Result
              title='Shoreline rehabilitation'
              description='Shorelines are among the most ecologically productive areas on earth, playing a crucial role in maintaining the health of water bodies. Rehabilitation efforts focus on restoring native vegetation, stabilising soil, improving habitat quality, and enhancing ecosystem services.'
              images={vegitation_imgs}
              btn_link={shoreline_know_more}
              handlesingleslide={() => handle_singleslide(vegitation_imgs)} />
          </div>

        </div>


        {/* show only fi -------------------------------------------------------------------------------------*/}
        <div className={`${(!showcw && showfi) ? 'flex flex-col ' : 'hidden'}  justify-center items-center flex-col`}>
          <p className='w-full text-center text-xl font-semibold' >Only FI is sufficient</p>
          <div className='w-full flex justify-center items-center'>
            <div className='mt-2'>
              <p className='w-full text-start px-4 text-lg'>FI as the sole intervention is recommended when:
                <br></br>Sufficient area is available for CW implementation
                <br></br>• CW alone can achieve the required nutrient removal
                <br></br>• Calculated area requirements for CW are below 25% of the lake area


              </p>
            </div>

          </div>

           {/* resulting image */}
          <div className='relative w-[100%] h-[500px] flex justify-around overflow-clip mt-4 p-4'>
             <Image 
             className='object-cover'
             fill
             src={fionly_img}
             alt='fi'></Image>
          </div>


          <div className='flex gap-4 flex-col lg:flex-row mt-4'>

            <Result
              title='Floating island'
              description={`• Area for the deployment of CW is not available.
             • The estimated area required for the deployment of FIs is below 25 % of the lake area.`}
              images={Fi_imgs}
              btn_link={''}
              percent={`${result_fi_percent} %`}
              area={`${result_fi_area} m²`} 
               handlesingleslide={() => handle_singleslide(Fi_imgs)} />

            <Result
              title='Shoreline rehabilitation'
              description='Shorelines are among the most ecologically productive areas on earth, playing a crucial role in maintaining the health of water bodies. Rehabilitation efforts focus on restoring native vegetation, stabilising soil, improving habitat quality, and enhancing ecosystem services.'
              images={vegitation_imgs}
              btn_link={shoreline_know_more}
              handlesingleslide={() => handle_singleslide(vegitation_imgs)} />
              
          </div>
        </div>


        {/* show all 3 --------------------------------------------------------------------------------------------*/}
        <div className={`${(showcw && showfi) ? 'flex flex-col' : 'hidden'}  justify-center items-center flex-col`}>
          <div className='w-full p-2 flex flex-col justify-center'>
            <p className='w-full text-center text-xl font-semibold' >Combination of CW and FI is required</p>
            <div className='w-full flex justify-center items-center'>
              <div className='mt-2'>
                <p className='w-full text-start px-4 text-lg'>Combined approach is recommended when:
                  <br></br>• CW alone cannot achieve the required nutrient removal
                  <br></br>• Additional treatment is needed to supplement the CW
                  <br></br>• The combined area requirements are below 25% of the lake area
                </p>
              </div>

            </div>


          </div>
          {/* resulting image */}
          <div className='relative w-[98%] h-[500px] flex justify-around overflow-clip px-8'>
             <Image 
             className='object-cover'
             fill
             src={cwandfi_img}
             alt='cw and fi'></Image>
          </div>
        

          <div className='flex flex-col lg:flex-row gap-4 mt-4 px-2'>
            <Result
              title='Constructed Wetland'
              description={``}
              images={CW_imgs}
              btn_link={''}
              percent={`${result_CW_percent} %`}
              area={`${result_CW_area} m²`}
              handlesingleslide={() => handle_singleslide(CW_imgs)} />

            <Result
              title='Floating island'
              description={``}
              images={Fi_imgs}
              btn_link={''}
              percent={`${result_fi_percent} %`}
              area={`${result_fi_area} m²`}
              handlesingleslide={() => handle_singleslide(Fi_imgs)} />

            <Result
              title='Shoreline rehabilitation'
              description='Shorelines are among the most ecologically productive areas on earth, playing a crucial role in maintaining the health of water bodies. Rehabilitation efforts focus on restoring native vegetation, stabilising soil, improving habitat quality, and enhancing ecosystem services.'
              images={vegitation_imgs}
              btn_link={shoreline_know_more}
              handlesingleslide={() => handle_singleslide(vegitation_imgs)} />

          </div>
        </div>


        {/* Show none --------------------------------------------------------------------------------------- */}
        <div className={`${((!showcw && !showfi)) ? 'flex flex-col ' : 'hidden'}  justify-center items-center flex-col `}>

          <p className='w-full text-center text-xl font-semibold' >NbS is not feasible</p>
          <div className='w-full flex justify-center items-center'>
            <div className='mt-2'>
              <p className='w-full text-start px-4 lg:px-20 text-lg'>The pollutant load inflow to the lake is significantly higher than the load that could be handled by constructed wetlands, floating islands or combination. This is because:
                <br></br>• Treatment requirements cannot be met within the spatial constraints
                <br></br>• The required area for CW and/or FI exceeds 25% of the lake area.

              </p>
            </div>

          </div>

          <div className='flex flex-col lg:flex-row h-2 mt-5'>

          </div>
        </div>
      </div>

      {/* Image slider overlay */}
      <div className={`${showsingleslider ? 'absolute' : 'hidden'}  top-0 left-0 w-full h-full `}>

        <div className={`${showsingleslider ? 'flex' : 'hidden'} relative w-full h-full flex-col-reverse`}>

          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 z-[1000] cursor-pointer " onClick={() => handle_singleslide(single_slider_imgs)} />
          <div className='w-full flex justify-center items-center mt-20 z-[5000]' >
            <SingleSlider images={single_slider_imgs} handlesingleslide={() => handle_singleslide(single_slider_imgs)}></SingleSlider>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page
