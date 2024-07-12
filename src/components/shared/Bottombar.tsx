import { bottombarLinks } from '@/constants';
import { Link , useLocation } from 'react-router-dom';

const Bottombar = () => {
const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
       {bottombarLinks.map((link)=>{
                const isActive =pathname === link.route;
                return(
                    <Link to={link.route}
                    key ={link.label} 
                    className={` ${isActive  && 'bg-primary-500 rounded-[12px]'
                   } flex-center flex-col gap-1 p-2 transition`}
                   >
                       
                        <img src = {link.imgURL}
                            alt = {link.label} 
                            width={14}
                            height={14}
                            className=
                            {` ${isActive && 'invert-white'}`} //$ sign is if condition here
                       />
                       <p className='tiny-medium text-light-2'>
                        {link.label}</p> 
                    </Link>
                )
          })}

    </section>
  )
}

export default Bottombar