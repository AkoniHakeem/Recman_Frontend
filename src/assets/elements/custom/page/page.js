import AuthMenu from "../../../../components/auth/authMenu";
import Navbar from "../navbar/navbar";

const Page = (props) => {
        let {navbar, sidebar, maincontent, footer} = props
        navbar = !navbar ?                 
        <Navbar>
            {/*  to include this line we need to emit the click event so the calling code can use it
            <MenuButton onClick={toggleSidebar.bind(this)}/>  
            */}
            <h4 className="app-title">RecMan</h4>
            <AuthMenu />
        </Navbar>
        :
        navbar;
    return(
        <div className={props.className}>
            {navbar}
            {sidebar}
            {maincontent}
            {footer}
        </div>
    )
}

export default Page