import React, { Fragment, useEffect } from "react";

// Auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Layout
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import SettingsSidebar from "./components/layout/SettingsSidebar";
import PageNotFound from "./components/layout/PageNotFound";

// Dashboard
import Dashboard from "./components/dashboard/Dashboard";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Profiles
import MyProfile from "./components/profiles/MyProfile";
import UserProfile from "./components/profiles/UserProfile";
import EditProfile from "./components/profiles/EditProfile";
import EditGeneralInfo from "./components/profiles/EditGeneralInfo";
import AddExperience from "./components/profiles/AddExperience";
import AddEducation from "./components/profiles/AddEducation";
import Profiles from "./components/profiles/Profiles";

// Articles
import Articles from "./components/articles/Articles";
import Article from "./components/articles/Article";
import CreateArticle from "./components/articles/CreateArticle";
import EditArticle from "./components/articles/EditArticle";

// Learning Materials - The Basics of Programming
import Modules from "./components/basics-of-programming/Modules";
import ModuleItem from "./components/basics-of-programming/ModuleItem";
import CreateProblem from "./components/basics-of-programming/CreateProblem";
import CreateLesson from "./components/basics-of-programming/CreateLesson";
import CreateQuiz from "./components/basics-of-programming/CreateQuiz";
import Problem from "./components/basics-of-programming/Problem";
import Lesson from "./components/basics-of-programming/Lesson";
import Quiz from "./components/basics-of-programming/Quiz";
import EditProblem from "./components/basics-of-programming/EditProblem";
import EditLesson from "./components/basics-of-programming/EditLesson";
import EditQuiz from "./components/basics-of-programming/EditQuiz";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Fragment>
            {/* Auth */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />

            {/* Dashboard */}
            <Route
              exact
              path="/home"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Profiles */}
            <Route
              exact
              path="/my-profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/my-profile/edit/general-info"
              element={
                <PrivateRoute>
                  <EditGeneralInfo />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/profiles/:id"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/my-profile/add-experience"
              element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/my-profile/add-education"
              element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/admin/profiles"
              element={
                <PrivateRoute expectedRole="admin" redirect="false">
                  <Profiles />
                </PrivateRoute>
              }
            />

            {/* Settings */}
            <Route
              exact
              path="/settings/:resource"
              element={
                <PrivateRoute>
                  <SettingsSidebar />
                </PrivateRoute>
              }
            />

            {/* Articles */}
            <Route exact path="/articles" element={<Articles />} />
            <Route exact path="/articles/:id" element={<Article />} />
            <Route
              exact
              path="/articles/create-article"
              element={
                <PrivateRoute>
                  <CreateArticle />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/articles/edit/:id"
              element={
                <PrivateRoute>
                  <EditArticle />
                </PrivateRoute>
              }
            />

            {/* Learning Materials - The Basics of Programming */}
            <Route
              exact
              path="/modules"
              element={
                <PrivateRoute>
                  <Modules />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/modules/:module"
              element={
                <PrivateRoute>
                  <ModuleItem />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/lessons/:lessonId"
              element={
                <PrivateRoute>
                  <Lesson />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/problems/:problemId"
              element={
                <PrivateRoute>
                  <Problem />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/quizzes/:quizId"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/modules/:module/create-problem"
              element={
                <PrivateRoute expectedRole="mentor" redirect="false">
                  <CreateProblem />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/modules/:module/create-lesson"
              element={
                <PrivateRoute expectedRole="mentor" redirect="false">
                  <CreateLesson />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/modules/:module/create-quiz"
              element={
                <PrivateRoute expectedRole="mentor" redirect="false">
                  <CreateQuiz />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/problems/edit/:problemId"
              element={
                <PrivateRoute>
                  <EditProblem />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/lessons/edit/:lessonId"
              element={
                <PrivateRoute>
                  <EditLesson />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/:module/quizzes/edit/:quizId"
              element={
                <PrivateRoute>
                  <EditQuiz />
                </PrivateRoute>
              }
            />

            {/* Page not Found */}
            <Route exact path="*" element={<PageNotFound />} />
          </Fragment>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
