
import AddTeacher from './AddTeachers';
import AdminHome from './AdminHome';
import AdminLogin from './AdminLogin';
import './App.css';
import Footer from './Footer';
import NavBar from './Navbar';
import SideBar from './Sidebar';

import {BrowserRouter, Route, Routes} from "react-router-dom"
import StudentLogin from './StudentLogin';
import AdminSignup from './AdminSignup';
import Home from './Home';
import StudentSignup from './StudentSignup';
import StudentHome from './StudentHome';
import TeacherHome from './TeacherHome';
import TeacherProfile from './TeacherProfile';
import Class from './Class';
import AddStudent from './AddStudent';
import AddExam from './ExamDetails';
import TeacherEdit from './TeacherEdit';
import TeacherView from './TeacherView';
import StudentView from './StudentView';
import ExamView from './ExamView';
import StudentExam from './StudentExam';
import ExamTest from './ExamTest';
import StudentActive from './Active';

import Studentcompleted from './Completed';
import Studentupcoming from './Upcoming';
import StudentProfile from './StudentProfile';
import StudentEdit from './StudentEdit';
import ExamResult from './ExamResult';
import PrevoiusDisplay from './PreviousDisplay';
import ResultFull from './ResultFull';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    
      
      <Route path='/'element={<Home/>}></Route>
      <Route path='/sidebar' element={<SideBar/>}/>
      <Route path='/foot' element={<Footer/>}/>
      <Route path='/nav' element={<NavBar/>}/>
      <Route path='/adminhome' element={<AdminHome/>}></Route>
      <Route path='/adminlogin'element={<AdminLogin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>
      <Route path='/addteacher' element={<AddTeacher/>}/>
      <Route path='/studentlogin' element={<StudentLogin/>}></Route>
      <Route path='/studentsignup'element={<StudentSignup/>}></Route>
      <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
      <Route path='/teacherhome' element={<TeacherHome></TeacherHome>}/>
      <Route path='/teacherprofile' element={<TeacherProfile></TeacherProfile>}/>
      <Route path='/class' element={<Class></Class>}/>
      <Route path='/addstudent' element={<AddStudent></AddStudent>}/>
      <Route path='/addexam' element={<AddExam/>}/>
      <Route path='/teacheredit' element={<TeacherEdit></TeacherEdit>}/>
      <Route path='/teacherview' element={<TeacherView/>}/>
      <Route path='/studentview' element={<StudentView/>}/>
      <Route path='/examview' element={<ExamView/>}></Route>
      <Route path='/studentexam' element={<StudentExam/>}></Route>
      <Route path='/examtest' element={<ExamTest/>}></Route>
      <Route path='/activeexam' element={<StudentActive/>}></Route>
      <Route path='/completedexams' element={<Studentcompleted/>}></Route>
      <Route path='/upcomingexams' element={<Studentupcoming/>}></Route>
      <Route path='/studentprofile' element={<StudentProfile/>}></Route>
      <Route path='/studentedit' element={<StudentEdit/>}></Route>
      <Route path='/examresult' element={<ExamResult/>}></Route>
      <Route path='/previousdisplay/:examId' element={<PrevoiusDisplay/>}></Route>
      <Route path='/resultfull' element={<ResultFull/>}></Route>


     
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
