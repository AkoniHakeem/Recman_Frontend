import React, { useState } from "react"
import Button from "../../assets/elements/button/button"
import CloseButton from "../../assets/elements/button/closeButton"
import MenuButton from "../../assets/elements/custom/menubutton/menubutton"
import Navbar from "../../assets/elements/custom/navbar/navbar"
import AuthMenu from "../auth/authMenu"
import Login from "../auth/login"
import Sidebar from "../../assets/elements/custom/sidebar/sidebar"
import CaretlistItem from "../uList/caretListItem"
import "./home.css"
import Page from "../../assets/elements/custom/page/page"
import MainContent from "../../assets/elements/custom/maincontent/maincontent"
import { Redirect } from "react-router"

const Home = (props) => {
    
    if(!props.content) {
        return <Redirect to="/workspace"/>
    }
    return(
        
        <Page className="container-page-flex"

            maincontent={
                <MainContent >
       
                </MainContent>
            }
        />
    )
}

export default Home