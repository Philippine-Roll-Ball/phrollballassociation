// import { useState, useEffect, useCallback } from 'react';
// import {getMembers } from '@/services/memberService';
// import { User } from "@/types/user"

// export function useMembers() {
//     const [members, setMembers] = useState<User[]>([]);
//     const [isLoading, setIsLoading ] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchMembers = useCallback(async () => {
//         try {
//             setIsLoading(true);
//             setError(null);

//             const data = await getMembers();
//             setMembers(data || []);
//         }catch(err) {
//             console.error("Failed to fetch members: ", err);
//             setError("Failed to load directory. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { 
//         fetchMembers();
//     }, [fetchMembers]);
    
//     return {
//         members,
//         isLoading,
//         error,
//         refreshMembers: fetchMembers
//     };

// }