import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/useUserStore";
import { baseUrl } from "../apis";

const useBookings = () => {
    const {currentUser} = useUserStore((state) => state);
    
    return useQuery({
        queryKey: ['bookings', currentUser?.id],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/bookings/user/${currentUser?.id}`);
            return response.data;
        },
      enabled: !!currentUser?.id,
      staleTime: 1000 * 60 * 5,
    });
};

export default useBookings