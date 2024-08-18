// import { Link } from 'react-router-dom';
// import { useGetAllUsers } from '@/lib/react-query/queriesAndMutations'; // Assuming this is your data fetching hook

// const AllUsers = () => {
//   const { isLoading, error, data } = useGetAllUsers(); // Destructure data from the hook

//   // Handle loading and error states (optional)
//   if (isLoading) return <p>Loading users...</p>;
//   if (error) return <p>Error fetching users: {error.message}</p>;

//   const users = data?.documents || []; // Handle potential empty data

//   return (
//     <section className="all-users" style={{ backgroundColor: '#282828', color: '#fff', padding: '20px' }}>
//       <h2 className="h2-bold" style={{ color: 'inherit', marginBottom: '20px' }}>All Users</h2>
//       <ul className="user-list flex flex-col gap-6">
//         {users.map((user) => (
//           <li key={user.id} className="user-item" style={{ backgroundColor: '#333', borderRadius: '8px', padding: '16px', transition: 'background-color 0.2s ease-in-out' }}>
//             <Link to={`/profile/${user.id}`} className="user-link flex items-center gap-4">
//               <img
//                 src={user.imageUrl || '/public/assets/icons/profile-placeholder.svg'}
//                 alt="user profile"
//                 className="h-11 w-11 rounded-full"
//               />
//               <div className="user-info flex flex-col">
//                 <p className="body-bold">{user.name}</p>
//                 <p className="small-regular text-light-3">@{user.username}</p>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default AllUsers;



import UserCard from "@/components/cards/UserCard";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";


import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetAllUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;