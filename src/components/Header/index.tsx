import { HeaderContainer } from "./styles";
import {Timer, Scroll} from 'phosphor-react'

import LogoTimer from '../../assets/Logo-timer.svg'
import { NavLink } from "react-router-dom";

export function Header(){
  return(
    <HeaderContainer>
      <span><img src={LogoTimer} alt="" /></span>
      <nav>
        <NavLink to="/">
          <Timer size={24}/>
        </NavLink>
        <NavLink to="/history"><Scroll size={24}/></NavLink>
      </nav>   
    </HeaderContainer>
  )
}