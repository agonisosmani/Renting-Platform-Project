import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/hoc/layout';
import Login from './Screens/Login/LoginScreen';
import Register from './Screens/Register/RegisterScreen';
import Contact from './Screens/Contact/ContactScreen';
import Home from './Screens/Home/HomeScreen';
import Shpalljet from './Screens/Home/ShpalljetScreen';
import Add from './Screens/AdminPanel/AddScreen';
import ShpalljaDetails from './Screens/Shpallja/ShpalljaScreen';
import ProfileScreen from './Screens/AdminPanel/ProfileScreen';
import AddCategory from './Screens/AdminPanel/AddCategory';
import AddMemberReviews from './Screens/AdminPanel/AddMember';
import AdminPanel from './Screens/AdminPanel/adminPanel';
import AllShpalljetList from './Screens/AdminPanel/allShpalljetScreen';
import CategoryList from './Screens/AdminPanel/categoriesScreen';
import ContactList from './Screens/AdminPanel/contactsScreen';
import NotFoundScreen from './components/notfoundScreen';
import CategoriesScreen from './Screens/Categories/CategoriesScreen';
import RegisterAdmin from './Screens/Register/registerAdmin';
import About from './Screens/About/about';
import HowToPost from './Screens/Post_Rent/post';
import HowToRent from './Screens/Post_Rent/rent';
import Searched from './Screens/Searched/search';
import ShpalljetSearch from './Screens/Searched/ShpalljetSearch';
import ShpalljaNotFound from './Screens/ShpalljetNotFound/shpalljetNotFound';
import MessagesScreen from './Screens/AdminPanel/messagesScreen';
import MembersScreen from './Screens/AdminPanel/membersScreen';
import AprovoScreen from './Screens/AdminPanel/aprovoScreen';
import UsersScreen from './Screens/AdminPanel/usersScreen';
import approveMessageScreen from './components/approveMessage';
import AddKomuna from './Screens/AdminPanel/AddKomuna';
import KomunatScreen from './Screens/AdminPanel/komunatScreen';
import ConfirmEmail from './components/confirmEmail';

export default function Routes() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shpalljet" exact component={Shpalljet} />
                <Route path="/category/:category" exact component={ShpalljetSearch} /> 
                <Route path="/search/:category/:location?" exact component={Searched} /> {/* location? -> ? sepse po du qe kjo location me qene jo obligative nese e shkruj veq /search/makina me mi qit krejt makinat pa lokacion*/}
                <Route path="/shpallja/:id" exact component={ShpalljaDetails} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/regjistroni-shpallje" exact component={Add} />
                <Route path="/profili" exact component={ProfileScreen} />
                <Route path="/krijo-kategorin" exact component={AddCategory} />
                <Route path="/krijo-komunën" exact component={AddKomuna} />
                <Route path="/krijo-member_reviews" exact component={AddMemberReviews} />
                <Route path="/admin-paneli" exact component={AdminPanel} />
                <Route path="/lista-shpalljeve" exact component={AllShpalljetList} />
                <Route path="/lista-kategorive" exact component={CategoryList} />
                <Route path="/lista-kontakteve" exact component={ContactList} />
                <Route path="/lista-komunave" exact component={KomunatScreen} />
                <Route path="/kategoritë" exact component={CategoriesScreen} />
                <Route path="/regjistro-admin" exact component={RegisterAdmin} />
                <Route path="/about" exact component={About} />
                <Route path="/how-to-post" exact component={HowToPost} />
                <Route path="/how-to-rent" exact component={HowToRent} />
                <Route path="/nuk-keni-gjetur-produktin" exact component={ShpalljaNotFound} />
                <Route path="/lista-mesazheve" exact component={MessagesScreen} />
                <Route path="/lista-member-reviews" exact component={MembersScreen} />
                <Route path="/lista-përdoruesve" exact component={UsersScreen} />
                <Route path="/aprovo-shpalljen/:id" exact component={AprovoScreen} />
                <Route path="/njoftimi" exact component={approveMessageScreen} />
                <Route path="/confirm-email" exact component={ConfirmEmail} />
                <Route path="/notfound" exact component={NotFoundScreen} />
                <Route path="*" exact component={NotFoundScreen} />
            </Switch>
        </Layout>
    )
  
}