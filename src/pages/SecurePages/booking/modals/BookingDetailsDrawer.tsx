/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import useAppStore from '../../../../store/useAppStore';
import { appTheme } from '../../../../constant/theme';
import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiMessageCircle,
  FiCreditCard,
} from 'react-icons/fi';
import { useBookingStore } from '../../../../store/useBookingStore';
import useUserStore from '../../../../store/useUserStore';
import { useModal } from '../../../../hooks/useModal';
import axios from 'axios';
import { baseUrl } from '../../../../apis';
import { toast } from 'react-toastify';

interface BookingDetailsDrawerProps {
  bookingId: number | null;
}

const BookingDetailsDrawer: React.FC<BookingDetailsDrawerProps> = ({
  bookingId,
}) => {
  const { theme } = useAppStore(['theme']);
  const { bookings } = useBookingStore();
  const { currentUser } = useUserStore((state) => state);
  const [sessionStatus, setSessionStatus] = useState<'pending' | 'active' | 'completed'>('pending');
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [canStart, setCanStart] = useState<boolean>(false);
  const [canEnd, setCanEnd] = useState<boolean>(false);
  const {closeModal} = useModal()
  const [openPrompt, setOpenPrompt] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const booking: any = bookings?.find((b: any) => b.id === bookingId);

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [timeHours, timeMinutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(timeHours), parseInt(timeMinutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Calculate time until session
  useEffect(() => {
    if (!booking) return;

    const calculateTimeRemaining = () => {
      try {
        const [year, month, day] = booking.date.split("-");
        const [sessionHours, sessionMinutes] = booking.time.split(":");
        const sessionDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(sessionHours),
          parseInt(sessionMinutes)
        );

        const now = new Date();
        const diff = sessionDate.getTime() - now.getTime();

        // If session is in the past
        if (diff < 0) {
          if (sessionStatus === 'active') {
            setCanEnd(true);
            setTimeRemaining('Session in progress');
          } else {
            setTimeRemaining('Session time has passed');
          }
          return;
        }

        // If session is within 15 minutes
        if (diff < 15 * 60 * 1000) {
          setCanStart(true);
          setTimeRemaining('Session starting soon');
          return;
        }

        // Otherwise, calculate remaining time
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeRemaining(`${days} day${days > 1 ? 's' : ''} ${remainingHours} hr until session`);
        } else if (remainingHours > 0) {
          setTimeRemaining(`${remainingHours} hr ${remainingMinutes} min until session`);
        } else {
          setTimeRemaining(`${remainingMinutes} min until session`);
        }
      } catch (error) {
        console.error("Error calculating time remaining:", error);
        setTimeRemaining('Unable to calculate time');
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [booking, sessionStatus]);

  // Handle session status changes
  const handleStartSession = () => {
    if (!booking || !canStart) return;
    
    setSessionStatus('active');
    setCanStart(false);
    setCanEnd(true);
    
    // In a real app, you'd call an API to update the session status
    // updateBookingStatus(booking.id, 'active');
    
    // For demo purposes:
    console.log('Session started');
  };

  const handleEndSession = () => {
    if (!booking || !canEnd) return;
    
    setSessionStatus('completed');
    setCanEnd(false);
    
    // In a real app, you'd call an API to update the session status
    // updateBookingStatus(booking.id, 'completed');
    
    // For demo purposes:
    console.log('Session ended');
  };

  const handleCancelBooking = async(bookingId: string)=> {
    setIsLoading(true)
      try{
        const response = await axios.delete(`${baseUrl}/bookings/user/${bookingId}`)
        if(response.data.success){
          toast.success(response.data.message)
          setIsLoading(false)
          closeModal()
          return
        }
        toast.error(response.data.message)
        setIsLoading(false)
        return
    }catch(error: any){
      console.log(error)
      toast.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div 
        className="w-[35dvw] h-full pb-8 overflow-y-auto transition-transform duration-300"
        style={{
          backgroundColor: appTheme[theme].surface.primary,
          color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
          transform:'translateX(0)'
        }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 z-10 flex items-center justify-between border-b"
          style={{ 
            backgroundColor: appTheme[theme].surface.primary,
            borderColor: appTheme[theme].neutral[200] 
          }}
        >
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button 
            onClick={closeModal}
            className="p-2 rounded-full"
            style={{ backgroundColor: appTheme[theme].surface.secondary }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Status Banner */}
          <div 
            className="p-4 rounded-lg flex items-center space-x-3"
            style={{ 
              backgroundColor: 
                sessionStatus === 'completed' 
                  ? appTheme[theme].status.success + '20' 
                  : sessionStatus === 'active'
                  ? appTheme[theme].status.info + '20'
                  : appTheme[theme].accent.primary + '20',
              color: 
                sessionStatus === 'completed' 
                  ? appTheme[theme].status.success 
                  : sessionStatus === 'active'
                  ? appTheme[theme].status.info
                  : appTheme[theme].accent.primary,
            }}
          >
            {sessionStatus === 'completed' ? (
              <FiCheck size={20} />
            ) : sessionStatus === 'active' ? (
              <FiClock size={20} />
            ) : (
              <FiAlertCircle size={20} />
            )}
            <div>
              <p className="font-medium">
                {sessionStatus === 'completed' 
                  ? 'Session Completed' 
                  : sessionStatus === 'active'
                  ? 'Session In Progress'
                  : 'Upcoming Session'}
              </p>
              <p className="text-sm">{timeRemaining}</p>
            </div>
          </div>

          {/* Tutor Info */}
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: appTheme[theme].accent.primary + "20" }}
            >
              <FiUser size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {booking.tutor?.firstname} {booking.tutor?.lastname}
              </h3>
              <p style={{ color: appTheme[theme].neutral[500] }}>
                {booking.tutor?.program}
              </p>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Session Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: appTheme[theme].accent.secondary + '20' }}
                >
                  <FiCalendar style={{ color: appTheme[theme].accent.secondary }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>Date</p>
                  <p>{formatDate(booking.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: appTheme[theme].accent.secondary + '20' }}
                >
                  <FiClock style={{ color: appTheme[theme].accent.secondary }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>Time</p>
                  <p>{formatTime(booking.time)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: appTheme[theme].accent.secondary + '20' }}
                >
                  <FiMapPin style={{ color: appTheme[theme].accent.secondary }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>Location</p>
                  <p>{booking.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Payment Information</h3>
            <div 
              className="p-4 rounded-lg border"
              style={{ borderColor: appTheme[theme].neutral[200] }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FiCreditCard />
                  <span>Payment Method</span>
                </div>
                <span className="text-sm">Ethereum</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>Tutor Address</span>
                <span className="text-sm font-mono">{booking.tutorwalletaddress.substring(0, 10)}...{booking.tutorwalletaddress.substring(booking.tutorwalletaddress.length - 6)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: appTheme[theme].neutral[500] }}>Your Address</span>
                <span className="text-sm font-mono">{booking.studentwalletaddress.substring(0, 10)}...{booking.studentwalletaddress.substring(booking.studentwalletaddress.length - 6)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {(currentUser?.id === booking?.studentid) && (
              <>
                {canStart && (
                  <button
                    onClick={handleStartSession}
                    className="w-full py-3 rounded-lg font-medium text-sm transition-colors"
                    style={{
                      backgroundColor: appTheme[theme].status.success,
                      color: appTheme.text.inverted,
                    }}
                  >
                    Start Session
                  </button>
                )}
                
                {canEnd && (
                  <button
                    onClick={handleEndSession}
                    className="w-full py-3 rounded-lg font-medium text-sm transition-colors"
                    style={{
                      backgroundColor: sessionStatus === 'active' ? appTheme[theme].status.warning : appTheme[theme].neutral[300],
                      color: appTheme.text.inverted,
                    }}
                  >
                    End Session
                  </button>
                )}
              </>
            )}
            
            <button
              className="w-full py-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2"
              style={{
                backgroundColor: appTheme[theme].accent.primary,
                color: appTheme.text.inverted,
              }}
            >
              <FiMessageCircle />
              <span>Message Tutor</span>
            </button>
            
            {sessionStatus !== 'active' && sessionStatus !== 'completed' && (
              <button onClick={()=> handleCancelBooking(booking?.id)}
                className="w-full hover:cursor-pointer py-3 rounded-lg font-medium text-sm transition-colors"
                style={{
                  backgroundColor: appTheme[theme].status.error,
                  color: appTheme.text.inverted,
                }}
              >
                {isLoading ? "Loading..." : "Cancel Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default BookingDetailsDrawer;