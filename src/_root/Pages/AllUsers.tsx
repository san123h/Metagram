import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {  useGetUsers} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";


const AllUsers = () => {
  const { toast } = useToast();
  const { data:creators,
        isLoading: isUserLoading,
        isError: isErrorCreators } = useGetUsers(10);

  if(isErrorCreators) {
    toast({title:"Something went wrong"})
    return;
  }
  const [searchValue, setSearchValue] = useState("");
 

  

  return (
    <div className="common-container">
       <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Peoples</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Peoples</h2>
        {isUserLoading && !creators ? (
          <Loader/>
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator)=>(
              <li key={creator?.$id} className="flkex-1 min-2-[200px] w-full" >
                <UserCard user={creator}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers