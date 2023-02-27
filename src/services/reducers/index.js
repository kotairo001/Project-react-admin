import NewsDetail from "./NewsDetail";
import VaccineDetail from "./VaccineDetail";
import HospitalDetail from "./HospitalDetail";
import CaseDetail from "./CaseDetail"
import AboutDetail from "./AboutDetail"

import SelectNews from "./SelectNews";
import SelectVaccine from "./SelectVaccine";
import SelectHospital from "./SelectHospital";
import SelectCase from "./SelectCase"
import SelectAbout from "./SelectAbout"

import {combineReducers} from "redux";

const reducer = combineReducers({NewsDetail, SelectNews, VaccineDetail, SelectVaccine, HospitalDetail, SelectHospital, CaseDetail, SelectCase, AboutDetail, SelectAbout});

export default reducer;